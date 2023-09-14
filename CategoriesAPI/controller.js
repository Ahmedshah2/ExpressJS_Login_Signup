const { connect } = require('mongoose')
require('dotenv').config()
const Category = require('./schema')


const createCategory = async (req, res) => {

    const { CategoryName, CategoryImage } = req.body

    if (!CategoryName || !CategoryImage) {
        res.status(403).json({
            message: "Category Name or Image not provided"
        })
    }

    else {

        try {
            await connect(process.env.MONGODB_URI)
            console.log("DB Connected")
            const checkDuplicate = await Category.exists({ CategoryName: CategoryName })
            console.log("Duplicate==>", checkDuplicate)

            if (checkDuplicate) {
                res.json({
                    message: "Category Already Exists"
                })
            }
            else {
                await Category.create({ CategoryName, CategoryImage })
                const categories = await Category.find()

                res.json({
                    message: "Category Created Successfully",
                    categories
                })
            }
        }

        catch (error) {
            res.json({
                message: error.message
            })

        }

    }
}

const getAllCategories = async (req, res) => {

    try {
        await connect(process.env.MONGODB_URI)

        const categories = await Category.find()
        res.json(
            {
                categories
            })
    }
    catch (error) {
        res.json({
            message: error.message
        })
    }
}

const deleteCategory = async (req, res) => {
    const { _id } = req.body;

    if (!_id) {
        res.status(400).json({
            message: "Category Name not given"
        })
    }

    else {
        try {
            await connect(process.env.MONGODB_URI)
            await Category.deleteOne({ _id })
            const categories = await Category.find()

            res.json({
                message: "Category Deleted Successfully",
                categories
            })

        }

        catch (error) {
            res.json({
                message: error.message
            })
        }
    }
}


const updateCategory = async (req, res) => {
    const { _id, CategoryName, CategoryImage } = req.body

    const filter = { _id }
    const update = { CategoryName, CategoryImage }

    try {
        await connect(process.env.MONGODB_URI)
        await Category.findOneAndUpdate(filter, update)
        res.json({
            message: "Category Updated Successfully"
        })

    }

    catch (error) {
        res.json({
            message: error.message
        })
    }

}

module.exports = { createCategory, getAllCategories, deleteCategory, updateCategory }