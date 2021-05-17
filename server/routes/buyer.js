import { verifyToken, isAdmin, isModerator } from '../middleware/auth';
import { getBuyers, addBuyer } from '../controller/buyer';

export default function (app) {
  app.get('/api/buyers', getBuyers);
  app.post('/api/add-buyer', addBuyer);
}
