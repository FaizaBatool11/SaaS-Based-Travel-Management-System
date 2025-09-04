// "use client";

// import { motion } from "framer-motion";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Register() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     agencyName: "",
//     email: "",
//     password: "",
//     phone: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Optionally you can send data to backend here

//     // Redirect to Home page
//     router.push("/Home");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-6">
//       <motion.div
//         initial={{ opacity: 0, y: -40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md"
//       >
//         <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
//           Register Your Agency
//         </h2>

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           {/* Agency Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Agency Name
//             </label>
//             <input
//               name="agencyName"
//               value={formData.agencyName}
//               onChange={handleChange}
//               type="text"
//               placeholder="Enter agency name"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Email
//             </label>
//             <input
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               type="email"
//               placeholder="Enter email"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Password
//             </label>
//             <input
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               type="password"
//               placeholder="Enter password"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
//             />
//           </div>

//           {/* Phone Number */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Phone Number
//             </label>
//             <input
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               type="text"
//               placeholder="Enter phone number"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
//             />
//           </div>

//           {/* Submit Button */}
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg shadow-md transition duration-300"
//           >
//             Submit
//           </motion.button>
//         </form>
//       </motion.div>
//     </div>
//   );
// }

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaBuilding, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    agencyName: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/Home");
  };

  // Reusable icon style for white fill + black border
  const iconStyle = { fill: "white", stroke: "black", strokeWidth: 20 };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-8 w-full max-w-md border border-blue-100"
      >
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-2">
          Register Your Agency
        </h2>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Fill out the form below to get started
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Agency Name */}
          <div className="relative">
            <FaBuilding
              style={iconStyle}
              className="absolute top-4 left-3 w-4 h-4"
            />
            <input
              name="agencyName"
              value={formData.agencyName}
              onChange={handleChange}
              type="text"
              placeholder="Enter agency name"
              className="w-full pl-10 pr-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition duration-300"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope
              style={iconStyle}
              className="absolute top-4 left-3 w-4 h-4"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter email"
              className="w-full pl-10 pr-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition duration-300"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock
              style={iconStyle}
              className="absolute top-4 left-3 w-4 h-4"
            />
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter password"
              className="w-full pl-10 pr-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition duration-300"
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <FaPhone
              style={iconStyle}
              className="absolute top-4 left-3 w-4 h-4"
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="text"
              placeholder="Enter phone number"
              className="w-full pl-10 pr-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition duration-300"
            />
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg shadow-md transition duration-300"
          >
            Create Account
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
