import React, { useEffect as UseEffect, useState as UseState } from 'react'
import { useAuth0 as UseAuth0 } from '@auth0/auth0-react';
import {getStaffList,addAppointment} from '../apis/callApi'


const newappointment = () => {
    const { getAccessTokenSilently } = UseAuth0()
    const [staffList,setStaffList]=UseState({data:[]})
    const [appointment,setAppointment]=UseState({
        "staffId":"",
        "appointmentDate":"",
        "appointmentTime":"",
        "comments":""
    })
    const [staffId,setStaffId]=UseState('')
    const [appointmentDate,setAppointmentDate]=UseState('')
    const [appointmentTime,setAppointmentTime]=UseState('')
    const [comments,setComments]=UseState('')
    
    UseEffect(async () => {
        try {
            const accessToken = await getAccessTokenSilently({
                audience: process.env.REACT_APP_AUTH0_AUDIENCE
            })
            const data = await getStaffList( { "accessToken": accessToken })
            console.log(data)
            setStaffList({data:data})
            console.log(staffList)
        } catch (e) {
            console.error(e)
        }
    },[])
    const changeHandler=(event)=>{
        let tempData=appointment
        tempData[event.target.name]=event.target.value
        console.log(event,tempData)
        setAppointment(tempData)
    }
    const addAppointmentHandler=async()=>{
        try {
            const accessToken = await getAccessTokenSilently({
                audience: process.env.REACT_APP_AUTH0_AUDIENCE
            })
            const data = await addAppointment(appointment, { "accessToken": accessToken })
            console.log(data)
            setAppointment({
                "staffId":"",
                "appointmentDate":"",
                "appointmentTime":"",
                "comments":""
            })
        } catch (e) {
            console.error(e)
        }
    }
    const staffSelectList = staffList.data.map(el => {return (<option value={el.StaffId} key={el.StaffId}>{el.StaffName}</option>)});

    
    return (
        <div className='dashboard'>
            <h2>New appointment</h2>
            <p>
                <label>Staff : <select name='staffId' onChange={changeHandler}>
                    <option value="">Select staff</option>
                    {staffSelectList}
                </select></label><br />
                <label>Appointment Date : <input type='text' name='appointmentDate' onBlur={changeHandler}></input></label><br />
                <label>Appointment Time : <input type='text' name='appointmentTime' onBlur={changeHandler}></input></label><br />
                <label>Comments <textarea rows={5} cols={25} name='comments' onBlur={changeHandler}/></label><br />
                <button className='btn btn-primary' onClick={addAppointmentHandler}>Add</button>
            </p>

        </div>
    )
}

export default newappointment