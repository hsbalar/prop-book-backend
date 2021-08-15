import { verifyToken, isAdmin, isModerator } from '../middleware/auth';
import {
  moderatorBoard,
  adminBoard,
  userBoard,
  allAccess,
} from '../controller/user';

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

  app.get('/api/test/all', allAccess);

  app.get('/api/test/user', [verifyToken], userBoard);

  app.get('/api/test/mod', [verifyToken, isModerator], moderatorBoard);

  app.get('/api/test/admin', [verifyToken, isAdmin], adminBoard);
}
