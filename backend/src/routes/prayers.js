const express = require("express");
const router = express.Router();
const pool = require("../db");

// Submit prayer request
router.post("/request", async (req, res) => {
  try {
    const { name, request, email, phone } = req.body;

    const result = await pool.query(
      `INSERT INTO prayer_requests (name, request, email, phone)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, request, email, phone]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get all prayer requests
router.get("/requests", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM prayer_requests ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Pray for request
router.post("/pray/:id", async (req, res) => {
  try {
    const { name, message } = req.body;
    const { id } = req.params;

    const result = await pool.query(
      `INSERT INTO prayers (prayer_request_id, prayed_by_name, message)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [id, name, message]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Mark answered
router.patch("/answered/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      `UPDATE prayer_requests 
       SET status = 'answered' 
       WHERE id = $1`,
      [id]
    );

    res.json({ message: "Marked answered" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;