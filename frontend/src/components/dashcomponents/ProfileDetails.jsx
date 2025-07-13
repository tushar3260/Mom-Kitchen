// components/profile/ProfileDetails.jsx
import React from "react";

export default function ProfileDetails({ user, onEdit }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div><span className="font-semibold">Full Name:</span> {user.name}</div>
        <div><span className="font-semibold">Email:</span> {user.email}</div>
        <div><span className="font-semibold">Phone:</span> {user.phone}</div>
        <div><span className="font-semibold">City:</span> {user.city}</div>
      </div>
      <button
        onClick={onEdit}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Edit Profile
      </button>
    </div>
  );
}
