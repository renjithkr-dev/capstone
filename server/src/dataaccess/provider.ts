
import {AppointmentImpl, AppointmentInterface, APPT_STATUS, ProviderInterface} from "../models/appoinments"
import { DynamoDBProvider } from "./dynamodbProvider"
import {logger} from "../util"


export class AppointmentFactory{
    dbProvider:ProviderInterface
    constructor() {
        this.dbProvider=new DynamoDBProvider()
    }
    createAppointment=async (data:any,userId:string):Promise<{}>=>{
        const apptData={...data,userId:userId}
        logger.debug(apptData)
        const apt=new AppointmentImpl(apptData)
        logger.debug(apt)
        try{
            await this.dbProvider.addAppointment(apt)
            return Promise.resolve(apt)
        }
        catch(e){
            return Promise.reject({"error":e})
        }
    }
    getUserAppointments=async (userId:string,apptDate:string):Promise<AppointmentInterface[]>=>{

        const appts=await this.dbProvider.getUserAppointments(userId,apptDate)
        return Promise.resolve(appts);
    }

    getStaffAppointments=async (staffId:string,apptDate:string):Promise<AppointmentInterface[]>=>{
        const appts=await this.dbProvider.getStaffAppointments(staffId,apptDate)
        return Promise.resolve(appts);
    }
    updateAppointmentStatus=async(apptId:string,apptStatus:APPT_STATUS,userId:string):Promise<AppointmentInterface> =>{
        try{
        const appts=await this.dbProvider.updateAppointmentStatus(apptId,apptStatus,userId)
        return Promise.resolve(appts);
        }catch(e){
            return Promise.reject({"error":e})
        }
    }
    deleteAppointment=async (apptId:string,userId:string):Promise<any>=>{
        const resp=await this.dbProvider.deleteAppointment(apptId,userId)
        return Promise.resolve(resp)
    }
    
}
