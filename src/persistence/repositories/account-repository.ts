import { Repository } from 'typeorm'
import { Account } from '../../entities/account'
import { mysql } from '../datasource'
import { Optional } from '../../utils/optional'
import { IAccountRepository } from './interfaces/account-repository-interface'

export class AccountRepository implements IAccountRepository {
  private rep: Repository<Account> = mysql.getRepository(Account)

  async findAll(): Promise<Account[]> {
    return await this.rep.find()
  }

  async findById(id: string): Promise<Optional<Account>> {
    return new Optional<Account>(await this.rep.findOne({ where: { id } }))
  }

  async findByEmail(email: string): Promise<Optional<Account>> {
    return new Optional<Account>(await this.rep.findOne({ where: { email } }))
  }

  async findByIdentification(
    identification: string,
  ): Promise<Optional<Account>> {
    return new Optional<Account>(
      await this.rep.findOne({ where: { identification } }),
    )
  }

  async findByIdentificationAndEmail(
    email: string,
    identification: string,
  ): Promise<Optional<Account>> {
    return new Optional<Account>(
      await this.rep.findOne({ where: { email, identification } }),
    )
  }

  async create(account: Account): Promise<Account> {
    return await this.rep.save(account)
  }
}
