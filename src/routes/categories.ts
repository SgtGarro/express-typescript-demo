import express from 'express'

const router = express.Router()

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params

  res.status(200).json({
    categoryId,
    productId,
  })
})

export default router
