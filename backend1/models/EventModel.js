const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Wedding, Birthday, etc.
  date: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Who created this event
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }] // Payments for this event
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
