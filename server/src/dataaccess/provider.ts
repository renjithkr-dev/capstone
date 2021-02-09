import {AppointmentImpl, AppointmentInterface, ProviderInterface} from "../models/appoinments"
import { DynamoDBProvider } from "./dynamodbProvider"


export class AppointmentFactory{
    appointments:AppointmentInterface[]
    dbProvider:ProviderInterface
    constructor() {
        this.appointments=[]
        this.dbProvider=new DynamoDBProvider()
    }
    createAppointment=async (data:any,userId:string):Promise<{}>=>{
        const apptData={...data,userId:userId}
        const apt=new AppointmentImpl(apptData)
        this.appointments.push(apt)
        try{
            await this.dbProvider.addAppointment(apt)
            return Promise.resolve(apt)
        }
        catch(e){
            return Promise.reject({"error":e})
        }
    }
    getUserAppointments=async (userId:string):Promise<AppointmentInterface[]>=>{
        return Promise.resolve(this.appointments.filter((apt)=>apt.userId===userId));
    }

    getStaffAppointments=async (staffId:string):Promise<AppointmentInterface[]>=>{
        return Promise.resolve(this.appointments.filter((apt)=>apt.staffId===staffId));
    }

}
