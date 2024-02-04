import bcrypt from 'bcrypt'
import { ENV } from '../configs/env'

const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(ENV.password_salt_rounds)
  return bcrypt.hashSync(password, salt)
}

const comparePasswords = (plain: string, hash: string) => {
  return bcrypt.compareSync(plain, hash)
}

export { comparePasswords, hashPassword }
