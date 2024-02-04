export class EmailAlreadyExistsError extends Error {
  constructor() {
    super('Another user is using the provided e-mail')
  }
}
