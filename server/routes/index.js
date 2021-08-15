import auth from './auth';
import user from './user';
import property from './property';

export default function (app) {
  auth(app);
  user(app);
  property(app);
}
