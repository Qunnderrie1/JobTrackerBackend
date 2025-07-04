import { User } from '../Models/UserModel.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../generateToken.js'
import { Job } from '../Models/JobModel.js'



export const loginUser = async (req, res) => {

    const { password, email } = req.body

    try {

        const user = await User.findOne({ email })

        // Check if user exits and password is correct
        if (!user && !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        // Generate token
        const token = generateToken(user._id)

        console.log('Incoming token' + token)

        // Set token in HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000

        })
        // Send user data
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
        })


    } catch (error) {
        console.error("Login Error" + error.message)
        res.status(500).json({ message: "Server error while loggin in" })

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