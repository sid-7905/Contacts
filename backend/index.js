const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true, // Allow cookies and credentials
}));
app.use(bodyParser.json());

// MongoDB Connection
mongoose
.connect("mongodb://localhost:27017/ContactApp")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.get("/", (req, res) => res.send("Server is running!"));

// User Routes
const UserRoute = require("./routes/userRoute");
app.use("/api/user", UserRoute);

app.listen(5000, () => console.log("Server is running on port 5000"));
