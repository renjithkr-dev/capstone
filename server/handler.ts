
import { AppointmentFactory } from "./src/dataaccess/provider"

const tester = async () => {
  const factory = new AppointmentFactory()
  const appt = {
    appointmentDate: "2021-02-22",
    appointmentTime: "11:30",
    staffId: Math.random().toString(26).substr(2),
    comments: "Testing locally"
  }
  const userId = "351hnj7h9017"//Math.random().toString(26).substr(2)
  const userId2 = "351hnj7h9018"
  const appt1 = {
    appointmentDate: "2021-02-25",
    appointmentTime: "11:30",
    staffId: Math.random().toString(26).substr(2),
    comments: "Testing locally"
  }
  try {
    await factory.createAppointment(appt, userId)
    await factory.createAppointment(appt1, userId2)
    const appts = await factory.getUserAppointments(userId,"2021-02-22")
    const appts2 = await factory.getUserAppointments(userId2,"2021-02-22")
    console.log(userId,"  ",appts)
    console.log('--------------------')
    console.log(userId2,"  ",appts2)
    // console.log("STaff appts")
    // const sAppts = await factory.getStaffAppointments(appt1.staffId)
    // console.log(sAppts)
  }
  catch (e) {
    console.log(e)
  }
}
tester()