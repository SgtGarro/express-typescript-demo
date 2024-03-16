import express from 'express'
import routerApi from './routes'
import { logErrors, errorHandler } from './middlewares/error.handler'

const app = express()
const port = 3000

app.use(express.json())

routerApi(app)

app.use(logErrors, errorHandler)

app.listen(port, () => console.log('Server started on port', port))
