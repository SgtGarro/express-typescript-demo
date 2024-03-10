import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello world from my!')
})

app.get('/new-route', (req, res) => {
  res.send('Hello world from new route!')
})

app.get('/products', (req, res) => {
  res.json({ name: 'Marcelo' })
})

app.listen(port, () => console.log('Server started on port', port))
