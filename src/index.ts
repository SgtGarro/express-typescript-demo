import express from 'express'
import routerApi from './routes'
import cors, { type CorsOptions } from 'cors'

import {
  logErrors,
  boomErrorHandler,
  errorHandler,
} from './middlewares/error.handler'

const app = express()
const port = 3000

const whitelist = ['http://localhost:5500', 'https://myapp.test.com']
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}
app.use(express.json())
app.use(cors(corsOptions))

routerApi(app)

app.use(logErrors, boomErrorHandler, errorHandler)

app.listen(port, () => console.log('Server started on port', port))
