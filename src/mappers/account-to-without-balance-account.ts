import { Account } from '../entities/account'
import { WithoutBalanceAccount } from './mapped/without-balance-account'

const mapAccountToWithoutBalanceAccount = (
  account: Account,
): WithoutBalanceAccount => {
  return {
    id: account.id,
    email: account.email,
    identification: account.identification,
    name: account.name,
    type: account.type,
  }
}

const mapAccountsToWithoutBalanceAccounts = (
  accounts: Account[],
): WithoutBalanceAccount[] => {
  return accounts.map(mapAccountToWithoutBalanceAccount)
}

export {
  mapAccountToWithoutBalanceAccount,
  mapAccountsToWithoutBalanceAccounts,
}
