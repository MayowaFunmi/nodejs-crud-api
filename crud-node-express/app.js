require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const User = require('./models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(express.json());

const connectDB = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try {
        mongoose.Promise = global.Promise;
        mongoose.connect(process.env.DB_URL, connectionParams);
        console.log("connected to database successfully");
    } catch (error) {
        console.log("Failed to connect to database");
        console.log(error);
        process.exit(1);
    }
}
connectDB();

app.post("/register", async(req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const encryptedPassword = await bcrypt.hash(password, salt);
        console.log(salt);
        // validate user input
        if (!(email && password && first_nme && last_name)) {
            res.status(400).send("All input is required");
        }
        // check if user already exists
        //validate if user exist in database
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User already exist. Please Login");
        }
        //encrypt user password

        // create user in database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        // create token
        const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
            expiresIn: "5h",
        });

        //save user token
        user.token = token;

        // return new user
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
    }
});

app.post("/login", (req, res) => {

})
module.exports = app;