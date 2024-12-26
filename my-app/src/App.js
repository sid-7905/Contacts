import Contacts from "./components/contact_list";
import Add_contact from "./components/add_contact";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/signup";
import Login from "./components/login";
import Profile from "./components/profile";
import Home from "./components/home";

function App() {
  const [contacts, setContacts] = useState([]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/mycontacts",
      element: <Contacts
        contacts={contacts}
        setContacts={setContacts}
    />,
    },
    {
      path: "/addcontact",
      element: <Add_contact contacts={contacts}/>,
    },
    {
      path: "/register",
      element: <SignUp />,
    },
    {
      path: "/login",
      element : <Login />
    },
    {
      path: "/logout",
    },
    {
      path: "/profile",
      element: <Profile />
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
