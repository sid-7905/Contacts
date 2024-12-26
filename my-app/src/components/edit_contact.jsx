import { useState } from "react";
import axios from "axios";

export default function EditForm({ contact, contacts, setContacts, setOpenEdit }) {
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);
  const [email, setEmail] = useState(contact.email);
  const [address, setAddress] = useState(contact.address);
  const [altNumber, setAltNumber] = useState(contact.altNumber);


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    try {
      // Call the backend API to update the contact
      // console.log(contact._id);
      const response = await axios.put(`http://localhost:5000/api/user/contacts/${contact._id}`, {
        name,
        phone,
        altNumber,
        email,
        address,
      });
  
      // console.log(response.data);
      // Update the contacts in the frontend
      const updatedContact = response.data.updatedContact;
      const updatedContacts = contacts.map((c) =>
        c._id === updatedContact._id ? updatedContact : c
      );
      setContacts(updatedContacts);
  
      console.log("Contact updated successfully:", updatedContact);
      setOpenEdit(false); // Close the edit form
    } catch (error) {
      console.error("Error updating contact:", error);
      alert("Failed to update contact. Please try again.");
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50  backdrop-blur-sm flex items-center justify-center bg-black/50 z-10">
      <div className="sm:p-8 flex flex-col items-center gap-4 sm:bg-[#2d2a2a] shadow-2xl w-full max-w-md">
        <h2 className="text-lg text-white font-bold mb-4">Edit Contact</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 p-4 bg-[#171717] rounded-2xl w-full">
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
            <button
              type="button"
              onClick={() => setOpenEdit(false)}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
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
