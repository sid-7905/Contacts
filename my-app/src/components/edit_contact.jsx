import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function EditForm({
  contacts,
  setContacts,
}) {

  const id = window.location.pathname.split("/")[2];
  // console.log(id);
  const contact = contacts.find((c) => c._id === id);
  // console.log(contact);

  const defaultImage =
  "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg";

  const [image, setImage] = useState(contact.image);
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);
  const [email, setEmail] = useState(contact.email);
  const [address, setAddress] = useState(contact.address);
  const [altNumber, setAltNumber] = useState(contact.altNumber);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result; // Get the data URL of the image
        setImage(result); // Update the image
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Call the backend API to update the contact
      // console.log(contact._id);
      const response = await axios.put(
        `http://localhost:5000/api/user/contacts/${contact._id}`,
        {
          image,
          name,
          phone,
          altNumber,
          email,
          address,
        }
      );

      // console.log(response.data);
      // Update the contacts in the frontend
      const updatedContact = response.data.updatedContact;
      const updatedContacts = contacts.map((c) =>
        c._id === updatedContact._id ? updatedContact : c
      );
      setContacts(updatedContacts);
      // console.log("Contact updated successfully:", updatedContact);
      // alert("Contact updated successfully!");
      window.location.href = "/mycontacts";


    } catch (error) {
      console.error("Error updating contact:", error);
      alert("Failed to update contact. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center bg-slate-900  z-10">
      <div className="sm:p-8 flex flex-col items-center gap-4 sm:bg-[#2d2a2a] shadow-2xl w-full max-w-md">
        <h2 className="text-lg text-white font-bold mb-4">Edit Contact</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 p-4 bg-[#171717] rounded-2xl w-full"
        >
          <div className="flex items-end">
            {image !== defaultImage && (
              <div>
                <label
                  htmlFor="file-input"
                  onClick={() => setImage(defaultImage)
                  }
                >
                  <i className="fas fa-x text-[#64ffda] cursor-pointer"></i>
                </label>
              </div>
            )}
            <img
              src={image}
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
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-center p-4 bg-[#1b1b1b] rounded-xl shadow-xl w-full">
            <i className="fas fa-user text-[#64ffda]"></i>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-[#ccd6f6] pl-4"
            />
          </div>
          <div className="flex items-center justify-center  p-4 bg-[#1b1b1b] rounded-xl shadow-xl  w-full">
            <i className="fas fa-phone text-[#64ffda]"></i>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-[#ccd6f6] pl-4"
            />
          </div>
          <div className="flex items-center justify-center p-4 bg-[#1b1b1b] rounded-xl shadow-xl  w-full">
            <i className="fas fa-phone text-[#64ffda]"></i>
            <input
              type="number"
              value={altNumber}
              onChange={(e) => setAltNumber(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-[#ccd6f6] pl-4"
            />
          </div>
          <div className="flex items-center justify-center p-4 bg-[#1b1b1b] rounded-xl shadow-xl w-full">
            <i className="fas fa-message text-[#64ffda]"></i>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-[#ccd6f6] pl-4"
            />
          </div>
          <div className="flex items-center justify-center gap-2 p-4 bg-[#1b1b1b] rounded-xl shadow-xl w-full">
            <i className="fas fa-home text-[#64ffda]"></i>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
        </form>
      </div>
    </div>
  );
}
