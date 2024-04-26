import {
	createUserService,
	findUserService,
} from '../service/user-service.js';
import {
	PASSWORD_REGEX,
	ID_REGEX,
} from '../utils/constants.js';
import {
	userResponseMessages
} from '../utils/response-messages/user-messages.js'


export const singupUser = async (request, response) => {
	try {
		const requiredFields = [
			'name',
			'lastName',
			'userName',
			'password',
			'email',
			'country',
			'birthday',
			'role',
		];
		const missingFields = requiredFields.filter((field) => !request.body[field]);
		if (missingFields.length > 0) {
			return response
				.status(userResponseMessages.missingFields.statusCode)
				.json({
					statusCode: userResponseMessages.missingFields.statusCode,
					message: userResponseMessages.missingFields.message + missingFields.join(', ')
				});
		};
		const {
			name,
			lastName,
			userName,
			password,
			email,
			phoneNumber,
			address,
			country,
			birthday,
			role,
		} = request.body;
		const existingUser = await findUserService({ email: email });
		if (existingUser) {
			return response
				.status(userResponseMessages.emailAlreadyInUse.statusCode)
				.json({
					statusCode: userResponseMessages.emailAlreadyInUse.statusCode,
					message: userResponseMessages.emailAlreadyInUse.message,
				});
		}
		if (!PASSWORD_REGEX.test(password)) {
			return response
				.status(userResponseMessages.invalidPassword.statusCode)
				.json({
					statusCode: userResponseMessages.invalidPassword.statusCode,
					message: userResponseMessages.invalidPassword.message,
				});
		}
		if (!ID_REGEX.test(role)) {
			return response
				.status(userResponseMessages.invalidField.statusCode)
				.json({
					statusCode: userResponseMessages.invalidField.statusCode,
					message: userResponseMessages.invalidField.message + Object.keys(role),
				});
		}
		const newUser = await createUserService({
			name,
			lastName,
			userName,
			password,
			email,
			phoneNumber,
			address,
			country,
			birthday,
			role,
		});
		return response
			.status(userResponseMessages.userSignedUp.statusCode)
			.json({
				statusCode: userResponseMessages.userSignedUp.statusCode,
				message: userResponseMessages.userSignedUp.message,
				user: newUser.email,
			});
	} catch (error) {
		return response
			.status(userResponseMessages.signUpError.statusCode)
			.json({
				statusCode: userResponseMessages.signUpError.statusCode,
				message: userResponseMessages.signUpError.message,
				error: error.message,
			});
	}
};


export const loginUser = async (request, response) => {
	let user = await User.findOne({ username: request.body.username });
	if (!user) {
		return response.status(400).json({ msg: 'Username does not match' });
	}

	try {
		let match = await bcrypt.compare(request.body.password, user.password);
		if (match) {
			const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
			const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

			const newToken = new Token({ token: refreshToken });
			await newToken.save();

			response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username });

		} else {
			response.status(400).json({ msg: 'Password does not match' })
		}
	} catch (error) {
		response.status(500).json({ msg: 'error while login the user' })
	}
}

export const logoutUser = async (request, response) => {
	const token = request.body.token;
	await Token.deleteOne({ token: token });

	response.status(204).json({ msg: 'logout successfull' });
}