import { Request, Response } from 'express'
import { decodeBearer, login } from '../../services/auth-service'
import { UserNotFoundError } from '../../errors/user-not-found'
import { StatusCode } from '../../enums/status-code'
import { EmailAlreadyExistsError } from '../../errors/email-already-exists'
import { registerUser } from '../../services/register-service'
import { AccountType } from '../../enums/account-type'
import { InvalidJwtError } from '../../errors/invalid-jwt'
import { mapAccountToFriendlyAccount } from '../../mappers/account-to-friendly-account'
import { hashPassword } from '../../services/hash-service'

export class AuthController {
  async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body
      const token = await login(email, password)
      return response.status(StatusCode.SUCCESS).json({
        status: StatusCode.SUCCESS,
        token,
      })
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        return response.status(StatusCode.NOT_FOUND).json({
          status: StatusCode.NOT_FOUND,
          token: null,
        })
      } else {
        return response.status(StatusCode.INTERNAL_ERROR).json({
          status: StatusCode.INTERNAL_ERROR,
          token: null,
        })
      }
    }
  }

  async register(request: Request, response: Response) {
    try {
      const {
        name,
        identification,
        email,
        password,
        type,
      }: {
        name: string
        identification: string
        email: string
        password: string
        type: string
      } = request.body
      const content = await registerUser(
        name,
        identification,
        email,
        hashPassword(password),
        type == 'user' ? AccountType.USER : AccountType.SHOPKEEPER,
      )
      return response.status(StatusCode.CREATED).json({
        status: StatusCode.CREATED,
        content: mapAccountToFriendlyAccount(content),
      })
    } catch (e) {
      if (e instanceof EmailAlreadyExistsError) {
        return response.status(StatusCode.BAD_REQUEST).json({
          status: StatusCode.BAD_REQUEST,
          content: 'email_or_identification_already_exists',
        })
      } else {
        return response.status(StatusCode.INTERNAL_ERROR).json({
          status: StatusCode.INTERNAL_ERROR,
          content: null,
        })
      }
    }
  }

  async decode(request: Request, response: Response) {
    try {
      const bearer = request.headers.authorization
      const user = await decodeBearer(bearer?.replace('Bearer ', '') as string)
      return response.status(StatusCode.SUCCESS).json({
        status: StatusCode.SUCCESS,
        user: mapAccountToFriendlyAccount(user),
      })
    } catch (e: any) {
      if (e instanceof InvalidJwtError || e instanceof UserNotFoundError) {
        return response.status(StatusCode.BAD_REQUEST).json({
          status: StatusCode.BAD_REQUEST,
          user: 'invalid_jwt',
        })
      } else {
        return response.status(StatusCode.INTERNAL_ERROR).json({
          status: StatusCode.INTERNAL_ERROR,
          user: null,
        })
      }
    }
  }
}
