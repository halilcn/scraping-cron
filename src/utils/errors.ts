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

export class DatabaseSaveError extends Error {
  constructor(message = '') {
    super(`Database Save Error:${message}`)
  }
}
