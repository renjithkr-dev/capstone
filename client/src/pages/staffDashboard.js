import React, { useEffect as UseEffect, useState as UseState } from 'react'
import { getStaffAppointments, updateStaffAppointments } from '../apis/callApi'
import { useAuth0 as UseAuth0 } from '@auth0/auth0-react';
import { StaffAppointmentItem } from '../components/staffAppointmentItem'
import {getTodayString} from '../util'

export const StaffDashboard = () => {
    const [apptData, setAppData] = UseState([])
    const { getAccessTokenSilently } = UseAuth0()
    const [updateOperationRunning,setUpdateOperationRunning]=UseState(false)
    UseEffect(async () => {
        if (apptData.length > 0)
            return
        try {

            const accessToken = await getAccessTokenSilently({
                audience: process.env.REACT_APP_AUTH0_AUDIENCE
            })
            let data = await getStaffAppointments(getTodayString(), { "accessToken": accessToken })
            console.log(data)
            setAppData(data.data)
        } catch (e) {
            console.error(e)
        }
    }, [])
    const updateAppointmentStatus=async (apptId,status)=>{
        setUpdateOperationRunning(true)
        const accessToken = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE
        })
        try {
            let {appointmentId,appointmentDate,userId}=(apptData.find((el)=>el.appointmentId===apptId))
            let tmpData={
                appointmentId,
                appointmentDate,
                appointmentStatus:status,
                userId
            }
            console.log(tmpData)
            const data = await updateStaffAppointments(tmpData,{ "accessToken": accessToken })
            console.log(data)
        } catch (error) {
            console.log(error)
        }finally{
            setUpdateOperationRunning(false)
        }
    }
    const apptList = apptData.map(el => {
        return <StaffAppointmentItem item={el} key={el.appointmentId} statusUpdateAppointmentListener={updateAppointmentStatus} status={{updateRunning:updateOperationRunning}}/>
    })
    return (
        <div>
            <h3>Staff dashboard</h3>
            {apptList}
        </div>
    )
}