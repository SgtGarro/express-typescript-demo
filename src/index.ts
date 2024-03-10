import express from 'express'
import routerApi from './routes'

const app = express()
const port = 3000

routerApi(app)

app.listen(port, () => console.log('Server started on port', port))
