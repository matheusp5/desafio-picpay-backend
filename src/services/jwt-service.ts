import jwt from 'jsonwebtoken'
import { ENV } from '../configs/env'
import { InvalidJwtError } from '../errors/invalid-jwt'

const encodeToken = (data: any) => {
  return jwt.sign(data, ENV.jwt.secret_key as string, {
    expiresIn: ENV.jwt.expires_in as string,
  })
}

const verifyToken = (token: string) => {
  try {
    jwt.verify(token, ENV.jwt.secret_key as string)
    return true
  } catch (e: any) {
    return false
  }
}

const decodeToken = (token: string) => {
  var result: any = jwt.decode(token)
  if (!result) throw new InvalidJwtError()
  const id = result.id
  if (!id) throw new InvalidJwtError()
  return id
}

export { decodeToken, verifyToken, encodeToken }
