
// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";
// import { useState, ChangeEvent, FormEvent } from "react";
// import { useRouter } from "next/navigation";
// import { FaEnvelope, FaLock } from "react-icons/fa";
// import axios, { AxiosError } from "axios";

// interface LoginForm {
//   email: string;
//   password: string;
// }

// export default function Login() {
//   const router = useRouter();
//   const [formData, setFormData] = useState<LoginForm>({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     console.log("Submitting login:", formData.email);

//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/Login", formData);
//       const { token, user } = response.data;

//       // 🔹 Clear old agency
//       localStorage.removeItem("activeAgencyId");

//       // 🔹 Save token & user info
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));

//       if (user.agencies?.length > 0) {
//         localStorage.setItem("agencies", JSON.stringify(user.agencies));
//       }

//       // 🔹 Role-based redirect (abhi sirf Owner ke liye)
//       // if (user.role === "owner") {
//       //   if (user.agencies && user.agencies.length > 0) {
//       //     const agencyId = user.agencies[0].id;
//       //     localStorage.setItem("activeAgencyId", agencyId.toString());
//       //     router.push(`/Admin/${agencyId}`); // Owner dashboard
//       //   } else {
//       //     router.push("/Admin/AddAgencyPage"); // First-time owner
//       //   }
//       // } else {
//       //   // Future roles ke liye fallback
//       //   router.push("/");
//       // }
//       const agencyId = user.agencies[0]?.id;
//       if (agencyId) {
//         localStorage.setItem("activeAgencyId", agencyId.toString());
//         router.push(`/Admin/${agencyId}`);
//       } else {
//         router.push("/Admin/AddAgencyPage"); // first-time owner
//       }
//       console.log("Login successful:", user);
//     } catch (err) {
//   if (axios.isAxiosError(err)) {
//     console.error(err.response?.data?.message || err.message);
//     alert(err.response?.data?.message || err.message || "Login failed!");
//   } else {
//     console.error(err);
//     alert("Unexpected error occurred");
//   }
// }
//   };

//   const iconStyle = { fill: "white", stroke: "black", strokeWidth: 20 };

//   return (
//     <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen flex flex-col">
//       {/* Navbar */}
//       <header className="bg-gradient-to-b from-blue-50 to-white flex justify-between items-center px-8 py-4 shadow-sm">
//         <div className="flex items-center space-x-2">
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
//           <Link
//             href="/Login"
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             Login
//           </Link>
//           <Link href="/Signup" className="text-gray-700 hover:text-blue-600">
//             Signup
//           </Link>
//         </nav>
//       </header>

//       {/* Login Form */}
//       <div className="flex-grow flex items-center justify-center p-6">
//         <motion.div
//           initial={{ opacity: 0, y: -40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-8 w-full max-w-md border border-blue-100"
//         >
//           <h2 className="text-3xl font-bold text-blue-600 text-center mb-2">
//             Welcome Back
//           </h2>
//           <p className="text-gray-500 text-center mb-6 text-sm">
//             Please login to continue
//           </p>

//           <form className="space-y-5" onSubmit={handleSubmit}>
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

//             {/* Submit Button */}
//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.95 }}
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg shadow-md transition duration-300"
//             >
//               Login
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
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "@/context/AuthContext"  // ✅ AuthContext import

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const { login } = useAuth(); // ✅ context se login function
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitting login:", formData.email);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/Login", formData);
      const { token, user } = response.data;

      // 🔹 Clear old agency
      localStorage.removeItem("activeAgencyId");

      // 🔹 Save token
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // 🔹 Update context (AuthContext me user set hoga)
      login(user, token);

      // 🔹 Agencies save
      if (user.agencies?.length > 0) {
        localStorage.setItem("agencies", JSON.stringify(user.agencies));
      }

      // 🔹 Redirect dynamic agency ke sath
      const agencyId = user.agencies[0]?.id;
      if (agencyId) {
        localStorage.setItem("activeAgencyId", agencyId.toString());
        router.push(`/Admin/${agencyId}`);
      } else {
        router.push("/Admin/AddAgencyPage"); // first-time owner
      }

      console.log("Login successful:", user);
    } catch (err: any) {
      console.error(err.response?.data?.message || err.message);
      alert(err.response?.data?.message || err.message || "Login failed!");
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
          <Link
            href="/Login"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link href="/Signup" className="text-gray-700 hover:text-blue-600">
            Signup
          </Link>
        </nav>
      </header>

      {/* Login Form */}
      <div className="flex-grow flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-8 w-full max-w-md border border-blue-100"
        >
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-center mb-6 text-sm">
            Please login to continue
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
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

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg shadow-md transition duration-300"
            >
              Login
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
