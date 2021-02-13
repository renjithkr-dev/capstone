import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda"

import {logger} from "../util"
import {AppointmentFactory} from "../dataaccess/provider"

const apptsController=new AppointmentFactory()

export const handler:APIGatewayProxyHandler=async (event:APIGatewayProxyEvent):Promise<APIGatewayProxyResult>=>{
    const apptId=event.pathParameters?.appointmentId
    const userId="1"
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