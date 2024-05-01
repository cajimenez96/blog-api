import {
	createUserService,
	findUserService,
	loginUserService
} from '../service/user-service.js';
import {
	PASSWORD_REGEX,
	USER_ROLES,
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
					message: userResponseMessages.missingFields.message + missingFields.join(', '),
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
		if (!USER_ROLES.includes(role)) {
			return response
				.status(userResponseMessages.invalidRole.statusCode)
				.json({
					statusCode: userResponseMessages.invalidRole.statusCode,
					message: userResponseMessages.invalidRole.message,
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


export const loginUser = async (req, res) => {
	try {
		const requiredFields = [
			'password',
			'email',
		];
		const missingFields = requiredFields.filter((field) => !req.body[field]);
		if (missingFields.length > 0) {
			return res
				.status(userResponseMessages.missingFields.statusCode)
				.json({
					statusCode: userResponseMessages.missingFields.statusCode,
					message: userResponseMessages.missingFields.message + missingFields.join(', '),
				});
		};
		const loguedUser = await loginUserService(req.body)
		if (!loguedUser) {
			return res.status(userResponseMessages.loginInvalid.statusCode).json({
				message: userResponseMessages.loginInvalid.message,
			});
		}
		const userData = {
			UserId: loguedUser.userFounded._id,
			Token: loguedUser.accessToken,
			Username: loguedUser.userFounded.userName,
			Email: loguedUser.userFounded.email,
			LastName: loguedUser.userFounded.lastName,
			UserType: loguedUser.userFounded.role,
		};

		return res.status(userResponseMessages.userLogin.statusCode).json({
			statusCode: userResponseMessages.userLogin.statusCode,
			message: userResponseMessages.userLogin.message,
			data: {
				userData
			}
		})

	} catch (error) {
		return res.status(userResponseMessages.loginError.statusCode).json({
			error: error,
			message: userResponseMessages.loginError.message,
		});
	}
}

export const logoutUser = async (request, response) => {
	const token = request.body.token;
	await Token.deleteOne({ token: token });

	response.status(204).json({ msg: 'logout successfull' });
}