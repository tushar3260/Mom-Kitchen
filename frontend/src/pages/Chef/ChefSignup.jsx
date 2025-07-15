import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import {useNavigate } from 'react-router-dom';
import ChefContext from "./context/ChefContext";
import { useContext } from "react";
import Loading from "../../Loading";
const ChefSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    passwordHash: "",
    bio: "",
    cuisine: "",
    kitchenImages: "",
    documents: { aadhaar: "", pan: "" },
    bankDetails: { accNo: "", ifsc: "", holderName: "" },
    location: { area: "", lat: "", lng: "" },
  });
  const { setChef, setChefToken } = useContext(ChefContext);

  const [loading, setLoading] = useState(false);
  const [locationFetched, setLocationFetched] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("bankDetails.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        bankDetails: { ...prev.bankDetails, [key]: value },
      }));
    } else if (name.startsWith("documents.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        documents: { ...prev.documents, [key]: value },
      }));
    } else if (name.startsWith("location.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [key]: value },
      }));
    } else if (name === "cuisine" || name === "kitchenImages") {
      setFormData((prev) => ({
        ...prev,
        [name]: value.split(",").map((v) => v.trim()),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );
          const data = await res.json();

          const address = data.display_name || "Address not found";

          setFormData((prev) => ({
            ...prev,
            location: {
              area: address,
              lat: lat.toString(),
              lng: lng.toString(),
            },
          }));

          setLocationFetched(true);
          toast.success("📍 Location detected: " + address);
        } catch (error) {
          toast.error("Failed to fetch address");
        }
      },
      () => {
        toast.error("Failed to access location. Please enter manually.");
      }
    );
  };

  const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);

  const handleSubmit = async (e) => {
    // const navigate = useNavigate();
    e.preventDefault();

    if (!validatePhone(formData.phone)) {
      toast.error("❌ Invalid Indian phone number");
      return;
    }

    if (!formData.location.lat || !formData.location.lng) {
      toast.error("❌ Location is required (auto or manual)");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/chefs/register`,
        formData,
        { withCredentials: true }
      );
      toast.success(res.data.message || "Chef registered successfully!");
      setTimeout(() => {
        setLoading(true);
        window.location.href = "/otp";
      }, 800);

      const token = res.data.token;
      const chef = res.data.chef;

      if (!token) {
        toast.error("❌ Login failed! No token received");
        return;
      }

      localStorage.setItem("chefToken", token);
      localStorage.setItem("chefData", JSON.stringify(chef));
      localStorage.setItem("chefEmail", chef.email);
      setChef(chef);
      setChefToken(token);
      // Store token in localStorage
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        passwordHash: "",
        bio: "",
        cuisine: "",
        kitchenImages: "",
        documents: { aadhaar: "", pan: "" },
        bankDetails: { accNo: "", ifsc: "", holderName: "" },
        location: { area: "", lat: "", lng: "" },
      });
      setLocationFetched(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff8ee] px-4 py-10">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-[#ff7e00] text-center">
          Chef Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-3 rounded-xl border border-gray-300"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-3 rounded-xl border border-gray-300"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone (10-digit)"
              value={formData.phone}
              onChange={handleChange}
              required
              className="p-3 rounded-xl border border-gray-300"
            />
            <input
              type="password"
              name="passwordHash"
              placeholder="Password"
              value={formData.passwordHash}
              onChange={handleChange}
              required
              className="p-3 rounded-xl border border-gray-300"
            />
          </div>
          <textarea
            name="bio"
            placeholder="Short Bio (optional)"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300"
          />
          <input
            type="text"
            name="cuisine"
            placeholder="Cuisines (comma separated)"
            value={formData.cuisine}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-gray-300"
          />
          <input
            type="text"
            name="kitchenImages"
            placeholder="Kitchen Image Links (comma separated)"
            value={formData.kitchenImages}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-gray-300"
          />
          <small className="text-sm text-gray-500">
            👉 Upload images on{" "}
            <a
              href="https://imgbb.com/"
              target="_blank"
              rel="noreferrer"
              className="text-[#ff7e00] underline"
            >
              imgbb.com
            </a>
          </small>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="documents.aadhaar"
              placeholder="Aadhaar Image Link"
              value={formData.documents.aadhaar}
              onChange={handleChange}
              required
              className="p-3 rounded-xl border border-gray-300"
            />
            <input
              type="text"
              name="documents.pan"
              placeholder="PAN Image Link"
              value={formData.documents.pan}
              onChange={handleChange}
              required
              className="p-3 rounded-xl border border-gray-300"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="bankDetails.accNo"
              placeholder="Account Number"
              value={formData.bankDetails.accNo}
              onChange={handleChange}
              required
              className="p-3 rounded-xl border border-gray-300"
            />
            <input
              type="text"
              name="bankDetails.ifsc"
              placeholder="IFSC Code"
              value={formData.bankDetails.ifsc}
              onChange={handleChange}
              required
              className="p-3 rounded-xl border border-gray-300"
            />
            <input
              type="text"
              name="bankDetails.holderName"
              placeholder="Account Holder Name"
              value={formData.bankDetails.holderName}
              onChange={handleChange}
              required
              className="p-3 rounded-xl border border-gray-300"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <input
              type="text"
              name="location.area"
              placeholder="Area / Locality"
              value={formData.location.area}
              onChange={handleChange}
              required
              className="p-3 rounded-xl border border-gray-300"
            />
          </div>
          <button
            type="button"
            onClick={detectLocation}
            disabled={locationFetched}
            className={`text-[#ff7e00] underline mb-2 ${
              locationFetched ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            📍{" "}
            {locationFetched ? "Location Detected ✅" : "Auto Detect Location"}
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-[#ff7e00] hover:bg-orange-600"
            } text-white py-3 rounded-xl mt-4`}
          >
            {loading ? "Registering..." : "Register as Chef"}
          </button>
          already have an account?{" "}
          <Link to="/chef/login" className="text-[#ff7e00] underline">
            Login here
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ChefSignup;
