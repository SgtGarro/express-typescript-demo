import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  const { limit, offset } = req.query

  if (!limit || !offset) return res.json({ message: 'Invalid query' })

  res.json({
    limit,
    offset,
  })
})

export default router
