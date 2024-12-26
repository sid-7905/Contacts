import React from "react";
import Details from "./details";
import Edit_contact from './edit_contact';
import { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ContactList({ contacts, setContacts }) {

  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/contacts/${id}`);
      const updatedContacts = contacts.filter((contact) => contact._id !== id);
      setContacts(updatedContacts); // Update the state to reflect the deleted contact
      alert("Contact deleted successfully!");
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact. Please try again.");
    }
  };

  const [openDetails, setopenDetails] = useState(null);
  const [openEdit, setOpenEdit] = useState(null);
  const [open, setOpen] = useState(false);


  const handleDetails = (contact) => {
    setopenDetails(contact);
    setOpen(true); // Open the modal
  };

  useEffect(() => {
    // Fetch data from the backend
    axios.get("http://localhost:5000/api/user/contacts",{
      withCredentials: true, // Include cookies and credentials
    }) // Replace with your backend URL
      .then((response) => {
        setContacts(response.data); // Update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  }, []);


  const handleLogout = () => {
    axios.get("http://localhost:5000/api/user/logout", {
      withCredentials: true, // Include cookies and credentials
    })
    .then((response) => {
      console.log(response);
      window.location.replace("http://localhost:3000/login");
    }
    )
    .catch((error) => {
      console.error("Error logging out:", error);
    });
  };

  return (
    <div className="bg-zinc-900 flex flex-col items-center justify-center h-full min-h-screen">
      <div className=" rounded-none sm:rounded-lg flex flex-col items-center gap-4 shadow-2xl w-full max-w-md">
        <h1 className="text-teal-300 border-b-2 border-teal-50 p-1 w-full flex justify-center text-xl items-center mt-4 ">My Contact</h1>
        <div className="flex flex-col  gap-4 bg-[#171717] rounded-2xl w-full justify-evenly">
          {contacts.map((contact, index) => {
            return (
              <div key={index} className="flex items-center justify-evenly gap-2 p-4 bg-[#1b1b1b] rounded-xl shadow-xl ">
                <button onClick={() => handleDetails(contact)} className="w-1/4">
                  <img
                    src={contact.image}
                    alt="img"
                    className="h-14 w-14 m-auto object-cover rounded-full"
                  />
                </button>
                
                <div className="flex flex-col gap-2 w-1/2">
                  <p className="text-lg text-white text-center">{contact.name}</p>
                  <p className="text-xs text-white text-center">{contact.phone}</p>
                </div>
                <div className="w-1/4 flex justify-center gap-4">
                  <button>
                  <i className="fas fa-phone text-[#64ffda]"></i>
                  </button>
                  <button onClick={() => deleteContact(contact._id)}>
                  <i className="fas fa-trash text-[#64ffda]"></i>
                  </button>
                  <button onClick={() => setOpenEdit(contact)}>
                  <i className="fas fa-edit text-[#64ffda]"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Link
          to="/addcontact"
          className="cursor-pointer m-4 py-3 px-6 rounded-xl border border-[#32e0b8] text-[#3de2d2] font-bold transition-all duration-300 hover:bg-[#35e0c4] hover:text-black hover:shadow-inner"
      >
        Add Contact
      </Link>
      <Link
          onClick={handleLogout}
          className="cursor-pointer m-4 py-3 px-6 rounded-xl border border-[#32e0b8] text-[#3de2d2] font-bold transition-all duration-300 hover:bg-[#35e0c4] hover:text-black hover:shadow-inner"
      >
        LogOut
      </Link>
      {openDetails && (
        <Details
          contact={openDetails}
          open={open}
          setOpen={setOpen}
        />
      )}
      {openEdit && (
            <Edit_contact
              contact={openEdit}
              contacts={contacts}
              setContacts={setContacts}
              setOpenEdit={setOpenEdit}
            />
      )}
    </div>
  );
}

export default ContactList;