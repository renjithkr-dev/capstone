import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy"
import winston, { transports } from "winston"
import { validationResponse } from "./models/responses"

export const logger=winston.createLogger(
  {
    level: process.env.LOGGER_LEVEL || 'silly',
    format: winston.format.json(),
    transports:[
        new transports.Console()
    ]
  }
)

export const validateUserPermissions=(event:APIGatewayProxyEvent,perms:string[]):validationResponse=>{
  const user_id=event.requestContext.authorizer?.principalId
  if(!user_id)
    return {status:'ERROR','type':''}
  logger.debug(user_id)
  const perm_string: string = event.requestContext.authorizer?.permissions
  logger.debug(perm_string)
  let found=0
  perms.forEach(element => {
    if (perm_string.indexOf(element)>=0) {
      found++
    }
  });
  logger.debug(`found : ${found}`)
  return found==perms.length?{status:'OK','type':'STAFF'}:{status:'OK','type':'USER'}
}