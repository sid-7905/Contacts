import React, { useState } from "react";
import axios from "axios";
import Navbar from "./navbar";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Form = () => {
  const [formData, setFormData] = useState({
    file: "",
    name: "",
    phone: "",
    altNumber: "",
    email: "",
    address: "",
  });

  const [previewImage, setPreviewImage] = useState(null);

  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result; // Get the data URL of the image
        setPreviewImage(result); // Update the previewImage state
        setFormData((prevData) => ({ ...prevData, file: file })); // Update formData with the image
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

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to add a contact");
      return;
    }

    try {

      const formdata = new FormData();
      formdata.append("file", formData.file);
      formdata.append("name", formData.name);
      formdata.append("phone", formData.phone);
      formdata.append("altNumber", formData.altNumber);
      formdata.append("email", formData.email);
      formdata.append("address", formData.address);
      

      // console.log(formData);
      const response = await axios.post(
        `${backendUrl}/api/user/contacts`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true, // Include cookies and credentials
        }
      );
      console.log(response.data);
      // alert(response.data.message); // Notify user of success
      setFormData({
        file: "",
        name: "",
        phone: "",
        altNumber: "",
        email: "",
        address: "",
      });
      setPreviewImage(null);
      setError("");
    } catch (err) {
      setError("Failed to save contact. Please try again.");
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-full min-h-screen">
        <div className="flex flex-col items-center justify-center bg-slate-900 shadow-2xl w-full h-full min-h-screen">
          <form
            method="post"
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4 bg-[#171717] w-full md:w-1/2"
          >
            <p className="text-center text-[#64ffda] text-xl">Add Contact</p>

            <div className="flex items-end">
              {previewImage  && (
                <div>
                  <label htmlFor="file-input" onClick={
                    () => {
                      setPreviewImage(null);
                      setFormData((prevData) => ({ ...prevData, file: "" }));
                    }
                  }>
                    <i className="fas fa-x text-[#64ffda] cursor-pointer"></i>
                  </label>
                </div>
              )}
              <img
                src={previewImage ? previewImage : `${backendUrl}/images/uploads/default.jpg`}
                alt="Profile Preview"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                }}
              />
              <div className="relative flex items-center justify-center gap-2 p-3 mt-4 bg-[#1d2526] rounded-xl shadow-xl w-10">
                <input
                  className="fas fa-image bg-transparent border-none outline-none w-full text-[#2fb1bc]"
                  type="file"
                  capture="user"
                  accept="image/*"
                  name="file"
                  onChange = {handleImageChange}
                />
              </div>
            </div>
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
                Add
              </button>
            </div>
            <div>
              {error && (
                <div className="bg-red-500 text-white p-4 rounded-lg text-center mt-4">
                  {error}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
