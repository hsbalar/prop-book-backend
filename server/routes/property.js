import { verifyToken, isAdmin, isModerator } from '../middleware/auth';
import {
  saveProperty,
  getProperty,
  updateProperty,
  deleteProperty,
} from '../controller/property';

export default function (app) {
  app.post('/api/save-property', saveProperty);
  app.post('/api/update-property', updateProperty);
  app.post('/api/delete-property', deleteProperty);
  app.post('/api/properties', getProperty);
}
