import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function EditForm({contacts}) {

  const id = window.location.pathname.split("/")[2];
  // console.log(id);
  const contact = contacts.find((c) => c._id === id);
  // console.log(contact);

  const [previewImage, setPreviewImage] = useState(`/public/images/uploads/${contact.image}`);

  const [formData, setFormData] = useState({
    file: contact.image,
    name: contact.name,
    phone: contact.phone,
    altNumber: contact.altNumber,
    email: contact.email,
    address: contact.address,
  });

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

    try {

      const formdata = new FormData();
      if (formData.file instanceof File) {
        // Append the file only if it's an actual file
        formdata.append("file", formData.file);
      }
      formdata.append("name", formData.name);
      formdata.append("phone", formData.phone);
      formdata.append("altNumber", formData.altNumber);
      formdata.append("email", formData.email);
      formdata.append("address", formData.address);
      

      console.log(formData);
      const response = await axios.put(
       `/api/user/contacts/${id}`,
        formdata,
        {
          withCredentials: true, // Include cookies and credentials
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
          
      );
      console.log(response.data);
      // alert(response.data.message); // Notify user of success
      setError("");
      window.location.href = "/mycontacts";

    } catch (err) {
      setError("Failed to save contact. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center bg-slate-900  z-10">
      <div className="sm:p-8 flex flex-col items-center gap-4 shadow-2xl w-full md:w-1/2 lg:w-2/5">
        <h2 className="text-lg text-white font-bold mb-4">Edit Contact</h2>
        <form
          method="put"
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 p-4 bg-[#171717] rounded-2xl w-full"
        >
          <div className="flex items-end">
              {previewImage!==`/public/images/uploads/default.jpg`  && (
                <div>
                  <label htmlFor="file-input" onClick={() => {
                    setPreviewImage(`/public/images/uploads/default.jpg`);
                    setFormData((prevData) => ({ ...prevData, file: "default.jpg" }));
                  }}>
                    <i className="fas fa-x text-[#64ffda] cursor-pointer"></i>
                  </label>
                </div>
              )}
              <img
                src={previewImage}
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
          <div className="flex items-center justify-center p-4 bg-[#1b1b1b] rounded-xl shadow-xl w-full">
            <i className="fas fa-user text-[#64ffda]"></i>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="bg-transparent border-none outline-none w-full text-[#ccd6f6] pl-4"
            />
          </div>
          <div className="flex items-center justify-center  p-4 bg-[#1b1b1b] rounded-xl shadow-xl  w-full">
            <i className="fas fa-phone text-[#64ffda]"></i>
            <input
              name="phone"
              type="number"
              value={formData.phone}
              onChange={handleChange}
              className="bg-transparent border-none outline-none w-full text-[#ccd6f6] pl-4"
            />
          </div>
          <div className="flex items-center justify-center p-4 bg-[#1b1b1b] rounded-xl shadow-xl  w-full">
            <i className="fas fa-phone text-[#64ffda]"></i>
            <input
              name="altNumber"
              type="number"
              value={formData.altNumber}
              onChange={handleChange}
              className="bg-transparent border-none outline-none w-full text-[#ccd6f6] pl-4"
            />
          </div>
          <div className="flex items-center justify-center p-4 bg-[#1b1b1b] rounded-xl shadow-xl w-full">
            <i className="fas fa-message text-[#64ffda]"></i>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent border-none outline-none w-full text-[#ccd6f6] pl-4"
            />
          </div>
          <div className="flex items-center justify-center gap-2 p-4 bg-[#1b1b1b] rounded-xl shadow-xl w-full">
            <i className="fas fa-home text-[#64ffda]"></i>
            <input
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className="bg-transparent border-none outline-none w-full text-[#ccd6f6] pl-4"
            />
          </div>
          <div className="flex justify-end gap-2">
            <NavLink
              to="/mycontacts"
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </NavLink>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Save
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
  );
}
