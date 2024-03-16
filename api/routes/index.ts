import express from 'express'
import type { Express } from 'express'
import productsRouter from './products'
import usersRouter from './users'
import categoriesRouter from './categories'

export default function routerApi(app: Express) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/products', productsRouter)
  router.use('/users', usersRouter)
  router.use('/categories', categoriesRouter)
}
