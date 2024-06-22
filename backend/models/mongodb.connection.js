import mongoose from 'mongoose';
import credentials from './mongodb-uri-credentials.js';

var mongodbConnection = await mongoose.connect(credentials, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB')
    return mongoose;
})
.catch((err) => {
    console.log('Unable to connect to MongoDB')
})

export default mongodbConnection