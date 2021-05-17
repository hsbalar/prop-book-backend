import auth from './auth';
import user from './user';
import buyer from './buyer';

export default function (app) {
  auth(app);
  user(app);
  buyer(app);
}
