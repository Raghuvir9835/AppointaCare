import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
// user authentication middleware
const authUser = async (req, res, next) => {

    const { token } = req.headers
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again by user' })
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        // Store on req directly so both GET and POST routes can access it
        req.userId = token_decode.id
        // Also set on body for POST routes that use req.body.userId
        if (req.body) {
            req.body.userId = token_decode.id
        }
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authUser;
