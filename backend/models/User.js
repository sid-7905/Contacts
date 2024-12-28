const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
    default: "default.jpg",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
