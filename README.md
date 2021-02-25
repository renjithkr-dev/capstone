# Appointment System

## APIs
This system offers a set of APIs to add appointments to staff and allow staff to approve/reject the request. These are the endpoints
1.   Provides a list of Staff memebers.
  GET - https://reumgbrqwd.execute-api.us-east-1.amazonaws.com/dev/staff
  Response :
  `{"count":3,"data":[{"StaffId":"602966e6c8851c006901d02c","StaffName":"Staff1","Department":"Sales"}`

2. Create an appointment
  POST - https://reumgbrqwd.execute-api.us-east-1.amazonaws.com/dev/appointments/user/create
  JSON body
  `{
    "staffId":"123wt57",
    "appointmentDate":"2021-02-29",
    "appointmentTime":"10:30",
    "comments":"r3 user bnre hdh"
}`
Response : newly created appointment

3. Delete appointment 
  DELETE - https://reumgbrqwd.execute-api.us-east-1.amazonaws.com/dev/appointments/delete/{appointmentId}
4. Approve or reject appointment by Staff
  PATCH - https://reumgbrqwd.execute-api.us-east-1.amazonaws.com/dev/appointments/update
  Request body:
  `{
    "appointmentId":"6ec1fcd2-339b-4d35-a574-727a86c4b53a",
    "appointmentStatus":"2",
    "appointmentDate":"2021-02-25",
    "userId":"602e927e90e442007038d238"
}`
_Status =2 for **reject**
Status= 1 for **approve**_

5. Get appointments
_By providing a date, you can get appointments for an user or staff for a particular date. By ignoring date, we can retrieve all future appointments_

  GET - https://reumgbrqwd.execute-api.us-east-1.amazonaws.com/dev/appointments/user

  GET - https://reumgbrqwd.execute-api.us-east-1.amazonaws.com/dev/appointments/user/{apptDate}

  GET - https://reumgbrqwd.execute-api.us-east-1.amazonaws.com/dev/appointments/staff

  GET - https://reumgbrqwd.execute-api.us-east-1.amazonaws.com/dev/appointments/staff/{apptDate}

Response sample
`[{"appointmentDate":"2021-02-25","appointmentTime":"11:30","staffId":"602f443866abcd006913e2b9","userId":"602e927e90e442007038d238","appointmentId":"4329024d-4836-43da-983f-c560c15f7214","comments":"test","recordDate":"Wed, 24 Feb 2021 12:42:52 GMT","appointmentStatus":0}]`

## Client application
This is a React application which offers separate interfaces for regular user and Staff. User can see their own appointments, create appointment and delete. Staff can view requested appoinments, then approve or reject.
_Create an Auth0 account when you try to login first time._



