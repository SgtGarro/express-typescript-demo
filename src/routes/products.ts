import express from 'express'
import { fakerES_MX as faker } from '@faker-js/faker'
import type { Request } from 'express'
import type { Product } from '@type/product'

const router = express.Router()

router.get('/', (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 10

  if (Number.isNaN(limit))
    return res.status(400).json({ message: 'Invalid limit' })

  const products: Product[] = Array.from<unknown, Product>(
    { length: limit },
    () => ({
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      image: faker.image.url(),
    }),
  )

  res.json(products)
})

router.get('/filter', (_, res) => {
  res.send("I'm a filter")
})

router.get('/:id', (req, res) => {
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

router.post('/', (req: Request<object, unknown, Product>, res) => {
  const { name, price, image } = req.body

  if (!name || !price || !image)
    return res.status(400).json({ message: 'Invalid data' })

  res.status(200).json({ message: 'Product created', data: req.body })
})

router.patch('/:id', (req: Request<{ id: string }, unknown, Product>, res) => {
  const { id } = req.params
  const body = req.body

  res.json({ message: `Product ${id} updated`, id, data: body })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  res.json({ message: `Product ${id} deleted` })
})

export default router
