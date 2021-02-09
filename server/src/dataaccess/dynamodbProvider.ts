import * as AWS from "aws-sdk"
import { AppointmentInterface, ProviderInterface } from "../models/appoinments";

AWS.config.update({region:'us-east-1'})
var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
export class DynamoDBProvider implements ProviderInterface {
    addAppointment = async (appt: AppointmentInterface): Promise<AppointmentInterface> => {
        console.log(process.env.APPTS_TABLE); 
        const params: any = {
            TableName: process.env.APPTS_TABLE || 'appts-dev',
            Item: {
                userId: appt.userId,
                apptId: appt.appointmentId,
                apptDate: appt.appointmentDate,
                apptTime: appt.appointmentTime,
                comments: appt.comments,
                recordDate: appt.recordDate
            }
        }
        try {
            await docClient.put(params).promise();
            return Promise.resolve(appt)
        } catch (e) {
            return Promise.reject({ "error": e })
        }
    }
}