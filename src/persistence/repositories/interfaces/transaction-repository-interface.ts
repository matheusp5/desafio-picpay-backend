import { Transaction } from '../../../entities/transaction'
import { Optional } from '../../../utils/optional'
import { Account } from '../../../entities/account'

export interface ITransactionRepository {
  findAll(): Promise<Transaction[]>
  findById(id: string): Promise<Optional<Transaction>>
  findByPayer(payer: Account): Promise<Transaction[]>
  findByReceiver(receiver: Account): Promise<Optional<Transaction>>
  findByReceiverAndPayer(
    receiver: Account,
    payer: Account,
  ): Promise<Optional<Transaction>>
  create(Transaction: Transaction): Promise<Transaction>
}
