import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import errorMiddleware from './middleware/error.js'

export const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit : '30mb' , extended : true})) // works same as body parser
app.use(express.urlencoded({limit: '30mb' , extended: true}))
app.use(cookieParser())


//Routing
import userRouter from './routes/userRoutes.js'
import roleRouter from "./routes/roleRoutes.js"

app.use('/api' , userRouter)
app.use('/api' , roleRouter)

//Middleware for error
app.use(errorMiddleware)
