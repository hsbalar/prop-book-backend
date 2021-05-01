import mongoose, { Schema } from 'mongoose';

const Role = new Schema({
  name: String,
});

export default mongoose.model('Role', Role);
