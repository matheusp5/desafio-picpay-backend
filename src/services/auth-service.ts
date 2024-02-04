import { Account } from '../entities/account'
import { UserNotFoundError } from '../errors/user-not-found'
import { AccountRepository } from '../persistence/repositories/account-repository'
import { comparePasswords } from './hash-service'
import { decodeToken, encodeToken } from './jwt-service'

const repository = new AccountRepository()

const login = async (email: string, password: string) => {
  let user = await repository.findByEmail(email)
  if (user.isEmpty()) throw new UserNotFoundError()
  if (comparePasswords(password, user.get()?.password as string)) {
    return encodeToken({ id: user.get()?.id })
  }
  throw new UserNotFoundError()
}

const decodeBearer = async (bearer: string) => {
  const accountRepository = new AccountRepository()
  const id = await decodeToken(bearer?.replace('Bearer ', '') as string)
  const account = await accountRepository.findById(id)
  if (account.isEmpty()) throw new UserNotFoundError()
  return account.get() as Account
}

export { login, decodeBearer }
