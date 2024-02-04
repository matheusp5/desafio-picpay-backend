import { databaseConfiguration } from '../configs/database'
import { DataSource } from 'typeorm'

const mysql = new DataSource(databaseConfiguration)
export { mysql }
