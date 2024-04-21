import express from 'express'
import cors from "cors"
import router from '#routes/api/users.js'
import logger from 'morgan'
import { JWTStrategy } from './config/config-passport.js'

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

JWTStrategy()

app.use('/users', router)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

export default app
