const Transaction = require("../models/TransactionModel");
const Friend = require("../models/FriendModel");
const Event = require("../models/EventModel");

const TransactionController = {
  // Record a transaction (when QR is scanned & payment is made)
  recordTransaction: async (req, res) => {
    try {
        const { friendId, eventName, amount } = req.body; // Get data from request
  
        // Validate input
        if (!friendId || !eventName || !amount) {
          return res.status(400).json({ message: "Missing required fields" });
        }
  
        // Check if the friend exists
        const friend = await Friend.findById(friendId);
        if (!friend) {
          return res.status(404).json({ message: "Friend not found" });
        }
  
        // 🔹 Check if an event with the same name exists
        let event = await Event.findOne({ name: eventName });
  
        // 🔹 If event does not exist, create a new one
        if (!event) {
          event = new Event({
            name: eventName,
            date: new Date(), // You can modify this to accept a custom date
            user: friend.user, // Owner of event
            transactions: [] // Empty initially
          });
          await event.save();
        }
  
        // Create a new transaction
        const transaction = new Transaction({
          user: friend.user, // The user receiving money
          friend: friendId,
          event: event._id, // Attach event ID
          amount: amount,
          type: "credit", // Payment received = Credit
        });
  
        await transaction.save();
  
        // 🔹 Add the transaction to the event's transaction array
        event.transactions.push(transaction._id);
        await event.save();
        
         // 🔹 Add the transaction to the friend's transaction array
        friend.transactions.push(transaction._id);
        await friend.save();
        
        res.status(201).json({
          message: "Transaction recorded successfully",
          transaction,
          updatedEvent: event,
        });
  
      } catch (error) {
        console.error("Error recording transaction:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
  },
  // Record a transaction to pay frined (when data is enterd to and clicked form /friend/:id/pay (frontend))
  recordTransactionfriend: async (req, res) => {
      try {
          const { friendId, amount  , eventName} = req.body; // Get data from request

          // Validate input
          if (!friendId || !eventName || !amount) {
            return res.status(400).json({ message: "Missing required fields" });
          }
          
          // Check if the friend exists
          const friend = await Friend.findById(friendId);
          if (!friend) {
            return res.status(404).json({ message: "Friend not found" });
          }
    
          // 🔹 Check if an event with the same name exists
          let event = await Event.findOne({ name: eventName });
    
          // 🔹 If event does not exist, create a new one
          if (!event) {
            event = new Event({
              name: eventName,
              date: new Date(), // You can modify this to accept a custom date
              user: friend.user, // Owner of event
              transactions: [] // Empty initially
            });
            await event.save();
          }
    
          // Create a new transaction
          const transaction = new Transaction({
            user: friend.user, // The user receiving money
            friend: friendId,
            event: event._id, // Attach event ID
            amount: amount,
            type: "debit", // Payment given = debit
          });
    
          await transaction.save();
          
          // 🔹 Add the transaction to the event's transaction array
          event.transactions.push(transaction._id);
          await event.save();
          
          // 🔹 Add the transaction to the friend's transaction array
          friend.transactions.push(transaction._id);
          // Check if the event already exists in the friend's events list
          const existingEvent = friend.events.find(e => e.event.toString() === event._id.toString());

          if (!existingEvent) {
            // If event does not exist in the friend's events array, add it
            friend.events.push({ event: event._id, eventName });
          }



          await friend.save();
          
          res.status(201).json({
            message: "Transaction recorded successfully",
            transaction,
            updatedEvent: event,
          });
    
        } catch (error) {
          console.error("Error recording transaction:", error);
          res.status(500).json({ message: "Internal Server Error" });
        }
  },
  // Get all transactions for a specific friend
  getTransactions: async (req, res) => {
    try {
      const { friendId } = req.params;

      // Validate friend ID
      const friend = await Friend.findById(friendId);
      if (!friend) {
        return res.status(404).json({ message: "Friend not found" });
      }

      // Fetch transactions for this friend
      const transactions = await Transaction.find({ friend: friendId })
        .populate("event", "name") // Populate event name
        .sort({ createdAt: -1 }); // Sort by newest first

      res.status(200).json({ transactions });

    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = TransactionController;







