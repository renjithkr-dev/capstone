import axios from 'axios'
const GETAPI=async(url,options)=>{
    try {
        
        const data=await axios.get(url,{
            headers:{
                Authorization:`bearer ${options.accessToken}`
            }
        })
        return Promise.resolve(data);
    } catch (error) {
        console.error(error)
        return Promise.reject(error)
    }
}
 export const getUserAppointmentsForDate=async(appointmentDate,options)=>{
    try {
        const data=await GETAPI(`/appointments/user/${appointmentDate}`,options)
        return Promise.resolve(data)
    } catch (error) {
        console.error(error)
        return Promise.reject(error)
    }

}

export const deleteUserAppointment=async(apptId,options)=>{
    try {
        const data=await axios.delete(`appointments/delete/${apptId}`,{
            headers:{
                Authorization:`bearer ${options.accessToken}`
            }
        })
        return Promise.resolve(data)
    } catch (error) {
        console.error(error)
        return Promise.reject(error)
    }
}
export const getStaffList=async(options)=>{
    try {
        const data=await GETAPI(`/staff/`,options)
        return Promise.resolve(data.data.data)
    } catch (error) {
        console.error(error)
        return Promise.reject(error)
    }

}

export const addAppointment=async(appt,options)=>{
    try {
        const data=await axios.post('/appointments/user/create',appt,{
            headers:{
                Authorization:`bearer ${options.accessToken}`,
                'Content-Type':'application/json'
            }
        })
        return Promise.resolve(data)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}
export const getStaffAppointments=async(appointmentDate,options)=>{
    try {
        const data=await GETAPI(`/appointments/staff/${appointmentDate}`,options)
        return Promise.resolve(data)
    } catch (error) {
        console.error(error)
        return Promise.reject(error)
    }

}
export const updateStaffAppointments=async(appt,options)=>{
    try {
        const data=await axios.patch(`/appointments/update`,appt,{
            headers:{
                Authorization:`bearer ${options.accessToken}`,
                'Content-Type':'application/json'
            }
        })
        return Promise.resolve(data)
    } catch (error) {
        console.error(error)
        return Promise.reject(error)
    }

}



