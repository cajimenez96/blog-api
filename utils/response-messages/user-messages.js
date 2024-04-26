export const userResponseMessages = {
  missingFields : {
    statusCode: 400,
    message: 'Campos obligatorios faltantes: '
  },
  invalidPassword: {
    statusCode: 400,
    message: 'La contraseña debe tener al menos 4 caracteres, un número, un caracter especial y una letra mayúscula',
  },
  emailAlreadyInUse: {
    statusCode: 400,
    message: 'Correo electrónico ya en uso',
  },
  invalidField: {
    statusCode: 400,
    message: 'Campo no válido: '
  },
  signUpError: {
    statusCode: 500,
    message: 'Error al registrar usuario',
  },
  userSignedUp: {
    statusCode: 201,
    message: 'Usuario registrado',
  },
};
