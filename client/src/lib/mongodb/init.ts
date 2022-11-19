import { getDatabaseInstance } from '.';

getDatabaseInstance()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Mongodb Database connection is successfully connected!');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(`✗ MongoDB Connection Error. Please make sure MongoDB is running. -> ${err.message}`);
  });
