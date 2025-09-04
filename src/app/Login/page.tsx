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
//       //yaha token milta ha
//       const token = response.data.token; 
//       //token ko save karna ha
//       localStorage.setItem("token", token);
//       // Show success message
//       alert("Login successful!");

//       // Redirect based on role (optional)
//       // const userRole = response.data.user.role;
//       // if (userRole === "super_admin") router.push("/AddAgencyPage");
//       // else router.push("/Dashboard");

//       // router.push("/AddAgencyPage"); // default redirect
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("role", response.data.user.role);
//       // localStorage.setItem("agencyId", response.data.user.agencyId || "");

// // Agar user ke multiple agencies hain
// if (response.data.user.agencies?.length > 0) {
//   localStorage.setItem("agencies", JSON.stringify(response.data.user.agencies));
// }

// // if (response.data.user.role === "agency_admin") {
// //   if (response.data.user.agencies?.length > 0) {
// //     // Agar ek hi agency hai to direct dashboard
// //     if (response.data.user.agencies.length === 1) {
// //       localStorage.setItem("activeAgencyId", response.data.user.agencies[0].id);
// //       router.push("/Admin");
// //     } else {
// //       // Agar multiple agencies hain to user ko choose karwana hoga
// //       router.push("/SelectAgency");
// //     }
// //   } else {
// //     // Abhi agency create karni hai
// //     router.push("/AddAgencyPage");
// //   }
// // } else {
// //   router.push("/UserDashboard");
// // }
// const agencies = response.data.user.agencies || [];
// // if (response.data.user.role === "agency_admin") {
// //   if (agencies.length === 0) {
// //     // User ke paas koi agency nahi hai → AddAgency page
// //     router.push("/AddAgencyPage");
// //   } else if (agencies.length === 1) {
// //     // User ke paas sirf ek agency hai → Direct Admin dashboard
// //     localStorage.setItem("activeAgencyId", agencies[0].id);
// //     router.push("/Admin");
// //   } else {
// //     // Multiple agencies → User ko choose karwana hoga
// //     router.push("/SelectAgency");
// //   }
// // } else {
// //   router.push("/UserDashboard"); // Non-admin users
// // }
// // After successful login
// if (response.data.user.role === "agency_admin") {
//   // 💡 Always redirect to SelectAgency page
//   router.push("/SelectAgency");
// } else {
//   router.push("/UserDashboard");
// }
//   console.log("Login response:", response.data);
// } catch (err) {
//       const error = err as AxiosError<{ message: string }>;
//       console.error(error.response?.data?.message || error.message || err);
//       alert(error.response?.data?.message || error.message || "Login failed!");
//     }
//   };

//   const iconStyle = { fill: "white", stroke: "black", strokeWidth: 20 };

//   return (
//     <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen flex flex-col">
//       {/* Navbar */}
//       <header className="bg-gradient-to-b from-blue-50 to-white flex justify-between items-center px-8 py-4 shadow-sm">
//         <h1 className="text-2xl font-bold text-blue-600">Travel Management</h1>
//         <nav className="space-x-4">
//           <Link
//             href="/Login"
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             Login
//           </Link>
//           <Link
//             href="/Signup"
//             className="text-gray-700 hover:text-blue-600"
//           >
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
import axios, { AxiosError } from "axios";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
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

      // 1️⃣ Save token & user info
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);

      if (user.agencies?.length > 0) {
        localStorage.setItem("agencies", JSON.stringify(user.agencies));
      }

      // 2️⃣ Role-based redirect
      if (user.role === "agency_admin") {
        router.push("/SelectAgency");
      } else if (user.role === "booking_agent") {
        if (user.agencies?.length > 0) {
          const agencyId = user.agencies[0].id; // 👈 backend se agencyId aa rahi hogi
          router.push(`/BookingDashboard/${agencyId}`);  // ✅ Dynamic route par redirect
        } else {
          alert("No agency assigned. Contact admin.");
        }
      } else {
        router.push("/");
      }

      console.log("Login successful:", user);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.error(error.response?.data?.message || error.message || err);
      alert(error.response?.data?.message || error.message || "Login failed!");
    }
  };

  const iconStyle = { fill: "white", stroke: "black", strokeWidth: 20 };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-gradient-to-b from-blue-50 to-white flex justify-between items-center px-8 py-4 shadow-sm">
        <div className="flex items-center space-x-2">
          {/* Placeholder Logo Icon (bus+train idea) */}
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
          <Link
            href="/Signup"
            className="text-gray-700 hover:text-blue-600"
          >
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
