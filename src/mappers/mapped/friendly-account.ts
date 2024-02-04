import { AccountType } from '../../enums/account-type'

export type FriendlyAccount = {
  id: string
  name: string
  identification: string
  email: string
  type: AccountType
  balance: number
}
