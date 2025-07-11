import { useNavigate } from "react-router-dom";
import "./home.css"
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to Payment Tracker</h1>
      <button className="new-friend-btn" onClick={() => navigate("/new-friend")}>
        New Friend
      </button>
    </div>
  );
};

export default Home;
