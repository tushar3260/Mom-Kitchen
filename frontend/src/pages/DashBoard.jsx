import React from 'react';
import ProfileHeader from '../components/ProfileHeader.jsx';
import ProfileStats from '../components/ProfileStats.jsx';
import ProfileTabs from '../components/ProfileTabs.jsx';
import Sidebar from '../components/Siderbar.jsx'

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <ProfileHeader />
        <ProfileStats />
        <ProfileTabs />
      </div>
    </div>
  );
}
