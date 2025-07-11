import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css"
export default function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        if (!userId || !token) {
            setError("User ID not found in localStorage.");
            setLoading(false);
            return;
        }

        axios.get(`https://hisabkitab-2.onrender.com/users/${userId}`, {headers: {
            Authorization: `Bearer ${token}`  // Send token in headers
        }})
            .then((response) => {
                setUser(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching user details:", error);
                setError("Failed to fetch user details.");
                setLoading(false);
            });

    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Total Received:</strong> {user.totalReceived}</p>
            <p><strong>Total Given:</strong> {user.totalGiven}</p>
        </div>
    );
}
