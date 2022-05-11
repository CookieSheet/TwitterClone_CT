const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const port = 3000;
const { connectDB } = require('./src/db');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./src/graphql/schema');

dotenv.config()

// Connecting Database
connectDB()

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))


app.listen(port, ()=>{
    console.log(`hello World app listening at port:${port}`)
})
// Setting templates
app.set('view engine', 'ejs')

const user = {
    firstName: 'Michael',
    lastName: 'Cook'
}

// Creating routes
app.get('/', (req, res)=>{
    res.render('pages/index', {user:user})
})
app.get('/login', (req, res)=>{
    res.render('pages/login', {user:user})
})
app.get('/profile', (req, res)=>{
    res.render('pages/profile', {user:user})
})
app.get('/register', (req, res)=>{
    res.render('pages/register', {user:user})
})
app.get('/user', (req, res)=>{
    res.render('pages/user', {user:user})
})

// Using Middleware
app.use(( req,res,next ) =>{
    console.log("Timestamp:", Date())
    next()
})

//Accessing Static Files with Middleware
app.use(express.static(path.join(__dirname, 'public')))