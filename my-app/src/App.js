import "./App.css";
import Home from "./components/home";
import Login from "./components/login";
import React, { useState } from "react";
import SignUp from "./components/signup";
import Profile from "./components/profile";
import Contacts from "./components/contact_list";
import EditForm from "./components/edit_contact";
import Add_contact from "./components/add_contact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

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
      element: checkLogin() ? <EditForm contacts={contacts} /> : <Navigate to="/" />
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
