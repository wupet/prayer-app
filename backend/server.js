require("dotenv").config();// loads in data from .env file

const express = require("express");
const cors = require("cors");
const pool = require("./src/db");
const prayerRoutes = require("./src/routes/prayers");

const app = express();

app.use(cors()); // allows the frontend and back end to talk to each other despite varying urls
app.use(express.json()); // allows express to read json request bodies

app.get("/", (req, res) => {
  res.send("Prayer API Running");
});

app.get("/test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Database connection failed");
  }
});

app.use("/api", prayerRoutes); // all routes with /api go to prayerroutes (./src/routes/prayers) 

const PORT = process.env.PORT || 5000; // you might be able to run on ports other than 5000 but itll be weird

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});