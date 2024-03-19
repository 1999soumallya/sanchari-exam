const mongoose = require('mongoose');

let url = 'mongodb+srv://Sanchari:sanchari@cluster0.ai6xx.mongodb.net/management';

mongoose.set('strictQuery', true);
mongoose.connect(url);

const db = mongoose.connection;

db.on('connected', () => console.log('Database is successfully connected'))
db.on('disconnected', () => console.log('Database is successfully disconnected'))

db.on('error', console.error.bind(console, 'MongoDB connection error:'));