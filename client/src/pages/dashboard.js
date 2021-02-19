import React, { useEffect as UseEffect, useState as UseState } from 'react'
import { getUserAppointmentsForDate } from '../apis/callApi'
import { useAuth0 as UseAuth0 } from '@auth0/auth0-react';
import { AppointmentItem } from '../components/apptComponent'

const dashboard = () => {
    const [apptData, setAppData] = UseState([])
    const { getAccessTokenSilently } = UseAuth0()
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
    })
    const apptList = apptData.map(el => {
        return <AppointmentItem item={el} key={el.appointmentId} />
    })
    return (
        <>
            <div>Hello</div>
            {apptList}
        </>
    )
}
export default dashboard