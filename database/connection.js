import mongoose from 'mongoose';

const connection = async () => {
  try {
    const conectionString = process.env.CONECTION_STRING;
    await mongoose.connect(conectionString);
    console.info('Conexion exitosa');
  } catch (error) {
    console.info(error);
  }
};

module.exports = {
  connection,
};