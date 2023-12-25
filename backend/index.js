const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('./db/config.js');
const User = require('./db/User.js');
const Product = require('./db/Product.js');
const app = express();
const jwt = require('jsonwebtoken');
const { secret } = require('./secret/secretKey.js');
const authenticateToken = require('./middleware/authenticate');

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

app.post('/add-product', authenticateToken, async (req, res) => {
    if (!req.body.price) return res.status(200).json({ error: 'Please Enter valid Price', code: 200, success: false });
    req.body = {
        ...req.body,
        is_active: true,
        is_deleted: false,
        price: parseInt(req.body.price),
        user_id: req.user._id,
        inventoryStatus: 'INSTOCK',
    }
    const product = new Product(req.body);
    let result = await product.save();
    res.status(200).json({ data: result, code: 200, success: true });
})

app.get('/products', authenticateToken, async (req, res) => {
    let product = await Product.find({ user_id: req.user._id });
    res.status(200).json({ data: product, code: 200, success: true });
})

app.delete('/product/:id', authenticateToken, async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    result._id = req.params.id
    if (result.deletedCount && result.acknowledged)
        res.status(200).json({ data: result, code: 200, success: true });
    else res.status(200).json({ error: 'Product Not Deleted', code: 200, success: false });
})

app.get('/product/:id', authenticateToken, async (req, res) => {
    const result = await Product.findOne({ _id: req.params.id })
    if (result)
        res.status(200).json({ data: result, code: 200, success: true });
    else res.status(200).json({ error: 'No Product Found', code: 200, success: false });
})

app.put('/product/:id', authenticateToken, async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body });
    if (result.modifiedCount && result.acknowledged) {
        res.status(200).json({ data: result, code: 200, success: true });
    }
    else res.status(200).json({ error: 'No Product Found', code: 200, success: false });
})

app.get('/search/:key', authenticateToken, async (req, res) => {
    try {
        // const pipeline = [
        //     {
        //         $match: {
        //             'user_id': req.user._id,
        //         }
        //     },
        //     {
        //         $match: {
        //             $or: [
        //                 { 'price': parseInt(req.params.key) || 0 }, // Match if `price` matches the numeric value
        //                 { 'name': { $regex: req.params.key, $options: 'i' } },
        //                 { 'company': { $regex: req.params.key, $options: 'i' } },
        //                 { 'category': { $regex: req.params.key, $options: 'i' } },
        //                 { 'description': { $regex: req.params.key, $options: 'i' } },
        //                 { 'inventoryStatus': { $regex: req.params.key, $options: 'i' } },
        //                 { 'price': { $regex: toString(req.params.key), $options: 'i' }}, // Match if `price` matches the numeric value
        //                 { 'price': req.params.key }, // Match if `price` matches the string value
        //                 {
        //                     $expr: {
        //                         $cond: {
        //                             if: { $eq: [{ $type: "$price" }, "double"] }, // Assuming price is stored as a numeric type
        //                             then: { $eq: ["$price", parseFloat(req.params.key)] },
        //                             else: { $eq: ["$price", req.params.key] }
        //                         }
        //                     }
        //                 }
        //             ]
        //         }
        //     },
        //     {
        //         $match: {
        //             $or: [
        //                 { 'price': req.params.key }, // Match if `price` matches the string value
        //                 { 'price': parseInt(req.params.key) || 0 }, // Match if `price` matches the numeric value
        //                 {
        //                     $expr: {
        //                         $cond: {
        //                             if: { $eq: [{ $type: "$price" }, "double"] }, // Assuming price is stored as a numeric type
        //                             then: { $eq: ["$price", parseFloat(req.params.key)] },
        //                             else: { $eq: ["$price", req.params.key] }
        //                         }
        //                     }
        //                 }
        //             ]
        //         }
        //     }
        // ];


        // let user = await Product.aggregate(pipeline);
        const regexKey = new RegExp(req.params.key, 'i'); // 'i' for case-insensitive search

        let query = {
            $or: [
                { name: { $regex: regexKey } },
                { company: { $regex: regexKey } },
                { category: { $regex: regexKey } },
                { description: { $regex: regexKey } },
                { inventoryStatus: { $regex: regexKey } }
            ]
            ,
            $and: [
                { user_id: req.user._id }
            ]
        };

        if (!isNaN(req.params.key)) {
            query.$or.push({ price: req.params.key });
        }

        let result = await Product.find(query);

        if (result.length > 0) {
            res.status(200).json({ data: result, code: 200, success: true, count: result.length });
        } else {
            res.status(200).json({ error: 'No Result Found', code: 200, success: false });
        }
    } catch (err) {
        console.error('Error occurred during product search:', err);
        res.status(500).json({ error: 'Internal Server Error', code: 500, success: false });
    }
});

app.listen(4000)