export class TooManyRequestError extends Error {
  constructor(message = 'Too Many Request Error') {
    super(message)
  }
}

export class UnknownError extends Error {
  constructor(message = '') {
    super(`Unknown Error:${message}`)
  }
}
