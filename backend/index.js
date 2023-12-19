const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('./db/config.js')
const User = require('./db/User.js')
const app = express();

app.use(express.json())
app.use(cors());

app.post('/register', async (req, res) => {
    const user = new User(req.body)
    const result = await user.save()
    result = result.toObject();
    delete result.password;
    res.status(200).json({ data: result, code: 200 });
})

app.post('/login', async (req, res) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password")
        if (user) {
            res.status(200).json({ data: req.body, code: 200 });
        } else {
            res.status(404).json({ data: 'No User found', code: 404 });
        }
    }
    else {
        res.status(400).json({ data: 'Email or Password not provided', code: 400 });
    }
})
app.listen(4000)