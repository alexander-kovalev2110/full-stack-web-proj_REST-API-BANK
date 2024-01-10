import express from 'express'
import mongoose from 'mongoose'
import router from './src/Router.js'

const PORT = 5000
const DB_URL = `mongodb+srv://user:user@cluster0.2tb57jn.mongodb.net/?retryWrites=true&w=majority`

const app = express()

app.use(express.json())
app.use('/', router)

async function startApp() {
    try {
        await mongoose.connect(DB_URL )         // Database connection
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT: ' + PORT))    // Start the server on PORT
    } catch (e) {
        console.log(e)
    }
}

startApp()
