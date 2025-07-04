import jwt from 'jsonwebtoken'
import { User } from '../Models/UserModel.js'



const protect = async (req, res, next) => {

    //Get the token from the cookie
    let token;


    try {

        token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        // Verify token
        const decode = jwt.verify(token, process.env.JWT_SECERT)
        // Get user from token
        req.user = await User.findById(decode.userId).select('-password')
        next()

    } catch (error) {

        console.log("Invailed Token")

    }



}

export default protect

