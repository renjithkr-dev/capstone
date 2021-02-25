export const AppointmentItem=(props)=>{
    let apptStatus="no data"
    const item=props.item
    switch(props.item.appointmentStatus.toString()){
        case "0":apptStatus="pending";break
        case "1":apptStatus="approved";break
        case "2":apptStatus='rejected'
    }

    const deleteAppointmentListener=()=>{
        props.deleteAppointmentListener(item.appointmentId)
    }
    return(
        <div className='apptItem' >
            <span className='apptItem-status badge bg-primary'>{apptStatus}</span> 
            <br/><span className='apptItem-date'>Appointment Date : {item.appointmentDate}</span> <br/>
            <span className='apptItem-time'>Appointment Time : {item.appointmentTime}</span> 
            <br/><span className='apptItem-staffid'>Staff Name : {props.staffName}</span> <br/>
            <span className='apptItem-comments'>Comments : {item.comments}</span><br/>
            {item.attachmentUrl ? <a href={item.attachmentUrl} download>Click here to download atachment</a>:""}
            <br/><button type="button" className='btn btn-danger' onClick={deleteAppointmentListener} disabled={props.status.deleteRunning}>Delete</button>
        </div>
    )
}