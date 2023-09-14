const nodemailer = require("nodemailer");
var Mailgen = require('mailgen');
const Orders = require('./schema');
const { connect } = require("mongoose");




const placeOrder = async (req, res) => {
    const { customerName, customerEmail, customerId, customerContact, customerAddress, order, orderStatus } = req.body

    const config = {
        service: 'gmail',
        auth: {
            user: 'shahkhanahmed401@gmail.com',
            pass: 'jlamplylnqzhoxez'
        }
    }

    const transporter = nodemailer.createTransport(config);


    var mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Mailgen',
            link: 'https://mailgen.js/'
        }
    });


    try {
        await connect(process.env.MONGODB_URI)
        const orders = await Orders.create({ customerName, customerEmail, customerId, customerContact, customerAddress, order, orderStatus })

        await transporter.sendMail({
            from: "shahkhanahmed401@gmail.com",
            to: customerEmail,
            subject: "Place Order",
            html: mailGenerator.generate({
                body: {
                    name: customerName,
                    intro: `Thanks for choosing us, Your Placed order will be delivered to you as soon as possible, Current Your Order Status is ${orderStatus}`,
                    table: {
                        data: [
                            {
                                customerName,
                                customerEmail,
                                customerAddress,
                                "OrderStatus": orderStatus,
                                customerContact,
                                tracking_id: orders._id
                            }
                        ]
                    },
                    outro: `Your Order will be delived at ${customerAddress}, please ensure to active your contact number ${customerContact}`
                }
            })
        })

        res.json({
            message: "Order Placed Successfully , Please Check your MailBox"
        })

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

}


const getallOrders = async (req, res) => {
    try {
        await connect(process.env.MONGODB_URI)
        const orders = await Orders.find()
        res.json({ orders })
    }

    catch (error) {
        res.json(500).json({ message: error.message })
    }

}

const trackOrder = async (req, res) => {
    const { _id } = req.params

    try {
        await connect(process.env.MONGODB_URI)
        const order = await Orders.findOne({ _id })
        res.json({ order })
    }

    catch (error) {
        res.status(500).json({ message: error.message })
    }
}


const deleteorder = async (req, res) => {
    const { _id } = req.body;
    if (!_id) {
        res.status(403).json({ message: "OrderID is required" })
    }
    else {
        await connect(process.env.MONGODB_URI);
        await Orders.deleteOne({ _id })
        const orders = await Orders.find();
        res.json({ message: "Deleted Successfully", orders })
    }
}
const updatestatus = async (req, res) => {
    const { _id, orderStatus } = req.body;

    try {
        await connect(process.env.MONGODB_URI);
        await Orders.updateOne({ _id: _id }, { $set: { orderStatus: orderStatus } });
        const orders = await Orders.find();

        res.json({ message: "Updated Successfully", order: orders });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


module.exports = { placeOrder, getallOrders, trackOrder, deleteorder, updatestatus }