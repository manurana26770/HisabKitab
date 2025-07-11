const express = require("express");
const TransactionController = require("../controllers/transactionController");
const Token = require("../utils/checkToken");
const router = express.Router();

// Record a payment transaction (When a QR is scanned)
router.post("/save", TransactionController.recordTransaction);
router.post("/payTofriend" ,Token , TransactionController.recordTransactionfriend) // to pay a friend
// Get transaction history of a friend
router.get("/:friendId", TransactionController.getTransactions);







module.exports = router;
