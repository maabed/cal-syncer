import { google } from 'googleapis';
import axios from 'axios';
import { AbstractService } from './abstract';
import configs from '../config';

const { id, secret, cbURL } = configs.googleClient;

export class GCalService extends AbstractService {
  private oAuthURL = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='
  private oauth2Client = new google.auth.OAuth2(id, secret, cbURL);

  async getGoogleAuthURL() {
    const scope = ['profile', 'email', 'https://www.googleapis.com/auth/calendar'];
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope,
    });
  }

  async getGoogleUser({ code }) {
    const { tokens } = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials({ refresh_token: tokens.refresh_token });

    const googleUser = await axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
        { headers: { Authorization: `Bearer ${tokens.id_token}` } })
      .then(res => ({ data: res.data, refresh_token: tokens.refresh_token }))
      .catch((error) => { throw this.errors.internal(error.message) });

    return googleUser;
  }

  getOAuth2Client(refresh_token) {
    const oAuth2Client = new google.auth.OAuth2(id, secret, cbURL);
    oAuth2Client.setCredentials({ refresh_token });
    return oAuth2Client;
  }
}
