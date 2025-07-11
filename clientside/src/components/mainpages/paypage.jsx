



import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./paypage.css"; // Import CSS

const PayPage = () => {
  const restoreOriginalFormat = (formattedName) => {
    return formattedName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const { formattedEventName, formattedFriendName, friendId } = useParams();
  const originalEventName = restoreOriginalFormat(formattedEventName);
  const originalFriendName = restoreOriginalFormat(formattedFriendName);

  const [friend, setFriend] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [payUrl, setPayUrl] = useState(""); // ✅ Moved `payUrl` to state

  useEffect(() => {
    axios
      .get(`https://hisabkitab-2.onrender.com/friends/${friendId}`)
      .then((res) => {
        setFriend(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching friend:", err);
        setError("Failed to fetch friend details.");
        setLoading(false);
      });
  }, [friendId]);

  // ✅ Update `payUrl` only when amount or friend changes
  useEffect(() => {
    if (amount && friend) {
      setPayUrl(
        `upi://pay?pa=manurana26770@oksbi&pn=${encodeURIComponent(friend.name)}&am=${amount}&cu=INR&tn=Payment`
      );
    }
  }, [amount, friend]);

  const handleUPIPayment = () => {
    if (!amount || amount <= 0 || isNaN(amount)) {
      alert("Please enter a valid amount");
      return;
    }
    window.location.href = payUrl;
  };

  return (
    <div className="pay-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : friend ? (
        <div>
          <h2>Pay {originalFriendName}</h2>
          <p>Event: {originalEventName}</p>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              if (!isNaN(value) && Number(value) >= 0) {
                setAmount(value);
              }
            }}
          />
          <button onClick={handleUPIPayment}>Pay via UPI</button>

         
        </div>
      ) : (
        <p>Friend not found</p>
      )}
    </div>
  );
};

export default PayPage;
