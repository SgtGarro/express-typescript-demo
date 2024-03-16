import { Product } from '../types/product'
import { fakerES_MX as faker } from '@faker-js/faker'

class ProductsService {
  products: Product[]

  constructor() {
    this.products = Array.from<unknown, Product>({ length: 5 }, () => ({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      image: faker.image.url(),
    }))
  }

  find() {
    return this.products
  }

  findOne(id: string) {
    const product = this.products.find((product) => product.id === id)

    if (!product) throw new Error('Product not found')

    return product
  }

  create(data: Omit<Product, 'id'>) {
    const product: Product = { id: faker.string.uuid(), ...data }

    this.products.push(product)
  }

  update(id: string, data: Omit<Partial<Product>, 'id'>) {
    const index = this.products.findIndex((product) => product.id === id)

    if (index === -1) throw new Error('Product not found')

    const product = this.products[index]
    this.products[index] = { ...product, ...data }

    return this.products[index]
  }

  delete(id: string) {
    const index = this.products.findIndex((product) => product.id === id)

    if (index === -1) throw new Error('Product not found')

    this.products.splice(index, 1)
  }
}

export default ProductsService
