// components/profile/ChangePassword.jsx
import React from "react";

export default function ChangePassword() {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 mt-8">
      <h2 className="text-lg font-semibold mb-4">Change Password</h2>
      <div className="flex flex-col gap-3">
        <input type="password" placeholder="Current Password" className="p-2 border rounded" />
        <input type="password" placeholder="New Password" className="p-2 border rounded" />
        <input type="password" placeholder="Confirm New Password" className="p-2 border rounded" />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Update Password
        </button>
      </div>
    </div>
  );
}
