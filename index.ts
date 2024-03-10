import express from 'express'
import { fakerES_MX as faker } from '@faker-js/faker'

interface Product {
  name: string
  price: number
  image: string
}

const app = express()
const port = 3000

app.get('/', (_, res) => {
  res.send('Hello world from my peru!')
})

app.get('/products', (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 10

  if (Number.isNaN(limit))
    return res.status(400).json({ message: 'Invalid limit' })

  const products: Product[] = Array.from<unknown, Product>(
    { length: limit },
    () => ({
      name: faker.commerce.productName(),
      price: +faker.commerce.price(),
      image: faker.image.url(),
    }),
  )

  res.json(products)
})

app.get('/products/filter', (_, res) => {
  res.send("I'm a filter")
})

app.get('/products/:id', (req, res) => {
  const { id } = req.params
  const idNumber = Number(id)

  if (Number.isNaN(idNumber))
    return res.status(400).json({ message: 'Invalid id' })

  res.status(200).json({
    id,
    name: `Product ${id}`,
    price: 1000 * Number(id),
  })
})

app.get('/users', (req, res) => {
  const { limit, offset } = req.query

  if (!limit || !offset) return res.json({ message: 'Invalid query' })

  res.json({
    limit,
    offset,
  })
})

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params

  res.status(200).json({
    categoryId,
    productId,
  })
})

app.listen(port, () => console.log('Server started on port', port))
