import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "./createEvent.css";
const EventForm = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // ✅ Use the navigate function


  const handleCreateEvent = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!userId) {
      setMessage("User ID not found. Please log in.");
      return;
    }
    
    try {
      const response = await axios.post("https://hisabkitab-2.onrender.com/event/createEvent", {
        eventName: eventName,
        eventdate: eventDate,
        userId: userId
      } , { headers: { Authorization: `Bearer ${token}` }}
    );

      setMessage(response.data.message || "Event created successfully!");
      setEventName("");
      setEventDate("");
      navigate("/allevent");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating event");
    }
  };

  return (
    <div className="event-form-container">
      
      
      <form onSubmit={handleCreateEvent} className="createEvent-from">
        <h2>Create an Event</h2>

        {message && <p className="message">{message}</p>}
        <div>
          <label>Event Name:</label>
          <input 
            type="text" 
            value={eventName} 
            onChange={(e) => setEventName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Event Date:</label>
          <input 
            type="date" 
            value={eventDate} 
            onChange={(e) => setEventDate(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="createEvent-button">Create Event</button>
      </form>
    </div>
  );
};

export default EventForm;
