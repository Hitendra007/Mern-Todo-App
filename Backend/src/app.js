import express from "express"
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(cookieParser())
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.get('/', (req, res) => {
    res.send('Hi i am !!')
})
import UserRouter from './routes/user.routes.js'
app.use('/api/v1/users', UserRouter)

import TodoRouter from './routes/todo.routes.js'
app.use('/api/v1/todos', TodoRouter)
export { app }