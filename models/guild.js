const { Schema, model } = require("mongoose");

// We declare new schema.
const guildSchema = new Schema({
  guildiD: {
    type: String,
  },
  bannedWords: {
      type: Array,
  },
});

// We export it as a mongoose model.
module.exports = model("guild", guildSchema);