const { connect } = require("mongoose")
require('dotenv').config()
const Products = require('./schema')

const getProducts = async (req, res) => {

    try {
        await connect(process.env.MONGODB_URI)
        const products = await Products.find()
        res.json({ products })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}


const createProduct = async (req, res) => {
    const { productname, thumbnail, description, price, category, brand, images } = req.body

    if (!productname || !thumbnail || !description || !price || !category || !brand || !images) {
        res.status(400).json({ message: 'Invalid Payload' })
    }

    else {
        try {
            await connect(process.env.MONGODB_URI)
            const checkExisting = await Products.exists({ productname })
            if (checkExisting) {
                res.status(403).json({ message: "Product Already Exists" })
            }
            else {
                await Products.create({ productname, thumbnail, description, price, category, brand, images })
                const products = await Products.find()
                res.status(201).json({
                    message: "Product Created Successfully",
                    products
                })
            }

        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

}

const deleteProduct = async (req, res) => {
    const { _id } = req.body;
    if (!_id) {
        res.status(403).json({ message: "ProductID is required" })
    }
    else {
        await connect(process.env.MONGODB_URI);
        const products = await Products.deleteOne({ _id })
        res.json({ message: "Deleted Successfully", products })
    }
}


const ProductbyCategory = async (req, res) => {
    const { category } = req.params
    if (!category) {
        res.status(403).json({ message: "Please Enter Category Name" })
    }
    else {
        await connect(process.env.MONGODB_URI)
        const products = await Products.find({ category })
        res.json({ products })
    }
}

const ProductbyId = async (req, res) => {
    const { _id } = req.query
    if (!_id) {
        res.status(403).json({ message: "Please Give Product id" })
    }
    else {
        await connect(process.env.MONGODB_URI)
        const products = await Products.findOne({ _id })
        res.json({ products })
    }
}


module.exports = { getProducts, createProduct, deleteProduct, ProductbyCategory, ProductbyId }