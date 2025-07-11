const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Belongs to a user
  name: { type: String, required: true },
  phone: { type: String, required: true }, // Removed 'unique' to allow same friend for different events
  events: [{ 
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }, // Linked Event ID
    eventName: { type: String, required: true } // Store Event Name
  }],
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]
}, { timestamps: true });

module.exports = mongoose.model('Friend', friendSchema);
