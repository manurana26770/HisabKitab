// TransactionModel.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who received/sent money
  friend: { type: mongoose.Schema.Types.ObjectId, ref: 'Friend' }, // Friend involved
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }, // Event for which payment is made
  amount: { type: Number, required: true },
  type: { type: String, enum: ['credit', 'debit'], required: true }, // Credit = Received, Debit = Given
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
