import express from 'express';
import { connectDB } from './Database/index.js'
import JobRoutes from './Routes/JobRoutes.js'
import userRoutes from './Routes/userRoutes.js'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
const app = express();
dotenv.config();

// Connect to database
connectDB();

const allowedOrigin = ["https://jobtrackerwebapp.onrender.com"]

// Middleware 
app.use(cookieParser());
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//Routes
app.use('/jobs', JobRoutes);
app.use('/user', userRoutes);


const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})