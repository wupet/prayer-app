import { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function PrayerForm({ onRequestCreated }) {
  const [form, setForm] = useState({
    name: "",
    request: "",
    email: "",
    phone: ""
  });

  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post(`${API_URL}/request`, form);
      onRequestCreated(response.data);

      setForm({
        name: "",
        request: "",
        email: "",
        phone: ""
      });
    } catch (error) {
      console.error("Error creating prayer request:", error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="prayer-form">
      <h2>Submit a Prayer Request</h2>

      <input
        type="text"
        name="name"
        placeholder="Name (optional)"
        value={form.name}
        onChange={handleChange}
      />

      <textarea
        name="request"
        placeholder="Enter your prayer request"
        value={form.request}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email (optional)"
        value={form.email}
        onChange={handleChange}
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone (optional)"
        value={form.phone}
        onChange={handleChange}
      />

      <button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
}

export default PrayerForm;