import {v4 as uuid} from "uuid"

export interface AppointmentInterface{
    readonly appointmentId?:string,
    appointmentDate:string,
    appointmentTime:string,
    staffId:string,
    comments?:string,
    userId:string,
    readonly recordDate?:string
}
export interface ProviderInterface{
    addAppointment (appt:AppointmentInterface):Promise<AppointmentInterface>
}
export class AppointmentImpl implements AppointmentInterface{
    appointmentId?: string
    appointmentDate: string
    appointmentTime: string
    staffId: string;
    comments?: string
    userId:string
    recordDate:string

    constructor(appt:AppointmentInterface){
        this.appointmentId=uuid()
        this.appointmentDate=appt.appointmentDate
        this.appointmentTime=appt.appointmentTime
        this.staffId=appt.staffId
        this.comments=appt.comments
        this.userId=appt.userId
        this.recordDate=appt.recordDate || new Date().toUTCString()
    }

}