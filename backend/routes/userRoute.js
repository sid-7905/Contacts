const express = require("express");

const UserModel = require("../models/User");
const ContactModel = require("../models/Contacts");

const router = express.Router();

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");
const upload = require("../config/multerconfig");
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
router.post("/register", upload.single("file"), async (req, res) => {
  // console.log(req.body);
  const {name, email, phone, password } = req.body;

  // Check if email already exists
  const existingUser = await UserModel.findOne({ email: email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) throw err;
      const user = new UserModel({
        image: req.file.filename,
        name,
        email,
        phone,
        password: hash,
      });

      try {
        await user.save();
        // console.log(savedUser);  
        let token = jwt.sign({email: email, userID: user._id}, "secretkey");
      // console.log(token);
        res.cookie("token", token,);

        res.json({
          status: "success",
          message: "Login successful",
          token: token,
          user: {
            id: user._id,
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
  // console.log(token);

  if (token) return res.status(401).json({ message: 'You are already logined, kindly logout first' });

  const { email, password } = req.body;

  // Check if email exists
  const user = await UserModel.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ message: "Email does not exist, Kindly check email or register" });
  }


  // Check if password is correct
  try {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

    let token = jwt.sign({ email: email, userID: user._id }, "secretkey");
    // console.log(token);
    res.cookie("token", token);
    const data = {
      status: "success",
      message: "Login successful",
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };
    // console.log(data);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
);

// Get user profile
router.get('/profile', authenticateToken, (req, res) => {
  const { userID } = req.user;
  // console.log(userID);
  UserModel.findById(userID)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to fetch user' });
    });
});

// logout a user
router.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.json({ message: "Logged out successfully" });
});

//middleware to authenticate token
function authenticateToken(req, res, next) {
  // console.log(req.body);
  let token = req.cookies.token;
  // console.log(token);

  if (!token) return res.status(401).json({ error: 'Access token missing' });

  jwt.verify(token, "secretkey", (err, data) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = data; // Attach data to request
    // console.log(data);
    next();
  });
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
router.post("/contacts", authenticateToken, upload.single("file"), async (req, res) => {
  try {
    // Extract data from request body
    const { name, phone, altNumber, email, address } = req.body;
    const userID = req.user.userID;

    // Log the body and file for debugging
    // console.log("Request Body:", req.body);
    // console.log("Uploaded File:", req.file);

    // Check if file was uploaded and use a fallback if not
    const image = req.file ? req.file.filename : 'default.jpg';  // Default image if no file is uploaded

    // Create a new contact
    const contact = new ContactModel({
      image,
      name,
      phone,
      altNumber,
      email,
      address,
      user: userID,
    });

    // Retrieve the current user by ID
    const currentUser = await UserModel.findById(userID);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the new contact to the user's contact list
    currentUser.contacts.push(contact);
    await currentUser.save();

    // Save the contact to the database
    const savedContact = await contact.save();

    // Respond with the saved contact
    res.status(201).json(savedContact);
  } catch (err) {
    // Log and respond with the error message
    console.error("Error saving contact:", err.message);
    res.status(400).json({ message: err.message });
  }
});


router.delete("/contacts/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const userID = req.user.userID;

  const contact = await ContactModel.findByIdAndDelete(id);

  if (!contact) {
    return res.status(404).json({ error: "Contact not found" });
  }

  // Remove contact ID from user's contacts array
  await UserModel.findByIdAndUpdate(userID, {
    $pull: { contacts: id },
  });

  res.status(200).json({ message: "Contact deleted successfully!" });
});

 
// PUT API Route to update a contact
router.put("/contacts/:id", upload.single("file"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, altNumber, email, address } = req.body;

    // Log the incoming data for debugging purposes
    // console.log("Request Body:", req.body);
    // console.log("Uploaded File:", req.file);

    // Check if a file is uploaded
    const image = req.file ? req.file.filename : 'default.jpg'; // Default to 'default.jpg' if no file is uploaded

    const updatedData = {
      image,
      name,
      phone,
      altNumber,
      email,
      address,
    };

    // Update the contact in the database using the provided ID
    const updatedContact = await ContactModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    // Check if the contact was found and updated
    if (!updatedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    // Respond with the updated contact data
    res.status(200).json({ message: "Contact updated successfully!", updatedContact });
  } catch (error) {
    // Handle any errors that occur
    console.error("Error updating contact:", error);
    res.status(500).json({ error: "Failed to update contact" });
  }
});


module.exports = router;