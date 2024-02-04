import axios from 'axios'
import { Account } from '../entities/account'
import { AccountType } from '../enums/account-type'
import { InsufficientFundsError } from '../errors/insufficient-funds'
import { UserIsShopkeeperError } from '../errors/user-is-shopkeeper'
import { ExternalAuthorizerError } from '../errors/external-authorizer'
import { ENV } from '../configs/env'
import { applicationLogger } from '../configs/application-logger'
import { sendMail } from './mail-service'

const isAbleToMakeTransaction = async (payer: Account, amount: number) => {
  if (payer.type == AccountType.SHOPKEEPER) throw new UserIsShopkeeperError()
  if (payer.balance < amount) throw new InsufficientFundsError()
  if (!(await getExternalAuthorizer())) throw new ExternalAuthorizerError()
}

const getExternalAuthorizer = async () => {
  const result = await axios.get(ENV.mocks.extenal_authorizer as string)
  return result.data.message == 'Autorizado'
}

const sendNotification = async () => {
  const result = await axios.get(ENV.mocks.send_notification as string)
  if (!result.data.message) {
    // send our notification
    // await sendMail()
    applicationLogger.info('Sended our notification')
  }
}

const doAccountsAlterations = (
  payer: Account,
  receiver: Account,
  amount: number,
) => {
  payer.balance -= amount
  receiver.balance += amount
}

export { sendNotification, isAbleToMakeTransaction, doAccountsAlterations }
