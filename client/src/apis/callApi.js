import axios from 'axios'
const GETAPI=async(url,options)=>{
    try {
        
        const data=await axios.get(url,{
            headers:{
                Authorization:`bearer ${options.accessToken}`
            }
        })
        console.log(data)
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




