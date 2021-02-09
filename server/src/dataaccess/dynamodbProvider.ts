import * as AWS from "aws-sdk"
import { QueryOutput } from "aws-sdk/clients/dynamodb";
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

    getUserAppointments=async (userId:string,apptDate:string):Promise<AppointmentInterface[]> =>{
        var params:any = {
            TableName: process.env.APPTS_TABLE,
            IndexName: process.env.USER_APPTS_INDEX,
            KeyConditionExpression:"userId=:id and apptDate= :apptDate",
            ExpressionAttributeValues:{
              ":id":userId,
              ":apptDate":apptDate
            }
        };
        try {
            const appts:QueryOutput=await docClient.query(params).promise()
            var apptList:any=appts.Items
            const data:AppointmentInterface[]=[]
            apptList.forEach((appt: { apptDate: any; apptTime: any; apptId: any; comments: any; recordDate: any; }) => {
                const user:AppointmentInterface={
                    appointmentDate:appt.apptDate,
                    appointmentTime:appt.apptTime,
                    staffId:"",
                    userId,
                    appointmentId:appt.apptId,
                    comments:appt.comments,
                    recordDate:appt.recordDate
                }
                data.push(user)
            });
            return Promise.resolve(data)
        } catch (e) {
            return Promise.reject({ "error": e })
        }
    }
}