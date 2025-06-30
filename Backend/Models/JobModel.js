import mongoose from "mongoose";
const { model, Schema } = mongoose;



// Job Schema
const JobSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    jobTitle: {
        type: String,
        require: true,
    },
    companyName: {
        type: String,
        require: true,
    },
    location: {
        type: String,
        require: true,
    },
    link: {
        type: String,
        require: true,
    },
    dateApplied: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true,
    },
})


export const Job = model('Jobs', JobSchema)
