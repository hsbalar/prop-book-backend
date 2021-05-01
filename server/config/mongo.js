/* eslint no-process-exit: 0 */

import mongoose from 'mongoose';
import config from './config';

import Role from '../models/Role';

const noop = () => {};

function gracefulKill(signal = 'SIGUSR2') {
  return function () {
    mongoose.connection.close(() => process.kill(process.pid, signal));
  };
}

// If the Node process ends, close the Mongoose connection
['SIGINT', 'SIGTERM', 'SIGUSR2'].forEach((signal) =>
  process.once(signal, gracefulKill(signal))
);

export default function () {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    let uris = config.database.url;
    const db = mongoose
      .connect(uris, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        initial();
      });
    return resolve(db);
  });
}

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'user',
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }
        console.log("added 'user' to roles collection");
      });

      new Role({
        name: 'admin',
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}
