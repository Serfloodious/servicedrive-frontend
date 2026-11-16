const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please add a service name"], trim: true },
    description: { type: String, required: [true, "Please add a description"], trim: true },
    estimatedDuration: {
      type: Number,
      required: [true, "Please add an estimated duration in minutes"],
      min: [1, "Estimated duration must be at least 1 minute"],
      validate: { validator: Number.isSafeInteger, message: "Estimated duration must be an integer" },
    },
    serviceFee: { type: Number, required: [true, "Please add a service fee"], min: [0, "Service fee cannot be negative"] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);

export default service;
