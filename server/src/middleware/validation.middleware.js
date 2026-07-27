export const validateRegister = (req, res, next) => {
    const { name, email, phone, password } = req.body;

    // Check required fields
    if (!name || !email || !phone || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required.",
        });
    }

    // Name validation
    if (name.trim().length < 3) {
        return res.status(400).json({
            success: false,
            message: "Name must be at least 3 characters.",
        });
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email address.",
        });
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(phone)) {
        return res.status(400).json({
            success: false,
            message: "Invalid phone number.",
        });
    }

    // Password validation
    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters.",
        });
    }

    next();
};

export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required.",
        });
    }

    next();
};