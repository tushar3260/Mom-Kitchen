// components/profile/ProfileHeader.jsx
import React from "react";

export default function ProfileHeader({ name }) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-800">👤 Welcome, {name}</h1>
      <p className="text-gray-500">Manage your profile info here</p>
    </div>
  );
}
