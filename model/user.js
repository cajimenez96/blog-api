import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	username: {
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
		minLength: 10,
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
			values: ['rol1', 'rol2', 'rol3'], //TODO: definir roles
			message: '{VALUE} no es un rol valido',
		},
		required: true,
	},
});


const user = mongoose.model('user', userSchema);

export default user;