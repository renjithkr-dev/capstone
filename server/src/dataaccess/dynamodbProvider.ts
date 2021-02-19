import * as AWS from "aws-sdk"
import { QueryOutput } from "aws-sdk/clients/dynamodb";
import { AppointmentImpl, AppointmentInterface, APPT_STATUS, ProviderInterface } from "../models/appoinments";

AWS.config.update({region:'us-east-1'})
var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
export class DynamoDBProvider implements ProviderInterface {
    addAppointment = async (appt: AppointmentInterface): Promise<AppointmentInterface> => {
        console.log(process.env.APPTS_TABLE); 
        const params: any = {
            TableName: process.env.APPTS_TABLE || 'appts-dev',
            Item: {
                userId: appt.userId,
                appointmentId: appt.appointmentId,
                appointmentDate: appt.appointmentDate,
                appointmentTime: appt.appointmentTime,
                comments: appt.comments,
                staffId: appt.staffId,
                appointmentStatus:appt.appointmentStatus,
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
        const condition=apptDate!=""?"userId=:id and appointmentDate= :apptDate":"userId=:id"
        const expAttrib=apptDate!=""?{
            ":id":userId,
            ":apptDate":apptDate
          }:
          {
            ":id":userId
          }
        var params:any = {
            TableName: process.env.APPTS_TABLE,
            IndexName: process.env.USER_APPTS_INDEX,
            KeyConditionExpression:condition,
            ExpressionAttributeValues:expAttrib
        };
        try {
            const appts:QueryOutput=await docClient.query(params).promise()
            var apptList:any=appts.Items
            const data:AppointmentInterface[]=[]
            apptList.forEach((appt:AppointmentInterface) => {
                const user:AppointmentInterface={
                    appointmentDate:appt.appointmentDate,
                    appointmentTime:appt.appointmentTime,
                    staffId:appt.staffId,
                    userId:appt.userId,
                    appointmentId:appt.appointmentId,
                    comments:appt.comments,
                    recordDate:appt.recordDate,
                    appointmentStatus:appt.appointmentStatus
                }
                data.push(user)
            });
            return Promise.resolve(data)
        } catch (e) {
            return Promise.reject({ "error": e })
        }
    }

    getStaffAppointments=async (staffId:string,apptDate:string):Promise<AppointmentInterface[]> =>{
        const condition=apptDate!=""?"staffId=:id and appointmentDate= :apptDate":"staffId=:id"
        const expAttrib=apptDate!=""?{
            ":id":staffId,
            ":apptDate":apptDate
          }:
          {
            ":id":staffId
          }
        var params:any = {
            TableName: process.env.APPTS_TABLE,
            IndexName: process.env.STAFF_APPTS_INDEX,
            KeyConditionExpression:condition,
            ExpressionAttributeValues:expAttrib
        };
        try {
            const appts:QueryOutput=await docClient.query(params).promise()
            var apptList:any=appts.Items
            const data:AppointmentInterface[]=[]
            apptList.forEach((appt:AppointmentInterface) => {
                const user:AppointmentInterface={
                    appointmentDate:appt.appointmentDate,
                    appointmentTime:appt.appointmentTime,
                    staffId:appt.staffId,
                    userId:appt.userId,
                    appointmentId:appt.appointmentId,
                    comments:appt.comments,
                    recordDate:appt.recordDate,
                    appointmentStatus:appt.appointmentStatus
                }
                data.push(user)
            });
            return Promise.resolve(data)
        } catch (e) {
            return Promise.reject({ "error": e })
        }
    }
    updateAppointmentStatus=async (apptId:string,apptStatus:APPT_STATUS,userId:string):Promise<AppointmentInterface> =>{
        try{
            var params:any={
                TableName: process.env.APPTS_TABLE,
                Key:{
                    "userId":userId,
                    "appointmentId":apptId
                },
                UpdateExpression:"set appointmentStatus = :st",
                ExpressionAttributeValues:{
                    ":st":apptStatus
                },
                ReturnValues:"UPDATED_NEW"
            }
            var data:any=await docClient.update(params).promise()
            return Promise.resolve(AppointmentImpl.mapToAppointmentJSON(data))
        } catch (e) {
            return Promise.reject({ "error": e })
        }
    }
    deleteAppointment=async (apptId:string,userId:string):Promise<any> =>{
        try{
            var params:any={
                TableName: process.env.APPTS_TABLE,
                Key:{
                    "userId":userId,
                    "appointmentId":apptId
                }
            }
            var data:any=await docClient.delete(params).promise()
            return Promise.resolve(data)
        } catch (e) {
            return Promise.reject({ "error": e })
        }
    }
}

