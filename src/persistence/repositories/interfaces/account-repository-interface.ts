import { Account } from '../../../entities/account'
import { Optional } from '../../../utils/optional'

export interface IAccountRepository {
  findAll(): Promise<Account[]>
  findById(id: string): Promise<Optional<Account>>
  findByEmail(email: string): Promise<Optional<Account>>
  findByIdentification(identification: string): Promise<Optional<Account>>
  findByIdentificationAndEmail(
    email: string,
    identification: string,
  ): Promise<Optional<Account>>
  create(account: Account): Promise<Account>
}
