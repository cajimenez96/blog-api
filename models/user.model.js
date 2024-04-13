// // modelos necesarios
import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: 30,
    lowercase: true,
  },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
  password: {
    type: String,
    required: true,
  },
//   rolId: {
//     type: Schema.Types.ObjectId,
//     ref: 'rol',
//     required: true,
//   },
//   firebase: {
//     type: String,
//   },
//   active: {
//     type: Boolean,
//     default: true,
//   },
// }, {
//   timestamps: true,
});

module.exports = model('users', UserSchema);