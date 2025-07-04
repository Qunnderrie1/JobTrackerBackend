import express from 'express';
import { connectDB } from './Database/index.js'
import JobRoutes from './Routes/JobRoutes.js'
import userRoutes from './Routes/userRoutes.js'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
const app = express();
dotenv.config();


// Middleware 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: "https://jobtrackerwebapp.onrender.com/",
}));
app.use(cookieParser());
//Routes
app.use('/jobs', JobRoutes);
app.use('/user', userRoutes);


// Connect to database
connectDB();


const PORT = process.env.PORT || 8080


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})