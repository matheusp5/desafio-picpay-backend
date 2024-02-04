export class ExternalAuthorizerError extends Error {
  constructor() {
    super(
      "The external authorizer doesn't approved the completion of the transaction",
    )
  }
}
