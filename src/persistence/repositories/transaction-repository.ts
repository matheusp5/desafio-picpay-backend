import { Repository } from 'typeorm'
import { Transaction } from '../../entities/transaction'
import { mysql } from '../datasource'
import { Optional } from '../../utils/optional'
import { Account } from '../../entities/account'
import { ITransactionRepository } from './interfaces/transaction-repository-interface'

export class TransactionRepository implements ITransactionRepository {
  private rep: Repository<Transaction> = mysql.getRepository(Transaction)

  async findAll(): Promise<Transaction[]> {
    return await this.rep.find({
      relations: {
        payer: true,
        receiver: true,
      },
    })
  }

  async findById(id: string): Promise<Optional<Transaction>> {
    return new Optional<Transaction>(await this.rep.findOne({ where: { id } }))
  }

  async findByPayer(payer: Account): Promise<Transaction[]> {
    return await this.rep.find({ where: { payer } })
  }

  async findByReceiver(receiver: Account): Promise<Optional<Transaction>> {
    return new Optional<Transaction>(
      await this.rep.findOne({ where: { receiver } }),
    )
  }

  async findByReceiverAndPayer(
    receiver: Account,
    payer: Account,
  ): Promise<Optional<Transaction>> {
    return new Optional<Transaction>(
      await this.rep.findOne({ where: { receiver, payer } }),
    )
  }

  async create(Transaction: Transaction): Promise<Transaction> {
    return await this.rep.save(Transaction)
  }
}
