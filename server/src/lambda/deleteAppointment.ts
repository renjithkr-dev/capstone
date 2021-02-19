import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda"

import {logger, validateUserPermissions} from "../util"
import {AppointmentFactory} from "../dataaccess/provider"

const apptsController=new AppointmentFactory()

export const handler:APIGatewayProxyHandler=async (event:APIGatewayProxyEvent):Promise<APIGatewayProxyResult>=>{
  if (!(validateUserPermissions(event,["delete:user-appointments"]).status=="OK")) {
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
    const apptId=event.pathParameters?.appointmentId
    const userId=event.requestContext.authorizer?.principalId
    try{
      var resp=await apptsController.deleteAppointment(apptId||"",userId)
      logger.debug(resp)
    }
    catch(e){
      return (
        {
            statusCode: 400,
              headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                'Access-Control-Allow-Credentials': true
              },
              body:JSON.stringify(e)
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
              body:JSON.stringify(resp)
        }
    )
}