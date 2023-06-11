"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
    unique: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    "default": Date.now,
    expires: 3600
  }
});
module.exports = mongoose.model("token", tokenSchema);