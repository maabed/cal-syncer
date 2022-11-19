# Syncer
Sync google Calendar events API
build using:
  - TypeScript
  - Nodejs
  - [Fastify](https://www.fastify.io)
  - mongoDb: mongoose
  - docker
  - [Ajv](https://ajv.js.org)
  - [pino](https://getpino.io)

### Quick start (local setup)

- Install mongodb: `brew install mongodb-community`
- set `MONGODB_URI` environment variable on .env file
- Start the development server

```sh
cp .env.example .env
npm i
npm run dev
```
The http service should be run at port 9000

#### API's

    ├── ping (GET)
    ├── api/v1/meetings (GET) # List events/meeting for current user
    └── api/v1/user/sync (POST) # Sync new users and fetch calender events

  On the background there is very simple worker which tries to fetch events for users and store it on the mongo db