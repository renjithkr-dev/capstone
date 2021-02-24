import React, { useEffect as UseEffect, useState as UseState } from 'react'
import { getUserAppointmentsForDate, deleteUserAppointment } from '../apis/callApi'
import { useAuth0 as UseAuth0 } from '@auth0/auth0-react';
import { AppointmentItem } from '../components/apptComponent'

const dashboard = () => {
    const [apptData, setAppData] = UseState([])
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
            let data = await getUserAppointmentsForDate('2021-02-29', { "accessToken": accessToken })
            setAppData(data.data)
        } catch (e) {
            console.error(e)
        }
    },[])
    const apptList = apptData.map(el => {
        return <AppointmentItem item={el} key={el.appointmentId} deleteAppointmentListener={deleteAppointmentListener} status={{deleteRunning:deleteOperationRunning}}/>
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