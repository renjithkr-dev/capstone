import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import {AppointmentFactory} from "../dataaccess/provider"
import {logger, validateUserPermissions} from "../util"

const apptsController=new AppointmentFactory()

export const handler:APIGatewayProxyHandler=async (event:APIGatewayProxyEvent):Promise<APIGatewayProxyResult>=>{
  if (!(validateUserPermissions(event,["create:user-appointments"]).status=="OK")) {
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
    const iData:any=JSON.parse(event.body||"")
    logger.debug(event.body)
    try{
      var appt= await apptsController.createAppointment(iData,event.requestContext.authorizer?.principalId)
    }catch(e){
      console.log(e);
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
              body:JSON.stringify(appt)
        }
    )
}