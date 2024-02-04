import { Account } from '../entities/account'
import { FriendlyAccount } from './mapped/friendly-account'

const mapAccountToFriendlyAccount = (account: Account): FriendlyAccount => {
  return {
    id: account.id,
    email: account.email,
    identification: account.identification,
    name: account.name,
    balance: account.balance,
    type: account.type,
  }
}

const mapAccountsToFriendlyAccounts = (
  accounts: Account[],
): FriendlyAccount[] => {
  return accounts.map(mapAccountToFriendlyAccount)
}

export { mapAccountToFriendlyAccount, mapAccountsToFriendlyAccounts }
