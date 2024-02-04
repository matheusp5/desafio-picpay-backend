import { Account } from '../entities/account'
import { Transaction } from '../entities/transaction'
import { ENV } from './env'
import { DataSourceOptions } from 'typeorm'

const databaseConfiguration: DataSourceOptions = {
  type: ENV.database.type as 'mysql',
  host: ENV.database.host,
  port: ENV.database.port,
  username: ENV.database.user,
  password: ENV.database.password,
  database: ENV.database.database,
  entities: [Account, Transaction],
  synchronize: true,
}
export { databaseConfiguration }
