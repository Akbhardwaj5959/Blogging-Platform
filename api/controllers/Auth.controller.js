
import { handleError } from "../helper/handleError.js";
import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken";

export const Register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            // User already exists
            next(handleError(409, "User already exists with this email"));
            return;
        }

        const hashedPassword =  bcryptjs.hashSync(password);

        // Create a new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            
        });

        // // Save the user to the database
        

        await user.save();
        res.status(201).json({
            success: true,
            message: "User registered successfully",
        });

    } catch (error) {
        next(handleError(500, error.message));
    }
}

export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            // User not found
            next(handleError(404, "Invalid email or password"));
        }
        // Check if the password is correct
        const hashedPassword =user.password;
        const comparePassword = bcryptjs.compare(password, hashedPassword);
        if (!comparePassword) {
            // Password does not match
            next(handleError(401, "Invalid email or password"));
        }

        // Generate a token (you can use JWT or any other method)
        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email, 
            avtar: user.avtar
        }, process.env.JWT_SECRET);

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/',
        });

       const newUser = user.toObject({getters: true });
        delete newUser.password; // Remove password from the user object


        res.status(200).json({
            success: true,
            user: newUser,
            message: "User logged in successfully",
        });


    } catch (error) {
        next(handleError(500, error.message));
    }
}

export const GoogleLogin = async (req, res, next) => {
    try {
        const {name, email, avtar } = req.body;
        let user 
         user = await User.findOne({ email });
    
        if (!user) {
            
            // create  new user if not exists
            const password= Math.random().toString() // Generate a random password
            const hashedPassword = bcryptjs.hashSync(password);

            const newUser = new User({ 
                name,
                email,
                password: hashedPassword,
                avtar
                
            });
          user =  await newUser.save(); // Save the new user to the database
            
        }
        

        // Generate a token (you can use JWT or any other method)
        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email, 
            avtar: user.avtar
        }, process.env.JWT_SECRET);

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/',
        });

       const newUser = user.toObject({getters: true });
        delete newUser.password; // Remove password from the user object


        res.status(200).json({
            success: true,
            user: newUser,
            message: "User logged in successfully",
        });


    } catch (error) {
        next(handleError(500, error.message));
    }
}

export const Logout = async (req, res, next) => {
    try {
        

        res.clearCookie('access_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/',
        });


        res.status(200).json({
            success: true,
            
            message: "Logout successfully",
        });


    } catch (error) {
        next(handleError(500, error.message));
    }
}