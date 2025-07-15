import React from 'react';

export default function ProfileHeader() {
  return (
    <div className="flex items-center gap-4 mb-6">
      <img
        src="https://i.pravatar.cc/150?img=3"
        alt="User Avatar"
        className="w-20 h-20 rounded-full"
      />
      <div>
        <h2 className="text-xl font-bold">John Doe</h2>
        <p className="text-gray-500">johndoe@example.com</p>
      </div>
    </div>
  );
}
