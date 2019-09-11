const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, select: false },
    photo: { type: String },
    location: {
        lat: { type: Number },
        lgn: { type: Number }
    },
}, {
    timestamps: true,
    collection: 'shops',
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

// ค้นหา เมนูโดยมีเงื่อนไขว่า Shop _id === Menu shop
schema.virtual('menus', {
    ref: 'Menu',
    localField: '_id',
    foreignField: 'shop'
})

const Shop = mongoose.model('Shop', schema)
module.exports = Shop