import mongoose from 'mongoose';

const Connection = async (connection_string) => {
    const URL = connection_string
    try {
        await mongoose.connect(URL)
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;