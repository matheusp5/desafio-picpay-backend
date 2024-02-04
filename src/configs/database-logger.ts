import { formatDate } from '../utils/date-format'
import chalk from 'chalk'

let enabled: boolean = false

const enableDatabaseLogger = () => (enabled = true)

const databaseLogger = {
  info: (mes: string) => {
    if (enabled) {
      console.log(
        `${chalk.green('Database')} - ${chalk.gray(formatDate(new Date()))} - [${chalk.green('INFO')}]: ${chalk.gray(mes)}`,
      )
    }
  },
  error: (mes: string) => {
    if (enabled) {
      console.log(
        `${chalk.green('Database')} - ${chalk.gray(formatDate(new Date()))} - [${chalk.red('ERROR')}]: ${chalk.gray(mes)}`,
      )
    }
  },
}

export { enableDatabaseLogger, databaseLogger }
