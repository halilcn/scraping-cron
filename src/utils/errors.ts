export class TooManyRequestError extends Error {
  constructor(message = 'Too Many Request Error') {
    super(message)
  }
}

export class UnknownError extends Error {
  constructor(message = 'Unknown Error') {
    super(message)
  }
}
