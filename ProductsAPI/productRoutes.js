const app = require('express')
const router = app.Router()
const { getProducts, createProduct,deleteProduct, ProductbyCategory, ProductbyId } = require('./controller')

router.get('/getallproducts', getProducts)
router.post('/createproduct', createProduct)
router.delete('/deleteproduct', deleteProduct)
router.get('/getproductbycategory/:category', ProductbyCategory)
router.get('/getproductbyid', ProductbyId)
module.exports = router