import React, { useEffect as UseEffect, useState as UseState } from 'react'
import { getUserAppointmentsForDate, deleteUserAppointment,getStaffList } from '../apis/callApi'
import { useAuth0 as UseAuth0 } from '@auth0/auth0-react';
import { AppointmentItem } from '../components/apptComponent'
import {getTodayString} from '../util'

const dashboard = () => {
    const [apptData, setAppData] = UseState([])
    const [staffList,setStaffList]=UseState({data:[]})
    const { getAccessTokenSilently } = UseAuth0()
    const [deleteOperationRunning,setDeleteOperationRunning]=UseState(false)

    const deleteAppointmentListener=async(apptId)=>{
        setDeleteOperationRunning(true)
        const accessToken = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE
        })
        try {
            await deleteUserAppointment(apptId,{ "accessToken": accessToken })
            const tempData=apptData.filter(el=>el.appointmentId!==apptId)
            setAppData(tempData)
            console.log('deletion success')
        } catch (error) {
            console.log(error)
        }finally{
            setDeleteOperationRunning(false)
        }

    }
    UseEffect(async () => {
        if (apptData.length > 0)
            return
        try {

            const accessToken = await getAccessTokenSilently({
                audience: process.env.REACT_APP_AUTH0_AUDIENCE
            })
            const staffdata = await getStaffList( { "accessToken": accessToken })
            console.log(staffdata)
            setStaffList({data:staffdata})
            let data = await getUserAppointmentsForDate(getTodayString(), { "accessToken": accessToken })
            setAppData(data.data)
        } catch (e) {
            console.error(e)
        }
    },[])
    const apptList = apptData.map(el => {
        const st=staffList.data.find(stel=>stel.StaffId===el.staffId)
        return <AppointmentItem item={el} staffName={st?.StaffName} key={el.appointmentId} deleteAppointmentListener={deleteAppointmentListener} status={{deleteRunning:deleteOperationRunning}}/>
    })
    return (
        <div className='dashboard'>
            <h2 style={{textAlign:'center'}}>Upcoming appointments</h2>
            <div className="appointments-holder">
            {apptData.length>0?apptList:'No appointments'}
            </div>
        </div>
    )
}
export default dashboard