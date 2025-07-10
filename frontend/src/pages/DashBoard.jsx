import React from 'react'
import { useUser } from '../context/userContext.jsx' // Import the custom hook
const DashBoard = () => {
  const { user } = useUser(); // Use the custom hook to access user state
  console.log("User in Dashboard:", user); // Log the user data to verify it's being accessed correctly
  return (
    <div>DashBoard</div>
  )
}

export default DashBoard