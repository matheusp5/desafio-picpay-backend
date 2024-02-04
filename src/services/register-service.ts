import { Account } from '../entities/account'
import { AccountType } from '../enums/account-type'
import { EmailAlreadyExistsError } from '../errors/email-already-exists'
import { AccountRepository } from '../persistence/repositories/account-repository'

const respository = new AccountRepository()

const registerUser = async (
  name: string,
  identification: string,
  email: string,
  password: string,
  type: AccountType,
) => {
  if (!(await alreadyExists(email, identification))) {
    const account = respository.create(
      new Account(name, email, identification, password, type),
    )
    return account
  }
  throw new EmailAlreadyExistsError()
}

const alreadyExists = async (email: string, identification: string) => {
  return (
    await respository.findByIdentificationAndEmail(email, identification)
  ).isPresent()
}

export { registerUser }
