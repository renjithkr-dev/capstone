
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

  const appt1 = {
    appointmentDate: "2021-02-25",
    appointmentTime: "11:30",
    staffId: Math.random().toString(26).substr(2),
    comments: "Testing locally"
  }
  try {
    await factory.createAppointment(appt, userId)
    await factory.createAppointment(appt1, userId)
    const appts = await factory.getUserAppointments(userId,"2021-02-21")
    console.log(appts)
    // console.log("STaff appts")
    // const sAppts = await factory.getStaffAppointments(appt1.staffId)
    // console.log(sAppts)
  }
  catch (e) {
    console.log(e)
  }
}
tester()