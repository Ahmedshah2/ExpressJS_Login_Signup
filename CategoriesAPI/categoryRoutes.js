const app = require('express')
const router = app.Router()
const { createCategory, getAllCategories, deleteCategory, updateCategory } = require('./controller')

router.post('/createcategory', createCategory)
router.get('/getallcategories', getAllCategories)
router.delete('/deletecategory', deleteCategory) //query
router.put('/updatecategory', updateCategory)

module.exports = router