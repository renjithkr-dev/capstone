import {v4 as uuid} from "uuid"

export enum APPT_STATUS{
    PENDING,
    APPROVED,
    REJECTED
}

export interface AppointmentInterface{
    readonly appointmentId?:string,
    appointmentDate:string,
    appointmentTime:string,
    staffId:string,
    comments?:string,
    userId:string,
    readonly recordDate?:string
    appointmentStatus?:APPT_STATUS
}
export interface ProviderInterface{
    addAppointment (appt:AppointmentInterface):Promise<AppointmentInterface>
    getUserAppointments (userId:string,apptDate:string):Promise<AppointmentInterface[]>
    getStaffAppointments (staffId:string,apptDate:string):Promise<AppointmentInterface[]>
    updateAppointmentStatus (apptId:string,status:APPT_STATUS,userId:string):Promise<AppointmentInterface>
    deleteAppointment (apptId:string,userId:string):Promise<any>
}
export class AppointmentImpl implements AppointmentInterface{
    appointmentId?: string
    appointmentDate: string
    appointmentTime: string
    staffId: string;
    comments?: string
    userId:string
    recordDate:string
    appointmentStatus:APPT_STATUS

    constructor(appt:AppointmentInterface){
        this.appointmentId=uuid() || Math.random().toString(50).substr(2)
        this.appointmentDate=appt.appointmentDate
        this.appointmentTime=appt.appointmentTime
        this.staffId=appt.staffId
        this.comments=appt.comments
        this.userId=appt.userId
        this.recordDate=appt.recordDate || new Date().toUTCString()
        this.appointmentStatus=APPT_STATUS.PENDING
    }

    static mapToAppointmentJSON(appt:any){
        const apptJSON:AppointmentInterface={
            appointmentDate:appt.appointmentDate,
            appointmentTime:appt.appointmentTime,
            staffId:appt.staffId,
            userId:appt.userId,
            appointmentId:appt.appointmentId,
            comments:appt.comments,
            recordDate:appt.recordDate,
            appointmentStatus:appt.status
        }
        return apptJSON
    }

}