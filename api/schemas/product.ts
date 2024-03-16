import Joi, { type ObjectSchema } from 'joi'
import type { Product } from '../types/product'

const id = Joi.string().uuid()
const name = Joi.string().max(100)
const price = Joi.number().min(10)
const image = Joi.string().uri()

const createProductSchema: ObjectSchema<Product> = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
})

const updateProductSchema: ObjectSchema<Product> = Joi.object({
  name,
  price,
  image,
})

const getProductSchema: ObjectSchema<Product> = Joi.object({
  id: id.required(),
})

export { createProductSchema, updateProductSchema, getProductSchema }
