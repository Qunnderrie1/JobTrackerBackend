import { Job } from '../Models/JobModel.js'




export const allJobs = async (req, res) => {

    try {
        const allJobs = await Job.find({ user: req.user });
        res.json(allJobs)

    } catch (error) {
        return res.status(402).json({ message: "Failed to get user jobs " + error.message })
    }

}
export const getJobByID = async (req, res) => {

    const { id } = req.params

    try {
        const byIdJobs = await Job.find({ _id: id });
        res.send(byIdJobs)

    } catch (error) {
        return res.status(402).json({ message: "Failed to get user jobs " + error.message })

    }

}
export const createJob = async (req, res) => {

    const { jobTitle, companyName, location, link, dateApplied, status } = req.body

    try {
        const newJob = await Job.create({
            jobTitle: jobTitle,
            companyName: companyName,
            location: location,
            dateApplied: dateApplied,
            link: link,
            status: status,
            user: req.user

        });
        res.send(newJob)

    } catch (error) {
        return res.status(402).json({ message: "Failed to get user jobs " + error.message })

    }

}
export const updateJob = async (req, res) => {

    const { id } = req.params
    try {
        const updateJob = await Job.updateOne({ _id: id }, req.body);
        res.send(updateJob)

    } catch (error) {
        res.status(401).json({ errorMsg: "Failed to update job" })
    }

}
export const deleteJob = async (req, res) => {
    const { id } = req.params
    try {
        const deleteJob = await Job.deleteOne({ _id: id });
        res.send(deleteJob)

    } catch (error) {
        res.json({ Msg: "Failed to delete job" }).status(401)

    }

}