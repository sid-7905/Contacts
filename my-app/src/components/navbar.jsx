import { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
console.log(backendUrl);

const handleLogout = async () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
};

export default function MyNavbar() {

  const [userData, setUserData] = useState({});

useEffect(() => {
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      setUserData(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  fetchUserData();
}, []);

  return (
    <div className="flex justify-center">
      <Disclosure
        as="nav"
        className="bg-[#0f0e0e] shadow-2xl p-2 md:p-0 border-l-indigo-950 rounded-xl fixed w-11/12 md:w-4/5 z-10 mt-2 animate__animated animate__fadeInDown  duration-300 ease-in-out"
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <div className="absolute inset-y-0 right-0 flex items-center sm:hidden animate-spin">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>

            <div className="flex">
              <NavLink to="/profile" className="text-slate-300 flex items-center gap-2">
                  <img
                    src={
                      userData.image
                        ? `${backendUrl}/images/uploads/${userData.image}`
                        : `${backendUrl}/images/uploads/default.jpg`
                    }
                    alt="Contact"
                    className="w-8 h-8 object-cover rounded-full mx-auto"
                  />
                  <h3 className=" font-semibold text-white  mx-auto">
                    {userData.name}
                  </h3>
              </NavLink>
            </div>

            {/* Desktop menu */}
            <div className="hidden sm:flex items-center justify-center gap-4">
              <div>
                <NavLink
                  to="/mycontacts"
                  className={(e) =>
                    (e.isActive ? "bg-gray-700 " : "") +
                    "text-white hover:bg-gray-800 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                  }
                >
                  My Contacts
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="/addcontact"
                  className={(e) =>
                    (e.isActive ? "bg-gray-700 " : "") +
                    "text-white hover:bg-gray-800 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                  }
                >
                  Add Contact
                </NavLink>
              </div>
            </div>

            <div className="hidden sm:flex gap-4">
              <NavLink
                onClick={handleLogout}
                className="cursor-pointer m-4 py-3 px-6 rounded-xl border border-[#32e0b8] text-[#3de2d2] font-bold transition-all duration-300 hover:bg-[#35e0c4] hover:text-black hover:shadow-inner"
              >
                LogOut
              </NavLink>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <DisclosurePanel className="md:hidden">
          <div className="flex flex-col text-lg justify-center gap-4">
            <div>
              <NavLink
                to="/mycontacts"
                className={(e) =>
                  (e.isActive ? "bg-gray-700 " : "") +
                  "text-white hover:bg-gray-800 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                }
              >
                My Contacts
              </NavLink>
            </div>
            <div>
              <NavLink
                to="/addcontact"
                className={(e) =>
                  (e.isActive ? "bg-gray-700 " : "") +
                  "text-white hover:bg-gray-800 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                }
              >
                Add Contact
              </NavLink>
            </div>
            <NavLink
              onClick={handleLogout}
              className="cursor-pointer w-1/4 p-2 m-1 text-center rounded-xl border border-[#32e0b8] text-[#3de2d2] font-bold transition-all duration-300 hover:bg-[#35e0c4] hover:text-black hover:shadow-inner"
            >
              LogOut
            </NavLink>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}
