import jwt from 'jsonwebtoken'
import { User } from '../Models/UserModel.js'



const protect = async (req, res, next) => {
    //Get the token from the cookie
    const token = req.cookies.token

    console.log('Token from cookie ' + req.cookies.token)
    console.log('Token ' + req.cookies)
    console.log('request ' + req)

    if (!token) {
        return res.status(401).json({ message: "No Token Provided!" })
    }


    try {

        // Verify token
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        // Get user from token
        req.user = await User.findById(decode.userId).select('-password')

        if (!req.user) {
            return res.status(404).json({ message: "User not found" })
        }

        next();

    } catch (error) {
        console.error('Invalid token:' + error.message);
        return res.status(401).json({ message: "Invalid or expired token" })

    }


}

export default protect

