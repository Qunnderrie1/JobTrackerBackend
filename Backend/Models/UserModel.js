import mongoose from "mongoose";
const { model, Schema } = mongoose;



// User Schema
const userSchema = new Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
})


export const User = model('Users', userSchema)
