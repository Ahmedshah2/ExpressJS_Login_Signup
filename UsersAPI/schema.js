const { Schema, model } = require('mongoose')

// creating Schema for mongo


const userschema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    profile: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
    },
    joining: {
        type: Date,
        default: Date.now()
    }

})

const User = model("User", userschema)

module.exports = { User };