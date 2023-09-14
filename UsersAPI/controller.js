const { mongoose } = require("mongoose");
require('dotenv').config();
const { User } = require('./schema');
const { sign } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');



const SignUp = async (req, res) => {

    const { email, password, username, role } = req.body;
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB connected")
        const existingUser = await User.exists({ email: email })
        if (existingUser) {
            res.status(208).json({
                message: "User Already Exists"
            })
        }
        else {
            await User.create({ username, email, password: await hash(password, 12), role })
            console.log("User Created")
            res.status(201).json({
                message: "Signup Successfully"
            })
        }
    } catch (err) {
        res.json({
            message: err.message
        })
    }
}


const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        await mongoose.connect(process.env.MONGODB_URI)

        const existingUser = await User.findOne({ email: email })

        if (!existingUser) {
            res.status(404).json({
                message: "User not found"
            })
        }
        else {
            const decryptPassword = await compare(password, existingUser.password)
            if (email == existingUser.email && decryptPassword) {
                const token = sign(
                    {
                        id: existingUser._id,
                        username: existingUser.username,
                        email: existingUser.email,
                        profile: existingUser.profile,
                        role: existingUser.role
                    },
                    process.env.JWT_SECRET
                )
                res.json({
                    message: "Successfully Loggined",
                    token: token
                })
            }
            else {
                res.json({
                    message: "Invalid Credentials"
                })
            }


        }
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

const allUsers = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        const Users = await User.find()
        res.json({
            Users: Users
        })
    } catch (error) {
        res.json(
            {
                message: error.message
            }
        )

    }
}

const getUserByEmail = async (req, res) => {
    const { email } = req.query;
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        const Users = await User.findOne({ email: email })
        res.json({
            Users: Users
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}


module.exports = { SignUp, Login, allUsers, getUserByEmail }