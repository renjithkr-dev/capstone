import {useState as UseState} from 'react'
export const StaffAppointmentItem=(props)=>{
    const item=props.item
    let tmpStatus=""
     switch(props.item.appointmentStatus.toString()){
        case "0":tmpStatus=("pending");break
        case "1":tmpStatus=("approved");break
        case "2":tmpStatus=("rejected");break;
    }
    const [apptStatus,setAppStatus]=UseState(tmpStatus)
    
    const acceptAppointmentListener=()=>{
        props.statusUpdateAppointmentListener(item.appointmentId,'1')
        setAppStatus("approved")
    }
    const rejectAppointmentListener=()=>{
        props.statusUpdateAppointmentListener(item.appointmentId,'2')
        setAppStatus("rejected")
    }
    return(
        <div className='apptItem' >
            <span className='apptItem-status badge bg-primary'>{apptStatus}</span> : <span className='apptItem-date'>{item.appointmentDate}</span> : 
            <span className='apptItem-time'>{item.appointmentTime}</span> : <span className='apptItem-staffid'>{item.staffId}</span> : 
            <span className='apptItem-comments'>{item.comments}</span>
            {
            apptStatus==="pending"?
            <>
            <button type="button" className='btn btn-primary mr-1' onClick={acceptAppointmentListener} disabled={props.status.updateRunning}>Accept</button>
            <button type="button" className='btn btn-danger' onClick={rejectAppointmentListener} disabled={props.status.updateRunning}>Reject</button>
            </>
            :
            ""
            }
        </div>
    )
}