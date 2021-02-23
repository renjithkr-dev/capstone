export const AppointmentItem=(props)=>{
    let apptStatus="no data"
    const item=props.item
    switch(props.item.appointmentStatus){
        case 0:apptStatus="pending";break
        case 1:apptStatus="approved";break
        case 2:apptStatus='rejected'
    }

    const deleteAppointmentListener=()=>{
        props.deleteAppointmentListener(item.appointmentId)
    }
    return(
        <div className='apptItem' >
            <span className='apptItem-status badge bg-primary'>{apptStatus}</span> : <span className='apptItem-date'>{item.appointmentDate}</span> : 
            <span className='apptItem-time'>{item.appointmentTime}</span> : <span className='apptItem-staffid'>{item.staffId}</span> : 
            <span className='apptItem-comments'>{item.comments}</span>
            <button type="button" className='btn btn-danger' onClick={deleteAppointmentListener} disabled={props.status.deleteRunning}>Delete</button>
        </div>
    )
}