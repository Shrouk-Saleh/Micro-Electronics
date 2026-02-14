const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
    try {
        const { Username, email, password, role } = req.body;

        if (!Username || !email || !password) {
            return res.status(400).json({
                msg: "Missing required data"
            });
        }

        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(400).json({
                msg: "Account already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            Username,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            msg: "User created successfully",
            data: user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Server error"
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                msg: "Missing required data"
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: "user account not found"
            });
        }
        const matchedPassword = await bcrypt.compare(password, user.password);
        if (!matchedPassword) {
            return res.status(400).json({
                msg: "invalid password"
            });
        }
        res.status(200).json({
            msg:"success login"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Server error"
        });
    }
};
