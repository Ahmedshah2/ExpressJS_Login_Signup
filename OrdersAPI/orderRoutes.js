const app = require('express')
const router = app.Router()
const { placeOrder, getallOrders, trackOrder, deleteorder, updatestatus } = require('./controller')

router.post('/placeorder', placeOrder)
router.get('/getallorders', getallOrders)
router.get('/trackorder/:_id', trackOrder)
router.delete('/deleteorder', deleteorder)
router.put('/updatestatus', updatestatus)


module.exports = router