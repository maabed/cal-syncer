import mongoose from 'mongoose';
import { AbstractService } from './abstract';

export class UserService extends AbstractService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async sync({ id, email, name, accessToken, refreshToken, idToken }) {
    try {
      let user = await this.models.User.findOne({email});
  
      if (!user) {
        user = new this.models.User({
          _id: new mongoose.Types.ObjectId(),
          googleId: id,
          name,
          email,
          refreshToken
        });
        
        await user.save();
      } else {
        user.refreshToken = refreshToken;
        const results = await user.save();
        console.log('↓↓↓↓↓ results ↓↓↓↓↓')
        console.log(results)
      }

      await this.services.meeting.syncUserMeetings(id);
      return true;
    } catch (error) {
      this.log.error(error, 'Falied to generate events');
      throw this.errors.internal(error.message);
    }
  }
  async setRefreshToken(userId, refreshToken) {
    try {
      const user = await this.models.User.findById(userId);
  
      if (!user) {
        throw this.errors.notFound('user is not exist');
      }

      user.refreshToken = refreshToken;
      await user.save();
      return true;
    } catch (error) {
      this.log.error(error, 'Falied to generate events');
      throw this.errors.internal(error.message);
    }
  }
}
