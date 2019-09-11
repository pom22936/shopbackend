const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Schema.Types.Decimal128, required: true },
    shop: { type: Schema.Types.ObjectId, required: true, ref: 'Shop' }
})

const Menu = mongoose.model('Menu', schema)
module.exports = Menu