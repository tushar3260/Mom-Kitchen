// import React, { useState, useRef } from "react";
// import axios from "axios";

// const OTPVerify = () => {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState(new Array(6).fill(""));
//   const [message, setMessage] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const inputsRef = useRef([]);

//   const handleEmailChange = (e) => setEmail(e.target.value);

//   const handleChange = (element, index) => {
//     if (!/^\d*$/.test(element.value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = element.value;
//     setOtp(newOtp);

//     if (element.value && index < 5) {
//       inputsRef.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputsRef.current[index - 1].focus();
//     }
//   };

//   // Send OTP with axios
//   const sendOtp = async () => {
//     if (!email) {
//       setMessage("Bhai, email toh daal pehle!");
//       return;
//     }

//     try {
//       const res = await axios.post("/api/send-otp", { email });
//       setMessage("OTP bhej diya bhai! Check your email.");
//       setOtpSent(true);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Kuch toh gadbad hai bhai.");
//     }
//   };

//   // Verify OTP with axios
//   const verifyOtp = async () => {
//     const enteredOtp = otp.join("");
//     if (enteredOtp.length < 6) {
//       setMessage("Bhai, poora 6 digit OTP daal!");
//       return;
//     }

//     try {
//       const res = await axios.post(`/api/verify-otp", { email, otp: enteredOtp });
//       setMessage("OTP verify ho gaya bhai! 🍽️");
//       setOtp(new Array(6).fill(""));
//       setOtpSent(false);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "OTP galat hai, dubara try kar.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black flex flex-col justify-center items-center p-5 text-white font-sans">
//       <h1 className="text-4xl mb-4 font-bold text-red-600">Tiffin Tales</h1>
//       <p className="mb-6 text-center max-w-xs">
//         Pehle apna email daal ke OTP bhejo, phir verify karo.
//       </p>

//       <input
//         type="email"
//         placeholder="Apna email daal yahan"
//         value={email}
//         onChange={handleEmailChange}
//         className="mb-4 px-4 py-2 rounded border border-red-600 bg-black text-red-600 w-72 focus:outline-none focus:ring-2 focus:ring-red-600"
//         disabled={otpSent}
//       />

//       {!otpSent ? (
//         <button
//           onClick={sendOtp}
//           className="bg-red-600 hover:bg-red-700 px-8 py-2 rounded font-semibold transition mb-8"
//         >
//           Send OTP
//         </button>
//       ) : (
//         <>
//           <div className="flex space-x-3 mb-6">
//             {otp.map((digit, idx) => (
//               <input
//                 key={idx}
//                 ref={(el) => (inputsRef.current[idx] = el)}
//                 type="text"
//                 maxLength="1"
//                 value={digit}
//                 onChange={(e) => handleChange(e.target, idx)}
//                 onKeyDown={(e) => handleKeyDown(e, idx)}
//                 className="w-12 h-12 text-center text-2xl font-mono rounded border border-red-600 bg-black text-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
//                 autoFocus={idx === 0}
//               />
//             ))}
//           </div>

//           <button
//             onClick={verifyOtp}
//             className="bg-red-600 hover:bg-red-700 px-8 py-2 rounded font-semibold transition"
//           >
//             Verify OTP
//           </button>
//         </>
//       )}

//       {message && (
//         <p className="mt-5 text-center text-red-400 font-semibold">{message}</p>
//       )}
//     </div>
//   );
// };

// export default OTPVerify;
