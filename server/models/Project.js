const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
  },
  clientId: {
    // this client id is related to an id of client model
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
