const appConfig = {
  siteName: 'Syncer Calendar',
  title: 'Syncer Calendar',
  locale: 'en',
  siteUrl: process.env.SITE_URL || 'http://localhost:3000',
  apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:9000',
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/local',
  jwtSecretKey: process.env.JWT_SECRET_KEY || 'secret',
  nextAuthSecret: process.env.NEXTAUTH_SECRET || 'secret',
} as const;

export default appConfig;
