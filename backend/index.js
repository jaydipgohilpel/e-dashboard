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
    res.status(200).json({ data: result, code: 200 });
})
app.listen(4000)