// const mongoose = require("mongoose");

// const projectSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   description: String,
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User"
//   }
// });

// module.exports = mongoose.model("Project", projectSchema);


const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "completed", "on-hold"],
    default: "active"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual: Progress calculation
projectSchema.virtual("progress", {
  ref: "Task",
  localField: "_id",
  foreignField: "project",
  justOne: false
});

module.exports = mongoose.model("Project", projectSchema);
