import type { Express } from 'express'
import productsRouter from './products'
import usersRouter from './users'
import categoriesRouter from './categories'

export default function routerApi(app: Express) {
  app.use('/products', productsRouter)
  app.use('/users', usersRouter)
  app.use('/categories', categoriesRouter)
}
