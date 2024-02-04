import { ENV } from '../configs/env'
import { GenerateUniqueId } from '../utils/generate-id'
import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm'
import { Account } from './account'

@Entity('transactions')
export class Transaction {
  @PrimaryColumn()
  id: string

  @ManyToOne(() => Account)
  payer: Account

  @ManyToOne(() => Account)
  receiver: Account

  @Column()
  value: number

  @Column()
  created_at: Date

  constructor(
    payer: Account,
    receiver: Account,
    value: number,
    id?: string | null,
  ) {
    this.id = id || GenerateUniqueId(ENV.unique_id_length)
    this.payer = payer
    this.receiver = receiver
    this.value = value
    this.created_at = new Date()
  }
}
