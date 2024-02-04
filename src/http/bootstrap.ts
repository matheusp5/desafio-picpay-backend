import { applicationLogger } from '../configs/application-logger'
import { databaseLogger } from '../configs/database-logger'
import { ENV } from '../configs/env'
import { mysql } from '../persistence/datasource'
import { app } from './application'

const port = ENV.web.port

app.listen(port, () => {
  applicationLogger.info('Web server started with success on *:' + port)
  mysql.initialize().then(() => {
    databaseLogger.info('Database initialized')
  })
})
