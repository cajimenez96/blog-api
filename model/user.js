import { Schema, model } from 'mongoose';

const userSchema = new Schema({
	userName: {
		type: String,
		required: true,
		unique: true,
		minLength: 3,
		maxLength: 50,
	},
	name: {
		type: String,
		required: true,
		minLength: 2,
		maxLength: 50,
	},
	lastName: {
		type: String,
		required: true,
		minLength: 2,
		maxLength: 50,
	},
	password: {
		type: String,
		required: true,
		minLength: 4,
		maxLength: 100,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		maxLength: 100,
	},
	phoneNumber: {
		type: String,
		maxLength: 30,
	},
	address: {
		type: String,
		maxLength: 100,
	},
	country: {
		type: String,
		required: true,
		minLength: 4,
		maxLength: 60,
	},
	birthday: {
		type: Date,
		required: true,
	},
	role: {
		type: String,
		enum: {
			values: ['0', '1', '2'],
			message: '{VALUE} no es un rol válido',
		},
	},
});


const user = model('user', userSchema);

export default user;