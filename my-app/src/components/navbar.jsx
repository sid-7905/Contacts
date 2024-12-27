import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import axios from "axios";

const handleLogout = async () => {
  try {
    await axios.get("http://localhost:5000/api/user/logout", {
      withCredentials: true, // Include cookies and credentials
    });
    localStorage.removeItem("token");
    window.location.replace("http://localhost:3000/login");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export default function MyNavbar() {
  return (
    <div className="flex justify-center">
      <Disclosure
        as="nav"
        className="bg-[#0f0e0e] shadow-2xl p-2 md:p-0 border-l-indigo-950 rounded-xl fixed w-11/12 sm:w-4/5 z-10 mt-2 animate__animated animate__fadeInDown  duration-300 ease-in-out"
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

            <div className="flex flex-shrink-0 items-center">
              <NavLink to="/profile" className="text-3xl text-slate-300">Profile</NavLink>
            </div>

            {/* Desktop menu */}
            <div className="hidden sm:flex items-center justify-center gap-4">
            <div>
              <NavLink
                to="/mycontacts"
                className={(e) => (e.isActive ? "bg-gray-700 " : "") + "text-white hover:bg-gray-800 hover:text-white block rounded-md px-3 py-2 text-base font-medium"}
              >
                My Contacts
              </NavLink>
            </div>
            <div>
              <NavLink
                to="/addcontact"
                className={(e) => (e.isActive ? "bg-gray-700 " : "") + "text-white hover:bg-gray-800 hover:text-white block rounded-md px-3 py-2 text-base font-medium"}
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
                className={(e) => (e.isActive ? "bg-gray-700 " : "") + "text-white hover:bg-gray-800 hover:text-white block rounded-md px-3 py-2 text-base font-medium"}
              >
                My Contacts
              </NavLink>
            </div>
            <div>
              <NavLink
                to="/addcontact"
                className={(e) => (e.isActive ? "bg-gray-700 " : "") + "text-white hover:bg-gray-800 hover:text-white block rounded-md px-3 py-2 text-base font-medium"}
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
