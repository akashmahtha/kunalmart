import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// ==========================
// Register User
// ==========================
export const register = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        // Check existing user
        const existingUser = await User.findOne({
            $or: [{ email }, { phone }],
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Create new user
        const user = await User.create({
            name,
            email,
            phone,
            password,
        });

        // Generate JWT
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Register Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================
// Login User
// ==========================
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Generate JWT
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================
// Get Logged In User
// ==========================
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error("Profile Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================
// Update Profile
// ==========================

export const updateProfile = async (req, res) => {

    try {

        const { name, phone, email } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found",
            });

        }

        // Check Phone Duplicate

        // Check Email Duplicate

        if (email && email !== user.email) {

            const emailExists = await User.findOne({
                email,
                _id: { $ne: user._id },
            });

            if (emailExists) {

                return res.status(400).json({
                    success: false,
                    message: "Email already exists",
                });

            }

        }

        // Check Phone Duplicate

        if (phone && phone !== user.phone) {

            const phoneExists = await User.findOne({
                phone,
                _id: { $ne: user._id },
            });

            if (phoneExists) {

                return res.status(400).json({
                    success: false,
                    message: "Phone already exists",
                });

            }

        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;

        await user.save();

        res.status(200).json({

            success: true,
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message,

        });

    }

};

// ==========================
// Change Password
// ==========================

export const changePassword = async (req, res) => {

    try {

        const {
            currentPassword,
            newPassword,
        } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found",

            });

        }

        const isMatch = await user.comparePassword(currentPassword);

        if (!isMatch) {

            return res.status(400).json({

                success: false,
                message: "Current password is incorrect",

            });

        }

        user.password = newPassword;

        await user.save();

        res.status(200).json({

            success: true,
            message: "Password changed successfully",

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message,

        });

    }

};