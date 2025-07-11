import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Allevent.css";
import axios from "axios";
const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      if (!token) {
          throw new Error("No authentication token found");
      }
      console.log("token of the login user :",token)
    axios
    .get("https://hisabkitab-2.onrender.com/event/all" , {
      headers: { Authorization: `Bearer ${token}` }}
    ) // Using axios to make the GET request
    .then((response) => {
      console.log("Fetched events:", response.data); // The data will be in response.data
      setEvents(response.data.events || []); // Assuming response.data.events contains the events
      setError(null); // Reset error if the request was successful
    })
    .catch((error) => {
      console.error("Error fetching events:", error);
      setError("Failed to fetch events. Please try again later."); // Handle error
    })
    .finally(() => {
      setLoading(false); // Set loading to false once the request is done
    });
  }
    fetchEvents();
  }, []);
        
  


  return (
    <div className="events-container">
      <h2>All Events</h2>

      {/* New Event Button */}
      <div className="new-event-container">
        <Link to="/create-event" className="new-event-btn">
          New Event
        </Link>
      </div>

      {loading && <p>Loading events...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && events.length > 0 ? (
        <div className="event-list">
          {events.map(event => (
            <Link to={`/event/${event._id}`} key={event._id} className="event-card" >
              {event.name}
            </Link>
          ))}
        </div>
      ) : (
        !loading && !error && <p>No events found</p>
      )}
    </div>
  );
};

export default Events;
