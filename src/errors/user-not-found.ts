export class UserNotFoundError extends Error {
  constructor() {
    super("There aren't any user with this credentials.")
  }
}
