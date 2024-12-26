const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  image: String,
  name: { type: String, required: true },
  phone: { type: String, required: true },
  altNumber: String,
  email: { type: String, required: true },
  address: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
