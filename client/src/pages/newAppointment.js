import React, { useEffect as UseEffect, useState as UseState } from 'react'
import { useAuth0 as UseAuth0 } from '@auth0/auth0-react';
import { getStaffList, addAppointment ,uploadToS3} from '../apis/callApi'
import { getTodayString } from '../util'
import {Redirect} from 'react-router-dom'


const newappointment = () => {
    const { getAccessTokenSilently } = UseAuth0()
    const [staffList, setStaffList] = UseState({ data: [] })
    const [appointment, setAppointment] = UseState({
        "staffId": "",
        "appointmentDate": "",
        "appointmentTime": "",
        "comments": "",
        "attachmentUrl":""
    })
    const [files, setFiles] = UseState('')
    const [uploading,setUploading]=UseState(false)

    UseEffect(async () => {
        try {
            const accessToken = await getAccessTokenSilently({
                audience: process.env.REACT_APP_AUTH0_AUDIENCE
            })
            const data = await getStaffList({ "accessToken": accessToken })
            console.log(data)
            setStaffList({ data: data })
            console.log(staffList)
        } catch (e) {
            console.error(e)
        }
    }, [])
    const changeHandler = (event) => {
        if (event.target.name === 'appointmentTime') {
            var patt = new RegExp("^(0[0-9]|1[0-9]|2[0-3]):(00|30)$")
            if (!patt.test(event.target.value))
                console.log("Error in time format")
        }
        let tempData = appointment
        tempData[event.target.name] = event.target.value
        console.log(event, tempData)
        setAppointment(tempData)
    }
    const addAppointmentHandler = async () => {
        setUploading(true)
        try {
            const accessToken = await getAccessTokenSilently({
                audience: process.env.REACT_APP_AUTH0_AUDIENCE
            })
            const uploadStatus=await uploadFile({ "accessToken": accessToken })
            console.log(uploadStatus)
            let tempData = appointment
        tempData['attachmentUrl'] = uploadStatus
        console.log( tempData)
        setAppointment(tempData)
            
            const data = await addAppointment(appointment, { "accessToken": accessToken })
            console.log(data)
            return <Redirect to={'/dashboard'} />
        } catch (e) {
            console.error(e)
        }finally{
            setUploading(false)
        }
    }
    const uploadFile = async (options)=>{
        try{
            let uploadedUrl=await uploadToS3(files,options)
            console.log(uploadedUrl)
            return Promise.resolve(uploadedUrl)
        }catch(e){
            return Promise.reject(e)
        }
    }

    const handleFileChange = (event) => {
        const upfiles = event.target.files
        if (!upfiles) return

        setFiles(upfiles[0])
    }
    const staffSelectList = staffList.data.map(el => { return (<option value={el.StaffId} key={el.StaffId}>{el.StaffName}</option>) });


    return (
        <div className='dashboard'>
            <h2>New appointment</h2>
            <p>
                <label>Staff : <select name='staffId' onChange={changeHandler}>
                    <option value="">Select staff</option>
                    {staffSelectList}
                </select></label><br />
                <label>Appointment Date : <input type='date' name='appointmentDate' min={getTodayString()} onBlur={changeHandler}></input></label><br />
                <label>Appointment Time : <input type='text' name='appointmentTime' onBlur={changeHandler} placeholder="Time format hh:00 / hh:30 "></input></label><br />
                <label>File</label>
                <input
                    name="myfile"
                    type="file"
                    accept="image/* , .pdf , .doc"
                    placeholder="Image to upload"
                    onChange={handleFileChange}
                /><br/>
                <label>Comments <textarea rows={5} cols={25} name='comments' onBlur={changeHandler} /></label><br />
                <button className='btn btn-primary' onClick={addAppointmentHandler} disabled={uploading}>Add</button>
            </p>

        </div>
    )
}

export default newappointment