import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';

import mongodb from './config/mongo';
import routes from './routes';

const app = express();

const whitelist = [
  'https://property-book.netlify.app',
  'http://localhost:3000',
];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// // no stacktraces leaked to user
app.use((err, req, res, next) => {
  return res.status(500).end();
});

export function start() {
  return new Promise((resolve, reject) => {
    mongodb().then((db) => {
      let server = http.createServer(app);

      // save references
      app.db = db;
      app.server = server;

      // setup routes
      routes(app);

      // start server
      app.server.listen(process.env.PORT || 4000, (err) => {
        if (err) {
          return reject(err);
        }
        resolve(app);
      });
    });
  });
}
