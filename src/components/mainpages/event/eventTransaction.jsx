import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./EventTransaction.css";

const EventTransactions = () => {
  const { id } = useParams(); // Get event ID from URL
  const [transactions, setTransactions] = useState([]);
  const [eventName, setEventName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        if (!token) {
            throw new Error("No authentication token found");
        }
        console.log("token of the login user from /event/:id :",token)
        const response = await axios.get(`https://hisabkitab-2.onrender.com/event/${id}` , {
              headers: { Authorization: `Bearer ${token}` }
           });
        if (response.data.event) {
          setEventName(response.data.event.name); // Get event name
          setTransactions(response.data.event.transactions || []);
        } else {
          setTransactions([]);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Failed to fetch transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [id]);

  return (
    <div className="transactions-container">
      <h2>Transactions for {eventName || "Event"}</h2>

      {loading && <p>Loading transactions...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && transactions.length > 0 ? (
        <ul className="transactions-list">
          {transactions.map(transaction => (
            <li key={transaction._id} className="transaction-card">
              <strong>Amount:</strong> {transaction.amount} <br />
              <strong>Paid by:</strong> {transaction.friend?.name || "Unknown"} <br />
              <strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        !loading && !error && <p>No transactions found.</p>
      )}
    </div>
  );
};

export default EventTransactions;
