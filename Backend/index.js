const express = require ('express')
const dotenv = require ('dotenv')
const connectDB = require('./config/db')
const bookRoutes = require('./routes/bookRoutes')
const app = express()

app.use(express.json());

dotenv.config();

connectDB();
app.use('/book',bookRoutes);
const PORT = process.env.PORT || 5000;

const server =app.listen(PORT, console.log('Server listening on port 5000'));

