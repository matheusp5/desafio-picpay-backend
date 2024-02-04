import { Request, Response } from 'express'
import { AccountRepository } from '../../persistence/repositories/account-repository'
import { UserNotFoundError } from '../../errors/user-not-found'
import { InvalidJwtError } from '../../errors/invalid-jwt'
import { StatusCode } from '../../enums/status-code'
import { TransactionRepository } from '../../persistence/repositories/transaction-repository'
import {
  doAccountsAlterations,
  isAbleToMakeTransaction,
  sendNotification,
} from '../../services/transaction-service'
import { Account } from '../../entities/account'
import { ExternalAuthorizerError } from '../../errors/external-authorizer'
import { InsufficientFundsError } from '../../errors/insufficient-funds'
import { UserIsShopkeeperError } from '../../errors/user-is-shopkeeper'
import { Transaction } from '../../entities/transaction'
import { decodeBearer } from '../../services/auth-service'
import { mapAccountToWithoutBalanceAccount } from '../../mappers/account-to-without-balance-account'

export class TransactionController {
  async create(request: Request, response: Response) {
    try {
      const accountRepository = new AccountRepository()
      const transactionRepository = new TransactionRepository()

      const bearer = request.headers.authorization
      const payer = await decodeBearer(bearer?.replace('Bearer ', '') as string)

      const {
        receiver: receiverIdentification,
        amount,
      }: { receiver: string; amount: number } = request.body

      const receiver = await accountRepository.findByIdentification(
        receiverIdentification,
      )
      if (receiver.isEmpty()) throw new UserNotFoundError()

      await isAbleToMakeTransaction(payer, amount)

      const transaction: any = await transactionRepository.create(
        new Transaction(payer, receiver.get() as Account, amount),
      )

      await doAccountsAlterations(payer, receiver.get() as Account, amount)
      await accountRepository.create(payer)
      await accountRepository.create(receiver.get() as Account)

      await sendNotification()

      transaction.receiver.balance = 0

      return response.status(StatusCode.CREATED).json({
        status: StatusCode.CREATED,
        content: transaction,
      })
    } catch (e: any) {
      if (e instanceof InvalidJwtError) {
        return response.status(StatusCode.BAD_REQUEST).json({
          status: StatusCode.BAD_REQUEST,
          content: 'invalid_jwt',
        })
      } else if (e instanceof UserNotFoundError) {
        return response.status(StatusCode.NOT_FOUND).json({
          status: StatusCode.NOT_FOUND,
          content: 'receiver_not_found',
        })
      } else if (e instanceof ExternalAuthorizerError) {
        return response.status(StatusCode.UNAUTHORIZED).json({
          status: StatusCode.UNAUTHORIZED,
          content: 'external_authorizer_error',
        })
      } else if (e instanceof InsufficientFundsError) {
        return response.status(StatusCode.BAD_REQUEST).json({
          status: StatusCode.BAD_REQUEST,
          content: 'insufficient_funds',
        })
      } else if (e instanceof UserIsShopkeeperError) {
        return response.status(StatusCode.BAD_REQUEST).json({
          status: StatusCode.BAD_REQUEST,
          content: 'payer_is_shopkeeper',
        })
      } else {
        console.log(e.message)
        return response.status(StatusCode.INTERNAL_ERROR).json({
          status: StatusCode.INTERNAL_ERROR,
          content: null,
        })
      }
    }
  }

  async find(request: Request, response: Response) {
    try {
      const transactionRepository = new TransactionRepository()

      const bearer = request.headers.authorization
      const account = await decodeBearer(
        bearer?.replace('Bearer ', '') as string,
      )

      return response
        .status(StatusCode.SUCCESS)
        .json(await transactionRepository.findByPayer(account))
    } catch (e: any) {
      if (e instanceof UserNotFoundError || e instanceof InvalidJwtError) {
        return response.status(StatusCode.BAD_REQUEST).json({
          status: StatusCode.BAD_REQUEST,
          content: 'invalid_jwt',
        })
      }
    }
  }
}
