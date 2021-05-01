import {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
} from '../middleware/signup';
import { signup, signin } from '../controller/auth';

export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post(
    '/api/auth/signup',
    [checkDuplicateUsernameOrEmail, checkRolesExisted],
    signup
  );

  app.post('/api/auth/signin', signin);
}
