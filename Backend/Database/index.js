import mongoose from "mongoose";



// Connect to the MongoDB Database
export const connectDB = async () => {

    const connect = await mongoose.connect(process.env.DATA_BASE_KEY);
    if (connect) {
        console.log(`Database Connected!`)
    }


}


