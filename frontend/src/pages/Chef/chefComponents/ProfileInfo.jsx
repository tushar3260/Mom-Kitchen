import React from 'react';
import { useUser } from '../../../context/userContext';
import { FaEnvelope, FaPhoneAlt, FaUserTie, FaMapMarkerAlt } from 'react-icons/fa';

const ProfileInfo = () => {
  const { user } = useUser();

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl font-bold text-orange-600 mb-6">Chef Profile</h1>

      <div className="flex flex-col md:flex-row gap-10 items-center">
        {/* Profile Image */}
        <div className="w-40 h-40 rounded-full overflow-hidden shadow-md">
          <img
            src={user?.photo}
            alt="Chef"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl">
          <div className="flex items-center gap-3 mb-4 text-lg">
            <FaUserTie className="text-orange-500" />
            <span className="font-semibold">{user?.name}</span>
          </div>
          <div className="flex items-center gap-3 mb-4 text-lg">
            <FaEnvelope className="text-orange-500" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 mb-4 text-lg">
            <FaPhoneAlt className="text-orange-500" />
            <span>{user?.phone}</span>
          </div>
          <div className="flex items-center gap-3 mb-4 text-lg">
            <FaMapMarkerAlt className="text-orange-500" />
            <span>{user?.address || 'Not Provided'}</span>
          </div>
          <p className="text-gray-600 mt-2">{user?.description || 'No bio available.'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
