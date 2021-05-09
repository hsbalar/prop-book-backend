import mongoose, { Schema } from 'mongoose';

const User = new Schema({
  username: String,
  email: String,
  name: String,
  password: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
    },
  ],
});

export default mongoose.model('User', User);
