export const AppointmentItem=(props)=>{
    let apptStatus="no data"
    const item=props.item
    switch(props.item.appointmentStatus){
        case 0:apptStatus="pending";break
        case 1:apptStatus="approved";break
        case 2:apptStatus='rejected'
    }
    return(
        <div className='apptItem' >
            <span>{apptStatus}</span> : <span>{item.appointmentDate}</span> : <span>{item.appointmentTime}</span> : <span>{item.staffId}</span> : <span>{item.comments}</span>
        </div>
    )
}