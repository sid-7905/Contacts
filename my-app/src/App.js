import React, { useState } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Contacts from "./components/contact_list";
import Add_contact from "./components/add_contact";
import SignUp from "./components/signup";
import Login from "./components/login";
import Profile from "./components/profile";
import Home from "./components/home";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import EditForm from "./components/edit_contact";

function checkLogin() {
  return localStorage.getItem("token") ? true : false;
}

function App() {
  const [contacts, setContacts] = useState([]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: checkLogin() ? <Navigate to="/mycontacts" /> : <Home />,
    },
    {
      path: "/mycontacts",
      element: checkLogin() ? <Contacts contacts={contacts} setContacts={setContacts} /> : <Navigate to="/" />
    },
    {
      path: "/addcontact",
      element:  checkLogin() ? <Add_contact contacts={contacts} /> : <Navigate to="/" />
      
    },
    {
      path: "/editcontact/:id",
      element: checkLogin() ? <EditForm contacts={contacts} setContacts={setContacts}  /> : <Navigate to="/" />
    },
    {
      path: "/register",
      element:  checkLogin() ? <Navigate to="/mycontacts" /> : <SignUp />
    },
    {
      path: "/login",
      element: checkLogin() ? <Navigate to="/mycontacts" /> : <Login />
    },
    {
      path: "/profile",
      element: (
        checkLogin() ? <Profile /> : <Navigate to="/" />
      ),
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
