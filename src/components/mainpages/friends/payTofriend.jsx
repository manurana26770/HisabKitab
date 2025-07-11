import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./payTofriend.css";

const PaymentPage = () => {
  const { id } = useParams(); // Get friendId from URL
  const navigate = useNavigate(); // For navigation
  const [amount, setAmount] = useState("");
  const [eventName, setEventName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    if (!amount || !eventName) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem("token"); // Retrieve auth token
      if (!token) {
        throw new Error("No authentication token found");
      }
      
      const response = await axios.post("https://hisabkitab-2.onrender.com/transactions/payTofriend", {
        friendId: id,
        amount,
        eventName,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Payment successful!");
      navigate(`/friend/${id}`); // Redirect back to friend details   
    } catch (error) {
      console.error("Payment error:", error);
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <form className="payment-form">
      <h2>Make a Payment</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <label>Event Name:</label>
      <input
        type="text"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        placeholder="Enter event name"
      />
      <label>Amount:</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button className="payment-btn"   onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay"}
      </button>
    
      </form>
    </div>
  );
};

export default PaymentPage;
