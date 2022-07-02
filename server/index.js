import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fileUpload from "express-fileupload"

import sequelize from "./config/sequelizedb.js"

import LoginRoutes from "./routes/LoginRoutes.js"
import PostRoutes from "./routes/PostRoutes.js"
import UserRoutes from "./routes/UserRoutes.js"

import errorMiddleware from "./middlewares/errorMiddleware.js";

const PORT = process.env.PORT || 5001

const app = express()

app.use(express.json())
app.use(express.static('static'))
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({}))

app.use('/api', LoginRoutes)
app.use('/api', PostRoutes)
app.use('/api', UserRoutes)

// Этот мидлвейр должен объявляться последним
app.use(errorMiddleware)

async function startApp() {
    try {
        await sequelize.authenticate();
        app.listen(PORT, () => console.log('Server started on port', PORT))
    } catch(err) {
        console.error('Unable to connect to the database:', err);
    }
}

startApp()