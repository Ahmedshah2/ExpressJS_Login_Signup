const { Schema, model } = require('mongoose')


const CategorySchema = new Schema({
    CategoryName: {
        type: String,
        required: true,
        unique: true
    },
    CategoryImage: {
        type: String,
        required: true
    }

})

const Category = model('categories', CategorySchema)
module.exports = Category