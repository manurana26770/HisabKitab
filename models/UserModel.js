const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Friend' }], // Friends list
  totalReceived: { type: Number, default: 0 }, // Total amount received
  totalGiven: { type: Number, default: 0 }, // Total amount given
}, { timestamps: true });

module.exports =  mongoose.model('User', userSchema);
