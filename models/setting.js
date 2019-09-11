const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true},
    create: { type: Date, required: true, }
})

const setting = mongoose.model('Setting',schema)
module.exports = setting