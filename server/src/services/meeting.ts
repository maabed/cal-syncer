import { google } from 'googleapis';
import dayjs from 'dayjs';
import { AbstractService } from './abstract';

const calendar = google.calendar('v3');

export class MeetingService extends AbstractService {
  async add(id) {
    try {
      const user = await this.models.User.findById(id);
      if (!user) {
        throw this.errors.notFound('user is not exist');
      }

      const meeting = await this.models.Meeting.find(id);

      return meeting;
    } catch (error) {
      this.log.error(error, 'Falied to generate events');
      throw this.errors.internal(error.message);
    }
  }

  async getAll(userId) {
    try {
      const user = await this.models.User.findById(userId);

      if (!user) {
        throw this.errors.notFound('user is not exist');
      }

      if (!user.refreshToken) {
        const userAccount = await this.models.Account.findOne({ userId: user._id });
        if (!userAccount) {
          throw this.errors.badRequest('cant resolve user refresh token');
        }

        await this.models.User.findOneAndUpdate({ _id: user._id }, { refreshToken: userAccount.refresh_token });
      }

      // sync user meeting before fetching
      await this.syncUserMeetings(userId);

      const meetings = await this.models.Meeting.find({ userId }).sort({ 'start.dateTime': -1 }).limit(50);

      return {
        meetings: meetings,
        count: meetings.length,
        totalCount: meetings.length,
      };
    } catch (error) {
      this.log.error(error, 'Falied to fetching user meetings');
      throw this.errors.internal(error.message);
    }
  }

  async syncUserMeetings(id) {
    try {
      const user = await this.models.User.findById(id);
      if (!user) {
        throw this.errors.notFound('user is not exist');
      }

      const oauthClient = this.services.gcal.getOAuth2Client(user.refreshToken);
      google.options({ auth: oauthClient });

      const { data } = await calendar.events.list({
        calendarId: 'primary',
        timeMin: dayjs().subtract(10, 'days').toISOString(),
        maxResults: 100,
        timeMax: dayjs().add(10, 'days').toISOString(),
        singleEvents: true,
      });

      if (data.items && data.items.length > 0) {
        // const meetings = data.items.map((v) => ({ ...v,  }));
        // const meetings = data.items.map(({ id: gId, ...rest }) => ({ gId, userId: id, ...rest}));
        // get ids from gcal events and compaire with whats we have on db to avoide insert/upsert Ops 
        // const ids = data.items.map((item) => item.id);
        // const meetingIds = await this.models.Meeting.find({ userId }).map((item) => item.gid);
        // TODO: compaire meetingIds VS ids

        // serialize cal input (basic)
        const meetings = data.items.map(({ id: gId, ...rest }) => ({
          gId,
          userId: id,
          ...rest,
          status: rest?.attendees?.filter((row) => row.email === user.email)[0]?.responseStatus,
        }));

        // Skipping duplicate events with unordered insert
        await this.models.Meeting.insertMany(meetings, { ordered: false })
          .then(result => result)
          .catch(error => {
            // duplicate key error thats fine, because we almost keep track the same time frame 
            if (error.code === 11000) {
              return true;
            }
            this.log.debug(error.message, 'Falied while syncing user meetings');
            throw this.errors.internal(error.message);
          });
      }
      return [];
    } catch (error) {
      this.log.error('Falied while syncing user meetings');
      this.log.debug(error.message)
      return true;
    }
  }

  async syncUsersMeetingWorker() {
    console.log('Start syncing calender for all users....');
    const users = await this.models.User.find().sort({ lastSync: -1 });

    for (const user of users) {
      if (user.refreshToken && user.refreshToken !== null) {
        await this.syncUserMeetings(user._id);
      }
    }
    return true;
  }
}
