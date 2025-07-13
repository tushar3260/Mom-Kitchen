// pages/ProfilePage.jsx
import React, { useState } from "react";
import TopNav from "../components/TopNav";
import ProfileHeader from "../components/dashcomponents/ProfileHeader"
import ProfileDetails from "../components/dashcomponents/ProfileDetails";
import EditProfileForm from "../components/dashcomponents/EditProfileForm";
import ChangePassword from "../components/dashcomponents/ChangePassword";

export default function DashboardApp() {
  const [user, setUser] = useState({
    name: "Tushar Bansal",
    email: "tushar@example.com",
    phone: "9876543210",
    city: "Delhi",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSave = (updatedData) => {
    setUser(updatedData);
    setIsEditing(false);
  };

  return (
    <div>
    <TopNav />
    <div className="p-6 max-w-5xl mx-auto">
        
      <ProfileHeader name={user.name} />
      {!isEditing ? (
        <ProfileDetails user={user} onEdit={handleEdit} />
      ) : (
        <EditProfileForm user={user} onSave={handleSave} onCancel={handleCancel} />
      )}
      <ChangePassword />
    </div>
    </div>
  );
}
