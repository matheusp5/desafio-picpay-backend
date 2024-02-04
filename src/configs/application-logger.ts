import { formatDate } from '../utils/date-format'
import chalk from 'chalk'

let enabled: boolean = false

const enableApplicationLogger = () => (enabled = true)

const applicationLogger = {
  info: (mes: string) => {
    if (enabled) {
      console.log(
        `${chalk.blue('Application')} - ${chalk.gray(formatDate(new Date()))} - [${chalk.blue('INFO')}]: ${chalk.gray(mes)}`,
      )
    }
  },
  error: (mes: string) => {
    if (enabled) {
      console.log(
        `${chalk.blue('Application')} - ${chalk.gray(formatDate(new Date()))} - [${chalk.red('ERROR')}]: ${chalk.gray(mes)}`,
      )
    }
  },
}

export { enableApplicationLogger, applicationLogger }
