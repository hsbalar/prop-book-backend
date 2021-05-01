import auth from './auth';
import user from './user';

export default function (app) {
  auth(app);
  user(app);
}
