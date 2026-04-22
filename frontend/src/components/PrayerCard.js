import { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function PrayerCard({ request }) {
  const [status, setStatus] = useState(request.status);
  const [prayed, setPrayed] = useState(false);
  const [loadingPray, setLoadingPray] = useState(false);
  const [loadingAnswered, setLoadingAnswered] = useState(false);

  async function handlePray() {
    setLoadingPray(true);

    try {
      await axios.post(`${API_URL}/pray/${request.id}`, {
        name: "",
        message: ""
      });

      setPrayed(true);
    } catch (error) {
      console.error("Error recording prayer:", error);
    } finally {
      setLoadingPray(false);
    }
  }

  async function handleMarkAnswered() {
    setLoadingAnswered(true);

    try {
      await axios.patch(`${API_URL}/answered/${request.id}`);
      setStatus("answered");
    } catch (error) {
      console.error("Error marking prayer answered:", error);
    } finally {
      setLoadingAnswered(false);
    }
  }

  return (
    <div className="prayer-card">
      <p><strong>Name:</strong> {request.name || "Anonymous"}</p>
      <p><strong>Request:</strong> {request.request}</p>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Email:</strong> {request.email || "Not provided"}</p>
      <p><strong>Phone:</strong> {request.phone || "Not provided"}</p>

      <div className="button-row">
        <button onClick={handlePray} disabled={loadingPray || prayed}>
          {loadingPray ? "Submitting..." : prayed ? "Prayer Recorded" : "I Prayed"}
        </button>

        {status !== "answered" && (
          <button onClick={handleMarkAnswered} disabled={loadingAnswered}>
            {loadingAnswered ? "Updating..." : "Mark Answered"}
          </button>
        )}
      </div>
    </div>
  );
}

export default PrayerCard;