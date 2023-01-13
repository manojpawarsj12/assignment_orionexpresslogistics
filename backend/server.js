const express = require("express")
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fileupload = require("express-fileupload")
const User = require("./model")
const bcrypt = require("bcrypt");
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileupload())
app.use(express.static('public/images'))
app.use(cors())
dotenv.config()
app.get("/", (req, res) => {
    return res.send("hello")
})

app.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(req.body,req.files)
        const imageFile = req.files.image
        
        await imageFile.mv('public/images/' + imageFile.name)
        if (email && password && imageFile) {
            const hashedpwd = await bcrypt.hash(password, 10)
            const userData = await User.create({ email, password: hashedpwd, img: imageFile.name })
            return res.json({
                sucess: true,
                data: userData
            })
        } else {
            return res.status(400).json({
                sucess: false,
                message: "Email and password is required"
            })
        }
    } catch (err) {
        console.log("signup errr", err)
        return res.status(500).json({
            sucess: false,
            message: err.message || "Internal server Error",
            error: err
        })
    }
})
const PORT = process.env.PORT || 3001

mongoose.connect(process.env.DB_URL, () => {
    console.log("connected to db")
    app.listen(PORT, () => {
        console.log("App is running on port", PORT)
    })
});
