import { ENV } from '../configs/env'
import { GenerateUniqueId } from '../utils/generate-id'
import { Entity, Column, PrimaryColumn } from 'typeorm'
import { AccountType } from '../enums/account-type'
import { Transaction } from './transaction'

@Entity('accounts')
export class Account {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  identification: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  type: AccountType

  @Column()
  balance: number

  constructor(
    name: string,
    email: string,
    identification: string,
    password: string,
    type: AccountType,
    id?: string | null,
  ) {
    this.id = id || GenerateUniqueId(ENV.unique_id_length)
    this.name = name
    this.identification = identification
    this.email = email
    this.password = password
    this.type = type
    this.balance = 0
  }
}
