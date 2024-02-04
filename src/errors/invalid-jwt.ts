export class InvalidJwtError extends Error {
  constructor() {
    super('The token provided is an invalid token')
  }
}
