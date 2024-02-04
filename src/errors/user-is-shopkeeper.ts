export class UserIsShopkeeperError extends Error {
  constructor() {
    super(
      'The payer is shopkeeper, and shopkeepers only can receive transactions.',
    )
  }
}
