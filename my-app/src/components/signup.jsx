import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {

  const defaultImage =
    "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg";
  // const [profileImage, setProfileImage] = useState(null); // To store the selected file
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


  const [formData, setFormData] = useState({
    image: defaultImage,
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.email || !formData.password) {
      setError("Please fill in all required fields (Name, Phone, Email, Password).");
      console.log({ error });
      return;
    }

    if(formData.password !== formData.confirmPassword){
      setError("Passwords do not match");
      return;
    }

    try {
      // console.log(formData);  
      const response = await axios.post("http://localhost:5000/api/user/register", formData,{
        withCredentials: true, // Include cookies and credentials
      });
      localStorage.setItem("token", response.data.token);
      // console.log(response);
      alert("user added successfully"); // Notify user of success
      setFormData({
        image: defaultImage,
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
      setPreview(defaultImage);
      setError("");
      window.location.replace("http://localhost:3000/mycontacts");
    } catch (err) {
      console.log(err.response);
      setError(err.response.data.message); 
      console.error(err);
    }
  };

  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="flex items-center justify-center h-screen max-h-full">
      <div className="p-2 flex flex-col items-center bg-[#2d2a2a] shadow-2xl w-full h-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 p-2 bg-[#171717] rounded-2xl w-full"
        >
          <div>
            {error && (
              <div className="bg-red-500 text-white p-4 rounded-lg text-center mt-4">
                {error}
              </div>
            )}
          </div>
          <p className="text-center text-[#64ffda] text-3xl">Register</p>

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
              placeholder="Full Name"
              className="bg-transparent border-none outline-none w-full text-[#ccd6f6] pl-4"
              type="text"
              name="name"
              value={formData.name}
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
            <i className="fas fa-user text-[#64ffda]"></i>
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
            <i className="fas fa-lock text-[#64ffda]"></i>
            <input
              required
              placeholder="Password"
              className="bg-transparent border-none outline-none w-full text-[#ccd6f6] pl-4"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center gap-2 p-4 bg-[#1b1b1b] rounded-xl shadow-inner w-full max-w-md">
            <i className="fas fa-lock text-[#64ffda]"></i>
            <input
              required
              placeholder="Confirm Password"
              className="bg-transparent border-none outline-none w-full text-[#ccd6f6] pl-4"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-evenly items-center gap-4">
            <button
              onClick={handleSubmit}
              type="submit"
              className="cursor-pointer py-3 px-6 rounded-xl border border-[#64ffda] text-[#64ffda] font-bold transition-all duration-300 hover:bg-[#64ffda] hover:text-black hover:shadow-inner"
            >
              SignUp
            </button>
            <div className="text-white flex flex-col text-sm">
              Already have an account?
              <Link className="cursor-pointer text-[#64ffda] font-bold transition-all duration-300  hover:text-white"  to="/login" >Login</Link>
            </div>
          </div>
        </form>
        <Link to="/" className="text-zinc-400 m-4 border p-2 rounded-lg bg-slate-800">Home</Link>
      </div>
    </div>
  );
};

export default SignUp;
