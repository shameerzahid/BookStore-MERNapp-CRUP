const express = require ('express')
const dotenv = require ('dotenv')
const connectDB = require('./src/config/db')
const bookRoutes = require('./src/routes/bookRoutes')
const app = express()
const cors = require('cors')

app.use(express.json());
app.use(cors());
dotenv.config();

connectDB();
app.use('/book',bookRoutes);
const PORT = process.env.PORT || 5000;

const server =app.listen(PORT, console.log('Server listening on port 5000'));

