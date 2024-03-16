import type { RequestHandler } from 'express'
import type { ObjectSchema } from 'joi'
import boom from '@hapi/boom'

function validateHandler(
  schema: ObjectSchema,
  property: 'body' | 'params' | 'query',
): RequestHandler {
  return (req, _, next) => {
    const data = req[property]

    const { error } = schema.validate(data, { abortEarly: false })

    if (error) next(boom.badGateway(error.message))
    next()
  }
}

export default validateHandler
