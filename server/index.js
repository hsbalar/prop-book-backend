import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';

import mongodb from './config/mongo';
import routes from './routes';

const app = express();

app.use(
  cors({
    origin: 'https://property-book.netlify.app',
  })
);

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
