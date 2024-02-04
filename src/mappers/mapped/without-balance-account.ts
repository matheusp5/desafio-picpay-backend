import { AccountType } from '../../enums/account-type'

export type WithoutBalanceAccount = {
  id: string
  name: string
  identification: string
  email: string
  type: AccountType
}
