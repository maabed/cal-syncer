import { google } from 'googleapis';
import { AbstractService } from './abstract';

const calendar = google.calendar('v3')

export class MeetingService extends AbstractService {
  async add(id){
    try {
      const user = await this.models.User.findById(id);
      if (!user) {
        throw this.errors.notFound('user is not exist');
      }

      const meeting = await this.models.Meeting.find(id);
      console.log('↓↓↓↓↓ meeting ↓↓↓↓↓');
      console.log(meeting);

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

      // sync user meeting before fetching
      await this.syncUserMeetings(userId);

      const meetings = await this.models.Meeting.find(userId);

      return {
        meetings: meetings,
        count: meetings.length,
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
      // @ts-ignore this should wark as well
      // const calendar = google.calendar({version: 'v3', auth: oauthClient});

      const { data } = await calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 50,
        singleEvents: true,
        orderBy: 'startTime'
      });

      if (data.items && data.items.length > 0) {
        const meetings = data.items.map(v => ({ ...v, userId: id }));
        // Skipping duplicate events with unordered insert
        await this.models.Meeting.insertMany(meetings, { ordered: false });
      }
      return [];
    } catch (error) {
      this.log.error(error, 'Falied while syncing user meetings');
      throw this.errors.internal(error.message);
    }
  }

  async syncUsersMeetingWorker() {
    console.log('Start syncing calender for all users....');
    // try {
    const users = await this.models.User.find().sort({ lastSync: -1 });
    console.log('↓↓↓↓↓ users ↓↓↓↓↓')
    console.log(users)

    for (const user of users) {
      if (user.refreshToken && user.refreshToken !== null) {
        await this.services.meeting.syncUserMeetings(user.id)
      }
    }
    return true;
    // } catch (error) {
    //   this.log.error(error, 'Falied while syncing user meetings');
    //   throw this.errors.internal(error.message);
    // }
  }
}
