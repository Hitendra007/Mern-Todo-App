// Import necessary modules and models
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from '../models/user.model.js';

// Controller function for user registration
const registerUser = async (req, res) => {
    try {
        // Extract email and password from the request body
        const { email, password } = req.body;

        // Validate that email and password are provided
        if (!email || !password) {
            throw new ApiError(400, "All fields are required!!");
        }

        // Check if the user with the given email already exists
        const existedUser = await User.findOne({ email });
        if (existedUser) {
            throw new ApiError(409, "User with email already exists");
        }

        // Create a new user with the provided email and password
        const user = await User.create({
            email,
            password,
        });

        // Retrieve the created user (excluding password and token) for the response
        const createdUser = await User.findById(user._id).select(
            "-password -token"
        );

        // Return success response with the created user details
        return res.status(200).json(
            new ApiResponse(200, createdUser, "User successfully created !!")
        );
    } catch (error) {
        // Handle registration errors and return an appropriate error response
        throw new ApiError(400, error?.message || "Bad request!!");
    }
};

// Controller function for user login
const loginUser = async (req, res) => {
    try {
        // Extract email and password from the request body
        console.log(req.body)
        const { email, password } = req.body;

        // Validate that email and password are provided
        if (!email || !password) {
            throw new ApiError(400, "All fields are required !!");
        }

        // Find the user with the given email
        const user = await User.findOne({ email });

        // If the user is not found, throw a 404 error
        if (!user) {
            throw new ApiError(404, "User not found!!");
        }

        // Check if the provided password is correct
        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            throw new ApiError(401, "Password incorrect !!");
        }

        // Generate a token for the user
        const token = await user.generateToken(user._id);

        // Update user's token in the database
        user.token = token;
        user.save({ validateBeforeSave: false });

        // Retrieve the logged-in user details (excluding password and token) for the response
        const loggedInUser = await User.findById(user._id).select(
            "-password -token"
        );

        // Set options for the token cookie
        const options = {
            httpOnly: true,
            secure: true,
        };

        // Return success response with the logged-in user details and token
        return res.status(200)
            .cookie('token', token, options)
            .json(new ApiResponse(
                200, {
                user: loggedInUser, token
            }, "User logged in successfully"
            ));
    } catch (error) {
        // Handle login errors and return an appropriate error response
        throw new ApiError(401, error?.message || "User login failed !!");
    }
};

// Controller function for user logout
const logout = async (req, res) => {
    try {
        // Check if the user is already logged out (token is already undefined)
        if (!req.cookies?.token) {
            return res.status(200).json(new ApiResponse(200, {}, "User is already logged out."));
        }

        // Update the user's token to undefined in the database
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    token: undefined
                }
            },
            {
                new: true,
            }
        );

        // Set options for clearing the token cookie
        const options = {
            httpOnly: true,
            secure: true,
        };

        // Return success response with the cleared token cookie
        return res.status(200)
            .clearCookie('token', options)
            .json(new ApiResponse(200, {}, "User logged out successfully !!"));
    } catch (error) {
        // Handle logout errors and return an appropriate error response
        console.error(error);
        throw new ApiError(500, 'Internal server error');
    }
};

// Export the controller functions
export { registerUser, loginUser, logout };
