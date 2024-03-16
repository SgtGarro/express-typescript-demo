import type { Boom } from '@hapi/boom'
import { ErrorRequestHandler } from 'express'

const logErrors: ErrorRequestHandler = (err, _req, _res, next) => {
  console.error(err)

  next(err)
}

const boomErrorHandler: ErrorRequestHandler = (err: Boom, _req, res, next) => {
  if (err.isBoom) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  } else next(err)
}

// eslint-disable-next-line no-unused-vars
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  res.status(500).json({ message: err.message, stack: err.stack })
}

export { logErrors, boomErrorHandler, errorHandler }
