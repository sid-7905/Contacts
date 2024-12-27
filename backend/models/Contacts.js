const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  image: { type: String, required: true, default: "default.jpg" },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  altNumber: String,
  email: { type: String, required: true },
  address: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
