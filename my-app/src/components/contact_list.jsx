import React from "react";
import Details from "./details";
import Edit_contact from "./edit_contact";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";
import { NavLink } from "react-router-dom";

function ContactList({ contacts, setContacts }) {
  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/user/contacts/${id}`,
        {
          withCredentials: true, // Include cookies and credentials
        }
      );
      const updatedContacts = contacts.filter((contact) => contact._id !== id);
      setContacts(updatedContacts); // Update the state to reflect the deleted contact
      alert("Contact deleted successfully!");
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact. Please try again.");
    }
  };

  const [openDetails, setopenDetails] = useState(null);
  const [open, setOpen] = useState(false);

  const handleDetails = (contact) => {
    setopenDetails(contact);
    setOpen(true); // Open the modal
  };

  useEffect(() => {
    // Fetch data from the backend
    axios
      .get("/api/user/contacts", {
        withCredentials: true, // Include cookies and credentials
      }) // Replace with your backend URL
      .then((response) => {
        setContacts(response.data); // Update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-slate-900 flex flex-col border-red-300 items-center h-full min-h-screen">
        <div className="flex flex-col items-center md:w-1/2 w-full p-4 gap-4 mt-20">
          <h1 className="text-teal-300 border-b-2 border-teal-50 p-1 w-full flex justify-center text-xl items-center mt-4 ">
            My Contact
          </h1>
          <div className="flex flex-col gap-4  bg-slate-900 rounded-2xl w-full justify-evenly  ">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-evenly gap-2 p-4 bg-[#1b1b1b] rounded-xl shadow-xl "
                >
                  <button
                    onClick={() => handleDetails(contact)}
                    className="w-1/4"
                  >
                    <img
                       src={contact.image ? `/public/images/uploads/${contact.image}` : '/public/images/uploads/default.jpg'}
                      alt="img"
                      className="h-14 w-14 m-auto object-cover rounded-full"
                    />
                  </button>

                  <div className="flex flex-col gap-2 w-1/2">
                    <p className="text-lg text-white text-center">
                      {contact.name}
                    </p>
                    <p className="text-xs text-white text-center">
                      {contact.phone}
                    </p>
                  </div>
                  <div className="w-1/4 flex justify-center gap-4">
                    <button>
                      <i className="fas fa-phone text-[#64ffda]"></i>
                    </button>
                    <button onClick={() => deleteContact(contact._id)}>
                      <i className="fas fa-trash text-[#64ffda]"></i>
                    </button>
                    <NavLink to={`/editcontact/${contact._id}`}>
                      <i className="fas fa-edit text-[#64ffda]"></i>
                    </NavLink>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {openDetails && (
          <Details contact={openDetails} open={open} setOpen={setOpen} />
        )}
      </div>
    </div>
  );
}

export default ContactList;
