#  Syncer Project
Sync google Calendar events client app

build using::
  - [Next.js](https://nextjs.org) for Static Site Generator
  - [Next Auth](https://next-auth.js.org/) for Google OAuth 
  - Type checking [TypeScript](https://www.typescriptlang.org)
  - [redux toolkit](https://redux-toolkit.js.org/) store, reducer, actions, slices
  - Strict Mode for TypeScript and React 18
  - [ChakraUI](https://chakra-ui.com/)


![alt text](https://github.com/maabed/cal-syncer/blob/main/client/public/assets/images/screenshot.png?raw=true)


Built-in feature from Next.js:
- ☕ Minify HTML & SCSS
- 💨 Reverse proxy 
- ✅ Cache busting

### Requirements

- Node.js 14+ and yarn 1.22+

### Getting started 
#### Backend API
- Install mongodb: `brew install mongodb-community`
- set `MONGODB_URI` environment variable on .env file
- Start the development server

```sh
cd server/
cp .env.example .env
npm i
npm run dev
```
The http service should be run at port 9000

#### Client
- Copy .env.example to .env.local and replace the values
- Run the following command on your local environment:

```shell
cd client/
yarn install
yarn dev
```

Open http://localhost:3000 

### Docker compose

```shell
  docker-compose up -d
```
You will need to change the envvars on compose file or you cann run using  `.env.local` file 

```shell
docker-compose --env-file .env.local up -d
```
### Setting up project in Google Cloud
- Go to [Google Cloud Console](https://console.cloud.google.com) and create a new project
- Enabling Google API
    - In sidemenu options, select `APIs and Services` -> `Library` -> Search for `Google Calendar API` and enable it
- Setting up the OAuth Screen
    - Inside `APIs and Services` -> `OAuth Consent Screen` -> Select `User Type` (Select `External` for testing) and click on `Create`
    - Now enter all the application details and click `Save and Continue`
    - Inside `Scopes` section -> `Add Scopes` -> Seach for `Google Calendar API` and select the `/auth/calendar` scope. This gives our app access to read and write to user's calendar -> `Save and Continue`
    - If your application is still in `Testing` phase and you selected `External` user type in Step 1, you'll have to provide email ids of all the users who can access your app -> `Save and Continue`
    - Check the app summary and click `Save`
- Generating Credentials
    - Again in `APIs and Services`, select `Credentials` -> `Create Credentials` -> `oAuth Client ID`
    - Select `Application Type` (Web Application), add authorized origin (Use `http://localhost:3000` if you don't have a Domain) and a callback URL where Google will send the response after OAuth (`http://localhost:3000/api/auth/callback/google` in our case). Also add this as `CALLBACK_URL` in the `.env` file
    - Save you client id and secret as `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in the `.env` file
