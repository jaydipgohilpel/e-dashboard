const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number || String,
    category: String,
    user_id: String,
    company: String,
    description: String,
    is_active: Boolean,
    is_deleted: Boolean,
    inventoryStatus: String,
});

module.exports = mongoose.model('products', productSchema);