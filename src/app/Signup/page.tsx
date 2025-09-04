// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";
// import { useState, ChangeEvent, FormEvent } from "react";
// import { useRouter } from "next/navigation";
// import { FaUser, FaEnvelope, FaLock, FaUserShield } from "react-icons/fa";
// import axios, { AxiosError } from "axios";

// interface FormData {
//   fullName: string;
//   email: string;
//   password: string;
//   role: string;
// }

// export default function Signup() {
//   const router = useRouter();
//   const [formData, setFormData] = useState<FormData>({
//     fullName: "",
//     email: "",
//     password: "",
//     role: "",
//   });

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     try {
//       const payload = {
//         name: formData.fullName,
//         email: formData.email,
//         password: formData.password,
//         role: formData.role,
//       };

//       const response = await axios.post("http://localhost:5000/api/auth/signup", payload);

//       alert("Signup successful!");
//       router.push("/Login");

//       console.log(response.data);

//     } catch (err) {
//       // Type-safe catch block for TypeScript
//       const error = err as AxiosError<{ message: string }>;
//       console.error(error.response?.data?.message || error.message || err);
//       alert(error.response?.data?.message || error.message || "Signup failed!");
//     }
//   };

//   const iconStyle = { fill: "white", stroke: "black", strokeWidth: 20 };

//   return (
//     <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen flex flex-col">
//       {/* Navbar */}
//       <header className="bg-gradient-to-b from-blue-50 to-white flex justify-between items-center px-8 py-4 shadow-sm">
//         <div className="flex items-center space-x-2">
//           {/* Placeholder Logo Icon (bus+train idea) */}
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/69/69906.png" 
//             alt="RideWay Logo"
//             className="h-8 w-8"
//           />
//           <h1 className="text-xl font-bold text-blue-600 leading-tight">
//             RideWay <br />
//             <span className="text-gray-800 text-lg">Travels</span>
//           </h1>
//         </div>
//         <nav className="space-x-4">
//           <Link href="/Login" className="text-gray-700 hover:text-blue-600">
//             Login
//           </Link>
//           <Link
//             href="/Signup"
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             Signup
//           </Link>
//         </nav>
//       </header>

//       {/* Signup Form */}
//       <div className="flex-grow flex items-center justify-center p-6">
//         <motion.div
//           initial={{ opacity: 0, y: -40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-8 w-full max-w-md border border-blue-100"
//         >
//           <h2 className="text-3xl font-bold text-blue-600 text-center mb-2">
//             Create Your Account
//           </h2>
//           <p className="text-gray-500 text-center mb-6 text-sm">
//             Fill in the details below to sign up
//           </p>

//           <form className="space-y-5" onSubmit={handleSubmit}>
//             {/* Full Name */}
//             <div className="relative">
//               <FaUser style={iconStyle} className="absolute top-4 left-3 w-4 h-4" />
//               <input
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 type="text"
//                 placeholder="Enter full name"
//                 className="w-full pl-10 pr-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition duration-300"
//                 required
//               />
//             </div>

//             {/* Email */}
//             <div className="relative">
//               <FaEnvelope style={iconStyle} className="absolute top-4 left-3 w-4 h-4" />
//               <input
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 type="email"
//                 placeholder="Enter email"
//                 className="w-full pl-10 pr-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition duration-300"
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div className="relative">
//               <FaLock style={iconStyle} className="absolute top-4 left-3 w-4 h-4" />
//               <input
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 type="password"
//                 placeholder="Enter password"
//                 className="w-full pl-10 pr-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition duration-300"
//                 required
//               />
//             </div>

//             {/* Role Selector */}
//             <div className="relative">
//               <FaUserShield style={iconStyle} className="absolute top-4 left-3 w-4 h-4" />
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="text-gray-500 w-full pl-10 pr-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition duration-300"
//                 required
//               >
//                 <option value="" disabled hidden>
//                   Choose Role
//                 </option>
//                 <option value="super_admin">Super Admin</option>
//                 <option value="agency_admin">Agency Admin</option>
//                 <option value="booking_agent">Booking Agent</option>
//               </select>
//             </div>

//             {/* Submit Button */}
//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.95 }}
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg shadow-md transition duration-300"
//             >
//               Sign Up
//             </motion.button>
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaLock, FaUserShield, FaBuilding } from "react-icons/fa";
import axios, { AxiosError } from "axios";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  role: string;
  agencyId: string;
}

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    role: "",
    agencyId: "",
  });

  const [agencies, setAgencies] = useState<{ id: number; name: string }[]>([]);

  // ✅ Backend se agencies list fetch karo
  useEffect(() => {
    axios
    .get("http://localhost:5000/api/agencies")
    .then((res) => {
      console.log("Agencies fetched:", res.data);  // 👈 check console
      setAgencies(res.data);
    })
    .catch((err) => console.error("Error fetching agencies:", err));
}, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        agencyId: formData.role === "booking_agent" ? formData.agencyId : null, // ✅ only when booking_agent
      };

      const response = await axios.post("http://localhost:5000/api/auth/signup", payload);

      alert("Signup successful!");
      router.push("/Login");

      console.log(response.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.error(error.response?.data?.message || error.message || err);
      alert(error.response?.data?.message || error.message || "Signup failed!");
    }
  };

  const iconStyle = { fill: "white", stroke: "black", strokeWidth: 20 };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-gradient-to-b from-blue-50 to-white flex justify-between items-center px-8 py-4 shadow-sm">
        <div className="flex items-center space-x-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/69/69906.png"
            alt="RideWay Logo"
            className="h-8 w-8"
          />
          <h1 className="text-xl font-bold text-blue-600 leading-tight">
            RideWay <br />
            <span className="text-gray-800 text-lg">Travels</span>
          </h1>
        </div>
        <nav className="space-x-4">
          <Link href="/Login" className="text-gray-700 hover:text-blue-600">
            Login
          </Link>
          <Link
            href="/Signup"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Signup
          </Link>
        </nav>
      </header>

      {/* Signup Form */}
      <div className="flex-grow flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-8 w-full max-w-md border border-blue-100"
        >
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-500 text-center mb-6 text-sm">
            Fill in the details below to sign up
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="relative">
              <FaUser style={iconStyle} className="absolute top-4 left-3 w-4 h-4" />
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                type="text"
                placeholder="Enter full name"
                className="w-full pl-10 pr-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition duration-300"
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope style={iconStyle} className="absolute top-4 left-3 w-4 h-4" />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter email"
                className="w-full pl-10 pr-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition duration-300"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock style={iconStyle} className="absolute top-4 left-3 w-4 h-4" />
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="Enter password"
                className="w-full pl-10 pr-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition duration-300"
                required
              />
            </div>

            {/* Role Selector */}
            <div className="relative">
              <FaUserShield style={iconStyle} className="absolute top-4 left-3 w-4 h-4" />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="text-gray-500 w-full pl-10 pr-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition duration-300"
                required
              >
                <option value="" disabled hidden>
                  Choose Role
                </option>
                <option value="super_admin">Super Admin</option>
                <option value="agency_admin">Agency Admin</option>
                <option value="booking_agent">Booking Agent</option>
              </select>
            </div>

            {/* Agency Selector (Only for Booking Agent) */}
            {formData.role === "booking_agent" && (
              <div className="relative">
                <FaBuilding style={iconStyle} className="absolute top-4 left-3 w-4 h-4" />
                <select
                  name="agencyId"
                  value={formData.agencyId}
                  onChange={handleChange}
                  className="text-gray-500 w-full pl-10 pr-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition duration-300"
                  required
                >
                  <option value="" disabled>
                    Select Agency
                  </option>
                  {agencies.map((agency) => (
                    <option key={agency.id} value={agency.id}>
                      {agency.name}   {/* 👈 agency ka name show hoga */}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg shadow-md transition duration-300"
            >
              Sign Up
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
