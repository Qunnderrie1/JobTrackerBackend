import { User } from '../Models/UserModel.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../generateToken.js'
import { Job } from '../Models/JobModel.js'



export const loginUser = async (req, res) => {

    const { password, email } = req.body

    try {

        const user = await User.findOne({ email })

        // Make sure no user exit with the same email
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = generateToken(user._id);
            res.cookie('token', token, { httpOnly: true })
            res.json(user)


        } else {
            res.status(401).json({ message: "Invalid crendentials" })
        }

    } catch (error) {

        res.json({ erroMsg: "Failed to login user." })

    }



}


export const createUser = async (req, res) => {

    const { username, password, email } = req.body

    try {
        const user = await User.findOne({ email })

        // Make sure no user exit with the same email
        if (user) {
            console.log("user already exits")
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashPassword,
        })
        generateToken(newUser._id)

        res.send(newUser)

    } catch (error) {

        throw new Error("Failed to create user.")

    }

}

export const logoutUser = async (req, res) => {

    res.clearCookie('token', '');
    res.json({ msg: "logging out user" })



}

export const deleteUser = async (req, res) => {

    try {
        const deleteUserJobs = await Job.deleteMany({ user: req.user })
        const deleteUser = await User.deleteOne({ _id: req.user })
        console.log(deleteUser)
        console.log(deleteUserJobs)

    } catch (error) {
        res.status(401).json({ errorMsg: "Failed to delete user & user jobs." })

    }

    res.clearCookie('token', '')

}