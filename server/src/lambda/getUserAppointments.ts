import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda"

import {logger} from "../util"
import {AppointmentFactory} from "../dataaccess/provider"

const apptsController=new AppointmentFactory()

export const handler:APIGatewayProxyHandler=async (event:APIGatewayProxyEvent):Promise<APIGatewayProxyResult>=>{
    const aptDate=event.pathParameters?.apptDate
    logger.debug(`Retrieving data for user for date ${aptDate}`)
    try{
      var appts=await apptsController.getUserAppointments("1",aptDate||"")
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
              body:JSON.stringify(appts)
        }
    )
}