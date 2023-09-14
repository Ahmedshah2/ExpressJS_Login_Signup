const app = require('express')
const router = app.Router()

const { createBrand, deleteBrand, getAllBrands } = require('./controller')

router.post('/createbrand', createBrand)
router.delete('/deletebrand', deleteBrand)
router.get('/getallbrands', getAllBrands)

module.exports = router