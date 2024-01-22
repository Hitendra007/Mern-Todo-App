
import jwt from "jsonwebtoken";
import { User } from '../models/user.model.js';
import { ApiError } from "../utils/ApiError.js";

export const verifyJWT = async (req, _, next) => {
    try {
        console.log("jwt checking .....")
        const token = req.cookies?.token || req.header('Authorization')?.replace("Bearer ", "");

        if (!token) {
            // If token is not present, set req.user to null or an appropriate value
            req.user = null;
            return next();
        }

        const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(decodeToken?._id).select(
            "-password -token"
        );

        if (!user) {
            // If user is not found, set req.user to null or an appropriate value
            req.user = null;
            return next();
        }

        req.user = user;
        next();
    } catch (error) {
        // If token is invalid, set req.user to null or an appropriate value
        req.user = null;
        next();
    }
};

