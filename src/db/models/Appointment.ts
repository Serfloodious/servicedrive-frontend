const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    registrationNumber: { type: String, required: [true, "Please add a vehicle registration number"], trim: true },
    brand: { type: String, required: [true, "Please add a vehicle brand"], trim: true },
    model: { type: String, required: [true, "Please add a vehicle model"], trim: true },
    appointmentDate: { type: Date, required: true },
    startTime: { type: String, required: true, match: [/^([01]\d|2[0-3]):[0-5]\d$/, "Start time must use HH:mm format"] },
    durationMinutes: {
      type: Number,
      required: true,
      min: 1,
      validate: { validator: Number.isSafeInteger, message: "Duration must be an integer" },
    },
    startsAt: { type: Date, required: true },
    endsAt: { type: Date, required: true },
  },
  { timestamps: true }
);

// One appointment per member, normalized vehicle registration number, and UTC day.
AppointmentSchema.index({ user: 1, registrationNumber: 1, appointmentDate: 1 }, { unique: true });
AppointmentSchema.index({ registrationNumber: 1, startsAt: 1, endsAt: 1 });
AppointmentSchema.index({ user: 1, startsAt: 1 });

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema);

export default Appointment;
