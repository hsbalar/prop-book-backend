import { verifyToken } from '../middleware/auth';
import {
  saveProperty,
  getProperty,
  updateProperty,
  deleteProperty,
  getDashboard,
  filterProperty,
  advanceFilter,
} from '../controller/property';

export default function (app) {
  app.get('/api/metrix', verifyToken, getDashboard);
  app.post('/api/save-property', verifyToken, saveProperty);
  app.post('/api/update-property', verifyToken, updateProperty);
  app.post('/api/delete-property', verifyToken, deleteProperty);
  app.post('/api/properties', verifyToken, getProperty);
  app.post('/api/filter', verifyToken, filterProperty);
  app.post('/api/advance-filter', verifyToken, advanceFilter);
}
