const express = require("express");
const Contact = require("../models/Contacts");
const router = express.Router();

// Get all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new contact
router.post("/", async (req, res) => {
  const { image, name, phone, altNumber, email, address } = req.body;

  const contact = new Contact({
    image,
    name,
    phone,
    altNumber,
    email,
    address,
  });

  try {
    const savedContact = await contact.save();
    res.status(201).json(savedContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a contact
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
 
// PUT API Route to update a contact
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body; // Contains updated contact details
    const updatedContact = await Contact.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
    });

    // console.log("updatedContact");

    if (!updatedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).json({ message: "Contact updated successfully!", updatedContact });
  } catch (error) {
    res.status(500).json({ error: "Failed to update contact" });
  }
});


module.exports = router;
