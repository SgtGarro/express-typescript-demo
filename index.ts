import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello world from my!')
})

app.get('/products', (req, res) => {
  res.json([
    {
      name: 'Product 1',
      price: 1000,
    },
    {
      name: 'Product 2',
      price: 2000,
    },
  ])
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

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params

  res.status(200).json({
    categoryId,
    productId,
  })
})

app.listen(port, () => console.log('Server started on port', port))
