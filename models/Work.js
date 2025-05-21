import mongoose, { Schema } from "mongoose";

const WorkSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  companyName: {
    type: String,
    required: true,
  },
  workStartDate: {
    type: String,
    required: true,
  },
  workEndDate: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  tookVehicleToGo: {
    type: Boolean,
    required: true,
  },
  tookVehicleToComeBack: {
    type: Boolean,
    required: true,
  },
  wagePerHour: {
    type: Number,
    required: true,
  },
  breakTaken: {
    type: Number,
    required: true,
  },
});

const Work = mongoose.model("Work", WorkSchema);

export default Work;
