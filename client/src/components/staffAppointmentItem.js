export const StaffAppointmentItem=(props)=>{
    let apptStatus="no data"
    const item=props.item
    switch(props.item.appointmentStatus){
        case "0":apptStatus="pending";break
        case "1":apptStatus="approved";break
        case "2":apptStatus='rejected'
    }

    const acceptAppointmentListener=()=>{
        props.statusUpdateAppointmentListener(item.appointmentId,'1')
    }
    const rejectAppointmentListener=()=>{
        props.statusUpdateAppointmentListener(item.appointmentId,'2')
    }
    return(
        <div className='apptItem' >
            <span className='apptItem-status badge bg-primary'>{apptStatus}</span> : <span className='apptItem-date'>{item.appointmentDate}</span> : 
            <span className='apptItem-time'>{item.appointmentTime}</span> : <span className='apptItem-staffid'>{item.staffId}</span> : 
            <span className='apptItem-comments'>{item.comments}</span>
            <button type="button" className='btn btn-primary mr-1' onClick={acceptAppointmentListener} disabled={props.status.updateRunning}>Accept</button>
            <button type="button" className='btn btn-danger' onClick={rejectAppointmentListener} disabled={props.status.updateRunning}>Reject</button>
        </div>
    )
}