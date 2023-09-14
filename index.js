const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors')
const LoginSignUp = require('./UsersAPI/Login_SignUp')
const Categories = require('./CategoriesAPI/categoryRoutes')
const Products = require('./ProductsAPI/productRoutes')
const Brands = require('./BrandsAPI/brandRoutes')
const Orders = require('./OrdersAPI/orderRoutes')
const path = require('path')
const port = process.env.SERVER_PORT || 3456


const clientpath = path.join(__dirname, './client/dist')

app.use(cors())
app.use('/', express.static(clientpath))

app.use(express.json())
// ------------------ROUTES--------------------
app.use('/api', LoginSignUp);
app.use('/api', Categories);
app.use('/api', Products);
app.use('/api', Brands);
app.use('/api', Orders);




app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/dist/index.html'))
})




app.listen(port, () => {
    console.log(`APP LISTENING http://localhost:${port}`)
})