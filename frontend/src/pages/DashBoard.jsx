import React from 'react';
import ProfileHeader from '../components/ProfileHeader.jsx';
import ProfileStats from '../components/ProfileStats.jsx';
import ProfileTabs from '../components/ProfileTabs.jsx';
import Sidebar from '../components/Siderbar.jsx';
import { motion } from 'framer-motion';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#fff8ee]">
      <Sidebar />

      <motion.div
        className="flex-1 p-6"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <ProfileHeader />
        <ProfileStats />
        <ProfileTabs />
      </motion.div>
    </div>
  );
}
