import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda"

import {logger} from "../util"
import {AppointmentFactory} from "../dataaccess/provider"

const apptsController=new AppointmentFactory()

export const handler:APIGatewayProxyHandler=async (event:APIGatewayProxyEvent):Promise<APIGatewayProxyResult>=>{
    const data=JSON.parse(event.body|| "")
    const apptId=data.appointmentId
    const apptStatus=data.appointmentStatus
    const userId="1"
    try{
      var appt=await apptsController.updateAppointmentStatus(apptId,apptStatus,userId)
      logger.debug(appt)
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
              body:JSON.stringify(appt)
        }
    )
}