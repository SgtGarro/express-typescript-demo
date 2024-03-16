import express from 'express'
import type { Request } from 'express'
import type { Product } from '../types/product'
import ProductsService from '../services/products'

const router = express.Router()
const service = new ProductsService()

router.get('/', (req, res, next) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 10
    if (Number.isNaN(limit))
      return res.status(400).json({ message: 'Invalid limit' })

    const products = service.find().slice(0, limit)

    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/filter', (_, res) => {
  res.send("I'm a filter")
})

router.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params

    const product = service.findOne(id)

    res.status(200).json({ message: 'Product found', data: product })
  } catch (err) {
    next(err)
  }
})

router.post(
  '/',
  (req: Request<object, unknown, Omit<Product, 'id'>>, res, next) => {
    try {
      const { body } = req

      service.create(body)

      res.status(201).json({ message: 'Product created', data: body })
    } catch (err) {
      next(err)
    }
  },
)

router.patch(
  '/:id',
  (
    req: Request<{ id: string }, unknown, Omit<Partial<Product>, 'id'>>,
    res,
    next,
  ) => {
    try {
      const { id } = req.params
      const { body } = req

      const product = service.update(id, body)

      res.status(200).json({ message: `Product ${id} updated`, data: product })
    } catch (err) {
      next(err)
    }
  },
)

router.delete('/:id', (req, res, next) => {
  try {
    const { id } = req.params

    service.delete(id)

    res.status(200).json({ message: `Product ${id} deleted` })
  } catch (err) {
    next(err)
  }
})

export default router
