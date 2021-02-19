import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda"

import { logger, validateUserPermissions } from "../util"
import { AppointmentFactory } from "../dataaccess/provider"

const apptsController = new AppointmentFactory()

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const aptDate = event.pathParameters?.apptDate
  logger.info(event.requestContext.authorizer?.principalId)
  logger.info(event.requestContext.authorizer)
  logger.debug(`Retrieving data for user for date ${aptDate}`)

  
  if (!(validateUserPermissions(event,["read:user-appointments"]).status==="OK")) {
    return (
      {
        statusCode: 401,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({ message: "User not authorized" })
      })
  }
  try {
    var appts = await apptsController.getUserAppointments(event.requestContext.authorizer?.principalId, aptDate || "")
  }
  catch (e) {
    return (
      {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(e)
      }
    )
  }
  return (
    {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(appts)
    }
  )
}