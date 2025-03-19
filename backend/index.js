import express from 'express'
import userRouter from './routes/user.router.js'
import boardRouter from './routes/board.router.js'
import pinRouter from './routes/pin.router.js'
import commentRouter from './routes/comment.route.js'
import connectDB from './utils/connectDB.js'
import cors from 'cors'

const app = express()
app.use(express.json())

app.use(cors({origin: process.env.CORS_ORIGIN}))


app.use('/api/users', userRouter)
app.use('/api/boards', boardRouter)
app.use('/api/pins', pinRouter)
app.use('/api/comments', commentRouter)


app.listen(3000, () => {
    connectDB()
    console.log('Server is running on http://localhost:3000')
})