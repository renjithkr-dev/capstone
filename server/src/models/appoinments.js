"use strict";
exports.__esModule = true;
exports.AppointmentImpl = void 0;
var uuid_1 = require("uuid");
var AppointmentImpl = /** @class */ (function () {
    function AppointmentImpl(appt) {
        this.appointmentId = uuid_1.v4();
        this.appointmentDate = appt.appointmentDate;
        this.appointmentTime = appt.appointmentTime;
        this.staffId = appt.staffId;
        this.comments = appt.comments;
        this.userId = appt.userId;
        this.recordDate = appt.recordDate || new Date().toUTCString();
    }
    return AppointmentImpl;
}());
exports.AppointmentImpl = AppointmentImpl;
