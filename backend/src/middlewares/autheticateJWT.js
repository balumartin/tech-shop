import HttpError from "../utils/http-error";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/base.js";

const autheticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return next(new HttpError('Authentication token is missing', 403))
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded
        next()
    } catch (error) {
        next(new HttpError("Invalid or expired token", 401));
    }
}

export default autheticateJWT;