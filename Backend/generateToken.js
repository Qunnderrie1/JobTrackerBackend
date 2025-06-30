import jwt from 'jsonwebtoken'



export const generateToken = (id) => {
    const token = jwt.sign({ userId: id }, process.env.JWT_SECERT, { expiresIn: '1h' })


    return token
}

