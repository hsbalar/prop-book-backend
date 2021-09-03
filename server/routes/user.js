import { verifyToken } from '../middleware/auth';

export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/api/init', [verifyToken], (req, res) => {
    res.json({ session: 'Initiliazed' });
  });
}
