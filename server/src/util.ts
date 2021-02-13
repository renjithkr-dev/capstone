import winston, { transports } from "winston"

export const logger=winston.createLogger(
  {
    level: 'silly',
    format: winston.format.json(),
    transports:[
        new transports.Console()
    ]
  }
)