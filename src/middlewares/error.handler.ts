import { ErrorRequestHandler } from 'express'

const logErrors: ErrorRequestHandler = (err, _req, _res, next) => {
  console.error(err)
  next(err)
}

// eslint-disable-next-line no-unused-vars
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  res.status(500).json({ message: err.message, stack: err.stack })
}

export { logErrors, errorHandler }
