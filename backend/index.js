const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;
const Frontend_URL = process.env.FRONTEND_URL;

console.log(Frontend_URL);
// Middleware
app.use(
  cors({
    origin: Frontend_URL , // Frontend URL
    credentials: true, // Allow cookies and credentials
  })
);
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Serve static files
app.use("/public", express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => res.send("Server is running!"));

// User Routes
const UserRoute = require("./routes/userRoute");
app.use("/api/user", UserRoute);

app.listen( PORT || 5000, () => console.log("Server is running on port 5000"));
