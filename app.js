const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./src/db');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./src/graphql/schema');
const { authenticate } = require('./src/middleware/auth');
const path = require('path');
const cookieParser = require('cookie-parser');
const { userData } = require('./src/middleware/userData');

dotenv.config()

const app = express();

connectDB()

app.use(cookieParser())
app.use(authenticate)
app.use(userData)

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', (path.join(__dirname, '/src/templates/views')))

require('./src/routes')(app)

app.listen(process.env.PORT, ()=>{
    console.log(`Hello world app. listening at port ${process.env.PORT}`)
})