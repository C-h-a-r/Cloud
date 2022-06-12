const { Schema, model } = require("mongoose");

// We declare new schema.
const userSchema = new Schema({
  userID: {
    type: String,
  },
  warns: {
    type: Number,
    default: 0,
  },
  warnReasons: {
      type: Array,
  },
  merits: {
    type: Number,
    default: 0,
  },
});

// We export it as a mongoose model.
module.exports = model("user", userSchema);