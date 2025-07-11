
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "./FriendDetail.css";

// const FriendDetails = () => {
//   const { id } = useParams(); // Get friend ID from URL
//   const [friend, setFriend] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchFriendDetails = async () => {
//       try {
//         // 🔹 Fetch Friend Info (Now includes transactions)
//         const token = localStorage.getItem("token"); // Retrieve token from localStorage
//         if (!token) {
//             throw new Error("No authentication token found");
//         }
//         console.log("token of the login user from freinds/:id:",token)
//         const { data } = await axios.get(`http://localhost:8080/friends/${id}`, {
//            headers: { Authorization: `Bearer ${token}` }
//         });
//         setFriend(data.friend);
//       } catch (error) {
//         console.error("Error fetching friend details:", error);
//         setError("Failed to fetch friend details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFriendDetails();
//   }, [id]);

//   // Calculate Total Balance Across All Events
//   const totalBalance = friend?.events?.reduce((sum, e) => sum + (e.totalGiven - e.totalReceived), 0) || 0;

//   return (
//     <div className="friend-details-container">
//       <h2>Friend Details</h2>

//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {friend && (
//         <div className="friend-info">
//           <h3>Name: {friend.name}</h3>
//           <p>Phone: {friend.phone}</p>
          
//           <h4>Event-wise Transactions:</h4>
//           {friend.events.length > 0 ? (
//             <ul>
//               {friend.events.map((e) => {
//                 const eventBalance = e.totalGiven - e.totalReceived;
//                 return (
//                   <li key={e.eventId} className="event-card">
//                     <strong>Event:</strong> {e.eventName}  
//                     <br />
//                     <strong>Given:</strong> ₹{e.totalGiven}  
//                     <br />
//                     <strong>Received:</strong> ₹{e.totalReceived}
//                     <br />
//                     {/* <strong>Balance:</strong> 
//                     <span style={{ color: eventBalance < 0 ? "red" : "green", fontWeight: "bold" }}>
//                       ₹{Math.abs(eventBalance)}
//                     </span> */}
//                   </li>
//                 );
//               })}
//             </ul>
//           ) : (
//             <p>No events found.</p>
//           )}

//           {/* 🔹 Display Total Balance Across All Events */}
//           <h3>Total Balance:</h3>
//           <p style={{ color: totalBalance < 0 ? "red" : "green", fontWeight: "bold" }}>
//             ₹{Math.abs(totalBalance)}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FriendDetails;


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./FriendDetail.css";

const FriendDetails = () => {
  const { id } = useParams(); // Get friend ID from URL
  const navigate = useNavigate(); // Initialize navigation hook
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriendDetails = async () => {
      try {

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }
        const { data } = await axios.get(`https://hisabkitab-2.onrender.com/friends/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFriend(data.friend);
      } catch (error) {
        console.error("Error fetching friend details:", error);
        setError("Failed to fetch friend details.");
      } finally {
        setLoading(false);
      }
    };

    fetchFriendDetails();
  }, [id]);

  // Calculate Total Balance Across All Events
  const totalBalance = friend?.events?.reduce((sum, e) => sum + (e.totalGiven - e.totalReceived), 0) || 0;

  // 🔹 Handle Navigation to /pay
  const handlePaymentClick = () => {
    navigate(`/friend/${id}/pay`); // Redirects to "currenturl/pay"
  };

  return (
    <div className="friend-details-container">
      <h2>Friend Details</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {friend && (
        <div className="friend-info">
          <h3>Name: {friend.name}</h3>
          <p>Phone: {friend.phone}</p>

          <h4>Event-wise Transactions:</h4>
          <div className="event-list"> 
            {friend.events.length > 0 ? (
              friend.events.map((e) => (
                <div key={e.eventId} className="event-card">
                  <strong>Event:</strong> {e.eventName || "Unnamed Event"}
                  <br />
                  <strong>Given:</strong> ₹{e.totalGiven}
                  <br />
                  <strong>Received:</strong> ₹{e.totalReceived}
                </div>
              ))
            ) : (
              <p>No events found.</p>
            )}
          </div>

          

          {/* 🔹 Display Total Balance Across All Events */}
          <h3>Total Balance:</h3>
          <p style={{ color: totalBalance < 0 ? "red" : "green", fontWeight: "bold" }}>
            ₹{Math.abs(totalBalance)}
          </p>

          {/* 💰 Payment Section */}
          <div className="payment-section">
            <button onClick={handlePaymentClick} className="pay-button">
              Pay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendDetails;
