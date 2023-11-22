const express = require ('express')
const dotenv = require ('dotenv')
const connectDB = require('./src/config/db')
const app = express()

app.use(express.json());

dotenv.config();

connectDB();
const PORT = process.env.PORT || 5000;

const server =app.listen(PORT, console.log('Server listening on port 5000'));