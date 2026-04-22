import { useEffect, useState } from "react";
import axios from "axios";
import PrayerCard from "./components/PrayerCard";
import PrayerForm from "./components/PrayerForm";
import "./App.css";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchRequests() {
    try {
      const response = await axios.get(`${API_URL}/requests`);
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching prayer requests:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  function handleRequestCreated(newRequest) {
    setRequests((prevRequests) => [newRequest, ...prevRequests]);
  }

  return (
    <div className="app">
      <h1>Prayer Requests</h1>

      <PrayerForm onRequestCreated={handleRequestCreated} />

      <h2>Current Requests</h2>

      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p>No prayer requests yet.</p>
      ) : (
        <div className="request-list">
          {requests.map((item) => (
            <PrayerCard key={item.id} request={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;