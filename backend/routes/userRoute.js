const express = require("express");

const UserModel = require("../models/User");
const ContactModel = require("../models/Contacts");

const router = express.Router();

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");
const User = require("../models/User");
router.use(cookieParser());

//get all users
router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//add a new user
router.post("/register", async (req, res) => {
  console.log(req.body);
  const {image, name, email, phone, password, confirmPassword } = req.body;

  // Check if email already exists
  const existingUser = await UserModel.findOne({ email: email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) throw err;
      const user = new UserModel({
        image,
        name,
        email,
        phone,
        password: hash,
      });

      let token = jwt.sign({email: email, userID: user._id}, "secretkey");
      // console.log(token);
      res.cookie("token", token,);

      try {
        const savedUser = await user.save();
        // console.log(savedUser);
        res.json({
          status: "success",
          message: "Login successful",
          token: token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });
  });
});


//login a user
router.post("/login", async (req, res) => {

  let token = req.cookies.token;
  console.log(token);

  if (token) return res.status(401).json({ message: 'You are already logined, kindly logout first' });

  const { email, password } = req.body;

  // Check if email exists
  const user = await UserModel.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ message: "Email does not exist, Kindly check email or register" });
  }

  // Check if password is correct
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) throw err;
    if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

    let token = jwt.sign({email: email, userID: user._id}, "secretkey");
    // console.log(token);
    res.cookie("token", token);

    res.json({
      status: "success",
      message: "Login successful",
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  });
}
);


//logout a user
router.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.json({ message: "Logged out successfully" });
});


//middleware to authenticate token
function authenticateToken(req, res, next) {
  // console.log(req.cookies);
  let token = req.cookies.token;
  // console.log(token);

  if (!token) return res.status(401).json({ error: 'Access token missing' });

    const data = jwt.verify(token, "secretkey");
    req.user = data; // Attach data to request
    // console.log(data);
    next();
}

// Get all contacts
router.get("/contacts" ,authenticateToken,  async (req, res) => {

  const userid = req.user.userID;
  // console.log(userid);
  const contacts = await ContactModel.find({ user: userid });
  // console.log(contacts);

  try {
    // const contacts = await ContactModel.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new contact
router.post("/contacts", authenticateToken, async (req, res) => {
  const { image, name, phone, altNumber, email, address } = req.body;
  const userID = req.user.userID;
  console.log(userID);

  const contact = new ContactModel({
    image,
    name,
    phone,
    altNumber,
    email,
    address,
    user: userID,
  });

  const currentUser = await UserModel
  .findById(userID);

  currentUser.contacts.push(contact);
  await currentUser.save();

  try {
    const savedContact = await contact.save();
    res.status(201).json(savedContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a contact
router.delete("/contacts/:id", async (req, res) => {
  try {
    await ContactModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
 
// PUT API Route to update a contact
router.put("/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body; // Contains updated contact details
    const updatedContact = await ContactModel.findByIdAndUpdate(id, updatedData, {
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