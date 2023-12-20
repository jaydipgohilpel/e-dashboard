const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('./db/config.js')
const User = require('./db/User.js')
const app = express();
const jwt = require('jsonwebtoken');
const { secret } = require('./secret/secretKey.js');

app.use(express.json())
app.use(cors());

app.post('/register', async (req, res) => {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        res.status(200).json({ error: 'Email already exists', code: 200, success: false, });
    } else {
        const user = new User(req.body)
        let result = await user.save()
        result = result.toObject();
        delete result.password;
        res.status(200).json({ data: result, code: 200, success: true });
    }
})

app.post('/login', async (req, res) => {
    if (req.body.email && req.body.password) {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            if (user.password === req.body.password) {
                let result = user.toObject();
                delete result.password;
                const token = jwt.sign(result, secret, { expiresIn: '24h' });
                res.status(200).json({ token: token, code: 200, success: true });
            }
            else {
                res.status(200).json({ error: 'Invalid Email or Password', code: 200, success: false, });
            }
        } else {
            res.status(200).json({ error: 'User not Exist', code: 200, success: false });
        }
    }
    else {
        res.status(200).json({ error: 'Email or Password not provided', code: 200, success: false });
    }
})
app.listen(4000)