import morgan from 'morgan'
import { app } from '../http/application'
import { ENV } from './env'
import chalk from 'chalk'
import { formatDate } from '../utils/date-format'

const enableMorgan = () => {
  if (ENV.logger.http) {
    const date = formatDate(new Date())
    app.use(
      morgan(chalk.magenta(`Http - :method :url :status - :response-time ms`)),
    )
  }
}

export { enableMorgan }
