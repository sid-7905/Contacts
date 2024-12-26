import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const defaultImage =
"https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg";

const Form = ({ contacts }) => {
  const [formData, setFormData] = useState({
    image: defaultImage,
    name: "",
    phone: "",
    altNumber: "",
    email: "",
    address: "",
  });

const [preview, setPreview] = useState(defaultImage); // For image preview

// Handle file input change
const handleImageChange = (e) => {
  const file = e.target.files[0]; // Get the selected file
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result; // Get the data URL of the image
      setPreview(result); // Update the preview
      setFormData((prevData) => ({ ...prevData, image: result })); // Update formData with the image
    };
    reader.readAsDataURL(file); // Read the file as a data URL
  }
};


  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email) {
      setError("Please fill in all required fields (Name, Phone, Email).");
      console.log({ error });
      return;
    }


    try {
      const response = await axios.post("http://localhost:5000/api/user/contacts", formData,{
        withCredentials: true, // Include cookies and credentials
      });
      alert(response.data.message); // Notify user of success
      setFormData({
        img: "",
        name: "",
        phone: "",
        altNumber: "",
        email: "",
        address: "",
      });
    } catch (err) {
      setError("Failed to save contact. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="sm:p-4 flex flex-col items-center sm:bg-[#2d2a2a] shadow-2xl w-full h-full">
        <form
          method="post"
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 p-4 bg-[#171717] rounded-2xl w-full"
        >
          <div>
            {error && (
              <div className="bg-red-500 text-white p-4 rounded-lg text-center mt-4">
                {error}
              </div>
            )}
          </div>
          <p className="text-center text-[#64ffda] text-xl">Add Contact</p>

          {/* Image Preview */}
          {preview && (
            <div className="flex items-end">
              <img
                src={preview}
                alt="Profile Preview"
                style={{ width: "150px", height: "150px", borderRadius: "50%" }}
              />
              <div className="relative flex items-center justify-center gap-2 p-3 bg-[#1d2526] rounded-xl shadow-xl w-10">
                <input
                  className="fas fa-image bg-transparent border-none outline-none w-full text-[#2fb1bc]"
                  type="file"
                  capture="user"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          )}
          <div className="flex items-center justify-center gap-2 p-4 bg-[#1b1b1b] rounded-xl shadow-xl w-full max-w-md">
            <i className="fas fa-user text-[#64ffda]"></i>
            <input
              required
              placeholder="Name"
              className="bg-transparent border-none outline-none w-full text-[#ccd6f6] pl-4"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center gap-2 p-4 bg-[#1b1b1b] rounded-xl shadow-inner w-full max-w-md">
            <i className="fas fa-phone text-[#64ffda]"></i>
            <input
              required
              placeholder="Phone Number"
              className="bg-transparent border-none outline-none w-full text-[#ccd6f6] pl-4"
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center gap-2 p-4 bg-[#1b1b1b] rounded-xl shadow-inner w-full max-w-md">
            <i className="fas fa-phone text-[#64ffda]"></i>
            <input
              placeholder="Aternate Number"
              className="bg-transparent border-none outline-none w-full text-[#ccd6f6] pl-4"
              type="number"
              name="altNumber"
              value={formData.altNumber}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center gap-2 p-4 bg-[#1b1b1b] rounded-xl shadow-inner w-full max-w-md">
            <i className="fas fa-message text-[#64ffda]"></i>
            <input
              required
              placeholder="Email"
              className="bg-transparent border-none outline-none w-full text-[#ccd6f6] pl-4"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center gap-2 p-4 bg-[#1b1b1b] rounded-xl shadow-inner w-full max-w-md">
            <i className="fas fa-home text-[#64ffda]"></i>
            <input
              placeholder="Address"
              className="bg-transparent border-none outline-none w-full text-[#ccd6f6] pl-4"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleSubmit}
              type="submit"
              className="cursor-pointer py-3 px-6 rounded-xl border border-[#64ffda] text-[#64ffda] font-bold transition-all duration-300 hover:bg-[#64ffda] hover:text-black hover:shadow-inner"
            >
              Add Contact
            </button>
            <Link
              to="/mycontacts"
              className="cursor-pointer py-3 px-6 rounded-xl border border-[#64ffda] text-[#64ffda] font-bold transition-all duration-300 hover:bg-[#64ffda] hover:text-black hover:shadow-inner"
            >
              See Contacts
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
