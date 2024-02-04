export class InsufficientFundsError extends Error {
  constructor() {
    super("The payer doesn't have funds to make this transaction.")
  }
}
