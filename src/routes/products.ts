import express from 'express'
import type { Request } from 'express'
import type { Product } from '../types/product'
import ProductsService from '../services/products'

const router = express.Router()
const service = new ProductsService()

router.get('/', (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 10
  if (Number.isNaN(limit))
    return res.status(400).json({ message: 'Invalid limit' })

  const products = service.find().slice(0, limit)

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

  res.status(200).json({ message: `Product ${id} updated`, id, data: body })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  res.status(200).json({ message: `Product ${id} deleted` })
})

export default router
