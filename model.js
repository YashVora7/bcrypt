const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        email: String,
        password: String
    }
)

const userModel = mongoose.model("user_bcryption",userSchema)

module.exports = userModel