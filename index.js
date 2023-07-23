const express = require('express');
const MONGODB_URI = "mongodb+srv://ahmedshah:Ahmad123@ahmedshah.g8fpmgs.mongodb.net/";
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const Schema = mongoose.Schema

app.use(express.json());


mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
        useUnifiedTopology: true
});

// below stores the users credentials as Database do
// const users = [ 
//     {id:1, username: "user1", password: 'password1'},
//     {id:2, username: "user2", password: 'password2'},
// ];

// below is a register/Signup api which pushes the users to an array

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required:true
    }
})

const model = mongoose.model("User",userSchema)
app.post('/api/create', (req, res) => {
    const { email, password } = req.body;
    model.create({
        email,
        password
    })
    res.status(200).send(
        "Success"
)
})



app.post('/api/signup', (req, res) => {
    const { username, password, email } = req.body;

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(401).json({ error: "User Already Exists" });
    }
    const newUser = {
        id: users.length + 1,
        username,
        password,
        email
    };
    users.push(newUser);
    console.log(users);
    console.log(users.length);
    return res.json({ message: "SignUp Successful", users: newUser });
})



// below is a login api, whcih checks from the upper "users" array and login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid Credentials' });
    }

    return res.json({status:`Successfull Login ${users.id}`})
})

// below is the employee api which requests any name and give details
app.get('/api/employee', (req, res) => {
    const { name } = req.body;

if (!name) {
        return res.status(400).json({ error: 'Employee Name not given' });
    }

   return res.json({
        Emp_id:"1",
        salary: "100,000",
        name: "Ahmed",
        job: "Home",
        category: "Technical"
    })
})


app.get('/api', (req, res) => {
    // req.body.name
    res.send(
        "Hello Server is working!..."
    )
})


app.listen(port, () => {
    console.log(`Example App Listening on port ${port}`)
})