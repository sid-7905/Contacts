import { Dialog } from '@headlessui/react';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function Details({ contact, open, setOpen}) {

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="bg-zinc-900 relative z-1">
      <div className="fixed inset-0 bg-black bg-opacity-50  backdrop-blur-sm flex items-center justify-center p-4">
        <Dialog.Panel className="bg-zinc-900 rounded-lg p-6 flex flex-col gap-3 border border-cyan-400 w-96">
          <img
            src={contact.image ? `${backendUrl}/images/uploads/${contact.image}` : `${backendUrl}/images/uploads/default.jpg`}
            alt="Contact"
            className="w-24 h-24 object-cover rounded-full mx-auto"
          />
          <h3 className="text-lg font-semibold text-white  mx-auto">{contact.name}</h3>
          <p className="text-gray-300">Phone: {contact.phone}</p>
          <p className="text-gray-400">Alternate Number: {contact.altNumber}</p>
          <p className="text-gray-400">Email: {contact.email}</p>
          <p className="text-gray-500">Address: {contact.address}</p>
          <div className="mt-4 flex justify-evenly">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              Close
            </button>
            
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
