import { Product } from '../types/product'
import { fakerES_MX as faker } from '@faker-js/faker'

class ProductsService {
  products: Product[]

  constructor() {
    this.products = Array.from<unknown, Product>({ length: 100 }, () => ({
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

    return this.products.find((product) => product.id === id)
  }

  create() {}

  update() {}

  delete() {}
}

export default ProductsService
