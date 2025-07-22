import { BellIcon } from "@heroicons/react/24/outline"; // Correct import

export default function Navbar() {
  return (
    <header className="flex justify-between items-center py-4 px-8 bg-white shadow rounded-t-2xl mb-6">
      {/* Left Side */}
      <div className="flex items-center">
        <select className="rounded-lg px-3 py-2 bg-transparent border border-gray-200 focus:outline-none mr-4">
          <option>Home Address</option>
          <option>Work Address</option>
        </select>
        <select className="rounded-lg px-3 py-2 bg-transparent border border-gray-200 focus:outline-none">
          <option>EN</option>
          <option>HI</option>
        </select>
      </div>

      {/* Right Side */}
      <div className="flex items-center">
        <button className="p-2 rounded-full hover:bg-orange-100">
          <BellIcon className="w-6 h-6 text-gray-800" />
        </button>
        <img
          src="/path/profile.jpg"
          alt="Vartul"
          className="w-10 h-10 rounded-full ml-4"
        />
        <span className="ml-3 font-semibold">Vartul</span>
      </div>
    </header>
  );
}
