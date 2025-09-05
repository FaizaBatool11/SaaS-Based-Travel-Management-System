// "use client";

// import React, { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import axios from "axios";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
// } from "recharts";

// // Icons
// import { Bell, Settings, Bus, Ticket, CreditCard } from "lucide-react";

// type Mode = "Bus" | "Train";

// type Trip = {
//   id: number;
//   from: string;
//   to: string;
//   depart: string;
//   mode: Mode;
//   classType: "Economy" | "Business";
//   price: number;
//   seatsAvailable: number;
// };

// export default function AdminDashboard() {
//   const { agencyId } = useParams<{ agencyId: string }>();
//   const [trips, setTrips] = useState<Trip[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchTrips = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const agencyId = localStorage.getItem("activeAgencyId");
//         const res = await axios.get(
//          `http://localhost:5000/api/trips/getAllTrips?agencyId=${agencyId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setTrips(res.data);
//       } catch (err: any) {
//         setError(err.response?.data?.message || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTrips();
//   }, [agencyId]);

//   const stats = [
//     { title: "Total Trips", value: trips.length },
//     { title: "Total Bookings", value: 4 },
//     { title: "Total Revenue", value: "PKR 11,300" },
//   ];

//   // Chart data mapping
//   const chartData = trips.map((trip) => ({
//     id: trip.id,
//     name: `${trip.from} → ${trip.to}`,
//     seats: trip.seatsAvailable,
//     price: trip.price,
//     mode: trip.mode,
//     classType: trip.classType,
//     depart: trip.depart,
//   }));

//   return (
//     <div className="space-y-10">
//       {/* Header with Right Icons */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Dashboard</h1>
//         <div className="flex items-center gap-6">
//           {/* Notification Icon */}
//           <button className="relative text-gray-600 hover:text-blue-600">
//             <Bell size={22} />
//             <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//           </button>

//           {/* Settings Icon */}
//           <button className="text-gray-600 hover:text-blue-600">
//             <Settings size={22} />
//           </button>

//           {/* Profile Avatar */}
//           <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold cursor-pointer">
//             E
//           </div>
//         </div>
//       </div>

//       {/* Welcome Section */}
//       <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-md">
//         <h2 className="text-xl sm:text-2xl font-semibold">Welcome, Admin 👋</h2>
//         <p className="text-sm sm:text-base opacity-90">
//           Here’s an overview of your agency’s performance.
//         </p>
//       </div>

//       {/* Stats Cards */}
// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//   {/* Trips */}
//   <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4 hover:shadow-md transition">
//     <div className="p-3 bg-green-100 text-green-600 rounded-full">
//       <Bus size={24} />
//     </div>
//     <div>
//       <h3 className="text-lg font-semibold text-gray-800">{trips.length}</h3>
//       <p className="text-gray-500 text-sm">Total Trips</p>
//     </div>
//   </div>

//   {/* Bookings */}
//   <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4 hover:shadow-md transition">
//     <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
//       <Ticket size={24} />
//     </div>
//     <div>
//       <h3 className="text-lg font-semibold text-gray-800">4</h3>
//       <p className="text-gray-500 text-sm">Total Bookings</p>
//     </div>
//   </div>

//   {/* Revenue */}
//   <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4 hover:shadow-md transition">
//     <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
//       <CreditCard size={24} />
//     </div>
//     <div>
//       <h3 className="text-lg font-semibold text-gray-800">PKR 11,300</h3>
//       <p className="text-gray-500 text-sm">Total Revenue</p>
//     </div>
//   </div>
// </div>  

//       {/* Available Trips - Chart View */}
//       <div>
//         <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">
//           Available Trips Overview
//         </h2>

//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
//           </div>
//         ) : error ? (
//           <div className="text-red-500">{error}</div>
//         ) : trips.length === 0 ? (
//           <div className="text-gray-600 text-sm">No trips available.</div>
//         ) : (
//           <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-6xl mx-auto overflow-x-auto">
//             {/* Scrollable Container */}
//             <div style={{ width: chartData.length * 140, minWidth: "100%" }}>
//               <ResponsiveContainer width="100%" height={420}>
//                 <BarChart
//                   data={chartData}
//                   margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis
//                     dataKey="name"
//                     interval={0}
//                     tick={({ x, y, payload }) => {
//                       const [from, to] = payload.value.split("→");
//                       return (
//                         <g transform={`translate(${x},${y + 10})`}>
//                           <text
//                             x={0}
//                             y={0}
//                             dy={16}
//                             textAnchor="middle"
//                             fill="#374151"
//                             fontSize={12}
//                           >
//                             <tspan x="0" dy="0">
//                               {from.trim()}
//                             </tspan>
//                             <tspan x="0" dy="14">
//                               → {to.trim()}
//                             </tspan>
//                           </text>
//                         </g>
//                       );
//                     }}
//                   />
//                   <YAxis allowDecimals={false} />
//                   <Tooltip
//                     content={({ payload }) => {
//                       if (!payload || payload.length === 0) return null;
//                       const trip = payload[0].payload;
//                       return (
//                         <div className="bg-white shadow-lg rounded-lg p-4 border w-64">
//                           <h3 className="font-semibold text-gray-800 mb-2">
//                             {trip.name}
//                           </h3>
//                           <p className="text-sm text-gray-600">
//                             <span className="font-medium">Seats:</span>{" "}
//                             {trip.seats}
//                           </p>
//                           <p className="text-sm text-gray-600">
//                             <span className="font-medium">Price:</span> PKR{" "}
//                             {trip.price}
//                           </p>
//                           <p className="text-sm text-gray-600">
//                             <span className="font-medium">Mode:</span>{" "}
//                             {trip.mode}
//                           </p>
//                           <p className="text-sm text-gray-600">
//                             <span className="font-medium">Class:</span>{" "}
//                             {trip.classType}
//                           </p>
//                           <p className="text-sm text-gray-600">
//                             <span className="font-medium">Depart:</span>{" "}
//                             {new Date(trip.depart).toLocaleString()}
//                           </p>
//                         </div>
//                       );
//                     }}
//                   />
//                   <Bar
//                     dataKey="seats"
//                     fill="#4F46E5"
//                     radius={[6, 6, 0, 0]}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// // }
// "use client";

// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
// } from "recharts";

// // Icons
// import { Bell, Settings, Bus, Ticket, CreditCard } from "lucide-react";

// type Mode = "Bus" | "Train";

// type Trip = {
//   id: number;
//   from: string;
//   to: string;
//   depart: string;
//   mode: Mode;
//   classType: "Economy" | "Business";
//   price: number;
//   seatsAvailable: number;
// };

// type Agency = {
//   id: number;
//   name: string;
// };

// export default function AdminDashboard() {
//   const { agencyId: paramAgencyId } = useParams<{ agencyId: string }>();
//   const router = useRouter();

//   const [trips, setTrips] = useState<Trip[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Agencies dropdown
//   const [agencies, setAgencies] = useState<Agency[]>([]);
//   const [activeAgency, setActiveAgency] = useState<Agency | null>(null);

//   // Load agencies from localStorage on mount
//   useEffect(() => {
//     const storedAgencies = localStorage.getItem("agencies");
//     if (storedAgencies) {
//       const parsed: Agency[] = JSON.parse(storedAgencies);
//       setAgencies(parsed);

//       // Set active agency: first from URL, then localStorage, then default to first
//       const urlAgency = parsed.find((a) => a.id.toString() === paramAgencyId);
//       const storedActive = localStorage.getItem("activeAgencyId");
//       // const defaultAgency =
//       //   urlAgency || parsed.find((a) => a.id.toString() === storedActive) || parsed[0];
//       const defaultAgency = urlAgency || parsed[0]; // ignore storedActive

//       setActiveAgency(defaultAgency);
//       if (defaultAgency) {
//         localStorage.setItem("activeAgencyId", defaultAgency.id.toString());
//         if (paramAgencyId !== defaultAgency.id.toString()) {
//           router.replace(`/Admin/${defaultAgency.id}`);
//         }
//       }
//     }
//   }, []);

//   // Fetch trips whenever activeAgency changes
//   useEffect(() => {
//     if (!activeAgency) return;

//     const fetchTrips = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         const res = await axios.get(
//           `http://localhost:5000/api/trips/getAllTrips?agencyId=${activeAgency.id}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setTrips(res.data);
//         setError("");
//       } catch (err: any) {
//         setError(err.response?.data?.message || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTrips();
//   }, [activeAgency]);

//   // Handle agency change from dropdown
//   const handleAgencyChange = (agencyId: string) => {
//     const selected = agencies.find((a) => a.id.toString() === agencyId);
//     if (!selected) return;

//     setActiveAgency(selected);
//     localStorage.setItem("activeAgencyId", selected.id.toString());

//     // Update URL
//     router.push(`/Admin/${selected.id}`);
//   };

//   const stats = [
//     { title: "Total Trips", value: trips.length },
//     { title: "Total Bookings", value: 4 },
//     { title: "Total Revenue", value: "PKR 11,300" },
//   ];

//   const chartData = trips.map((trip) => ({
//     id: trip.id,
//     name: `${trip.from} → ${trip.to}`,
//     seats: trip.seatsAvailable,
//     price: trip.price,
//     mode: trip.mode,
//     classType: trip.classType,
//     depart: trip.depart,
//   }));

//   return (
//     <div className="space-y-10">
//       {/* Header with Right Icons */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Dashboard</h1>

//         <div className="flex items-center gap-6">
//           {/* Agencies Dropdown */}
//           {agencies.length > 0 && (
//             <select
//               value={activeAgency?.id || ""}
//               onChange={(e) => handleAgencyChange(e.target.value)}
//               className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//             >
//               {agencies.map((agency) => (
//                 <option key={agency.id} value={agency.id}>
//                   {agency.name}
//                 </option>
//               ))}
//             </select>
//           )}

//           {/* Notification Icon */}
//           <button className="relative text-gray-600 hover:text-blue-600">
//             <Bell size={22} />
//             <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//           </button>

//           {/* Settings Icon */}
//           <button className="text-gray-600 hover:text-blue-600">
//             <Settings size={22} />
//           </button>

//           {/* Profile Avatar */}
//           <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold cursor-pointer">
//             E
//           </div>
//         </div>
//       </div>

//       {/* Welcome Section */}
//       <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-md">
//         <h2 className="text-xl sm:text-2xl font-semibold">Welcome, Admin 👋</h2>
//         <p className="text-sm sm:text-base opacity-90">
//           Here’s an overview of your agency’s performance.
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4 hover:shadow-md transition">
//           <div className="p-3 bg-green-100 text-green-600 rounded-full">
//             <Bus size={24} />
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800">{trips.length}</h3>
//             <p className="text-gray-500 text-sm">Total Trips</p>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4 hover:shadow-md transition">
//           <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
//             <Ticket size={24} />
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800">4</h3>
//             <p className="text-gray-500 text-sm">Total Bookings</p>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4 hover:shadow-md transition">
//           <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
//             <CreditCard size={24} />
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800">PKR 11,300</h3>
//             <p className="text-gray-500 text-sm">Total Revenue</p>
//           </div>
//         </div>
//       </div>

//       {/* Available Trips - Chart View */}
//       <div>
//         <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">
//           Available Trips Overview
//         </h2>

//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
//           </div>
//         ) : error ? (
//           <div className="text-red-500">{error}</div>
//         ) : trips.length === 0 ? (
//           <div className="text-gray-600 text-sm">No trips available.</div>
//         ) : (
//           <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-6xl mx-auto overflow-x-auto">
//             <div style={{ width: chartData.length * 140, minWidth: "100%" }}>
//               <ResponsiveContainer width="100%" height={420}>
//                 <BarChart
//                   data={chartData}
//                   margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis
//                     dataKey="name"
//                     interval={0}
//                     tick={({ x, y, payload }) => {
//                       const [from, to] = payload.value.split("→");
//                       return (
//                         <g transform={`translate(${x},${y + 10})`}>
//                           <text
//                             x={0}
//                             y={0}
//                             dy={16}
//                             textAnchor="middle"
//                             fill="#374151"
//                             fontSize={12}
//                           >
//                             <tspan x="0" dy="0">
//                               {from.trim()}
//                             </tspan>
//                             <tspan x="0" dy="14">
//                               → {to.trim()}
//                             </tspan>
//                           </text>
//                         </g>
//                       );
//                     }}
//                   />
//                   <YAxis allowDecimals={false} />
//                   <Tooltip
//                     content={({ payload }) => {
//                       if (!payload || payload.length === 0) return null;
//                       const trip = payload[0].payload;
//                       return (
//                         <div className="bg-white shadow-lg rounded-lg p-4 border w-64">
//                           <h3 className="font-semibold text-gray-800 mb-2">{trip.name}</h3>
//                           <p className="text-sm text-gray-600">
//                             <span className="font-medium">Seats:</span> {trip.seats}
//                           </p>
//                           <p className="text-sm text-gray-600">
//                             <span className="font-medium">Price:</span> PKR {trip.price}
//                           </p>
//                           <p className="text-sm text-gray-600">
//                             <span className="font-medium">Mode:</span> {trip.mode}
//                           </p>
//                           <p className="text-sm text-gray-600">
//                             <span className="font-medium">Class:</span> {trip.classType}
//                           </p>
//                           <p className="text-sm text-gray-600">
//                             <span className="font-medium">Depart:</span>{" "}
//                             {new Date(trip.depart).toLocaleString()}
//                           </p>
//                         </div>
//                       );
//                     }}
//                   />
//                   <Bar dataKey="seats" fill="#4F46E5" radius={[6, 6, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
// } from "recharts";

// // Icons
// import { Bell, Settings, Bus, Ticket, CreditCard, Users } from "lucide-react";

// type Mode = "Bus" | "Train";

// type Trip = {
//   id: number;
//   from: string;
//   to: string;
//   depart: string;
//   mode: Mode;
//   classType: "Economy" | "Business";
//   price: number;
//   seatsAvailable: number;
// };

// type Agency = {
//   id: number;
//   name: string;
// };

// export default function AdminDashboard() {
//   const { agencyId: paramAgencyId } = useParams<{ agencyId: string }>();
//   const router = useRouter();

//   const [trips, setTrips] = useState<Trip[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [agencies, setAgencies] = useState<Agency[]>([]);
//   const [activeAgency, setActiveAgency] = useState<Agency | null>(null);

//   // Get role from localStorage
//   const [role, setRole] = useState<string | null>(null);
//   useEffect(() => {
//     const storedRole = localStorage.getItem("role");
//     setRole(storedRole);
//   }, []);

//   // Load agencies on mount
//   useEffect(() => {
//     const storedAgencies = localStorage.getItem("agencies");
//     if (storedAgencies) {
//       const parsed: Agency[] = JSON.parse(storedAgencies);
//       setAgencies(parsed);

//       const urlAgency = parsed.find((a) => a.id.toString() === paramAgencyId);
//       const defaultAgency = urlAgency || parsed[0];
//       setActiveAgency(defaultAgency);

//       if (defaultAgency) {
//         localStorage.setItem("activeAgencyId", defaultAgency.id.toString());
//         if (paramAgencyId !== defaultAgency.id.toString()) {
//           router.replace(`/${role === "booking_agent" ? "BookingDashboard" : "Admin"}/${defaultAgency.id}`);
//         }
//       }
//     }
//   }, [paramAgencyId, role]);

//   // Fetch trips when activeAgency changes
//   useEffect(() => {
//     if (!activeAgency || !role) return;

//     const fetchTrips = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");

//         const url =
//           role === "booking_agent"
//             ? `http://localhost:5000/api/trips/bookingAgentTrips?agencyId=${activeAgency.id}`
//             : `http://localhost:5000/api/trips/getAllTrips?agencyId=${activeAgency.id}`;


//         const res = await axios.get(url, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setTrips(res.data);
//         setError("");
//       } catch (err: any) {
//         setError(err.response?.data?.message || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrips();
//   }, [activeAgency, role]);

//   const handleAgencyChange = (agencyId: string) => {
//     const selected = agencies.find((a) => a.id.toString() === agencyId);
//     if (!selected) return;

//     setActiveAgency(selected);
//     localStorage.setItem("activeAgencyId", selected.id.toString());

//     router.push(`/${role === "booking_agent" ? "BookingDashboard" : "Admin"}/${selected.id}`);
//   };

//   // Define stats based on role
//   const statsCards =
//     role === "booking_agent"
//       ? [
//           { title: "Passengers", value: 1250, icon: Users },
//           { title: "Trips", value: trips.length, icon: Bus },
//           { title: "Bookings", value: 980, icon: Ticket },
//           { title: "Payments", value: "PKR 12,450", icon: CreditCard },
//         ]
//       : [
//           { title: "Total Trips", value: trips.length, icon: Bus },
//           { title: "Total Bookings", value: 4, icon: Ticket },
//           { title: "Total Revenue", value: "PKR 11,300", icon: CreditCard },
//         ];

//   const chartData = trips.map((trip) => ({
//     id: trip.id,
//     name: `${trip.from} → ${trip.to}`,
//     seats: trip.seatsAvailable,
//     price: trip.price,
//     mode: trip.mode,
//     classType: trip.classType,
//     depart: trip.depart,
//   }));

//   return (
//     <div className="space-y-10">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Dashboard</h1>

//         <div className="flex items-center gap-6">
//           {agencies.length > 0 && (
//             <select
//               value={activeAgency?.id || ""}
//               onChange={(e) => handleAgencyChange(e.target.value)}
//               className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//             >
//               {agencies.map((agency) => (
//                 <option key={agency.id} value={agency.id}>
//                   {agency.name}
//                 </option>
//               ))}
//             </select>
//           )}

//           <button className="relative text-gray-600 hover:text-blue-600">
//             <Bell size={22} />
//             <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//           </button>

//           <button className="text-gray-600 hover:text-blue-600">
//             <Settings size={22} />
//           </button>

//           <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold cursor-pointer">
//             E
//           </div>
//         </div>
//       </div>

//       {/* Welcome Section */}
//       <div
//         className={`rounded-xl p-6 shadow-md ${
//           role === "booking_agent" ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white" : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
//         }`}
//       >
//         <h2 className="text-xl sm:text-2xl font-semibold">
//           Welcome, {role === "booking_agent" ? "Booking Agent" : "Admin"} 👋
//         </h2>
//         <p className="text-sm sm:text-base opacity-90">
//           {role === "booking_agent"
//             ? "Here’s a quick overview of your travel management system."
//             : "Here’s an overview of your agency’s performance."}
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div
//         className={`grid gap-4 ${
//           role === "booking_agent"
//             ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" // booking agent = 4 stats in one line
//             : "sm:grid-cols-2 lg:grid-cols-3 gap-6" // admin = 3 stats in one line
//         }`}
//       >
//         {statsCards.map(({ title, value, icon: Icon }, index) => (
//           <div
//             key={title}
//             className="rounded-lg bg-white shadow p-4 flex items-center gap-3 hover:shadow-md transition"
//           >
//             <div
//               className={`w-10 h-10 flex items-center justify-center rounded-full ${
//                 role === "booking_agent"
//                   ? ["bg-blue-100 text-blue-600", "bg-green-100 text-green-600", "bg-yellow-100 text-yellow-600", "bg-purple-100 text-purple-600"][index % 4]
//                   : "bg-blue-100 text-blue-600"
//               }`}
//             >
//               <Icon size={24} />
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800">{value}</h3>
//               <p className="text-sm text-gray-500">{title}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//           {/* Available Trips Chart - Only for Admin */}
//           {role === "agency_admin" && (
//             <div>
//               <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">
//                 Available Trips Overview
//               </h2>

//               {loading ? (
//                 <div className="flex justify-center items-center h-64">
//                   <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
//                 </div>
//               ) : error ? (
//                 <div className="text-red-500">{error}</div>
//               ) : trips.length === 0 ? (
//                 <div className="text-gray-600 text-sm">No trips available.</div>
//               ) : (
//                 <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-6xl mx-auto overflow-x-auto">
//                   <div style={{ width: chartData.length * 140, minWidth: "100%" }}>
//                     <ResponsiveContainer width="100%" height={420}>
//                       <BarChart
//                         data={chartData}
//                         margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
//                       >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis
//                           dataKey="name"
//                           interval={0}
//                           tick={({ x, y, payload }) => {
//                             const [from, to] = payload.value.split("→");
//                             return (
//                               <g transform={`translate(${x},${y + 10})`}>
//                                 <text
//                                   x={0}
//                                   y={0}
//                                   dy={16}
//                                   textAnchor="middle"
//                                   fill="#374151"
//                                   fontSize={12}
//                                 >
//                                   <tspan x="0" dy="0">
//                                     {from.trim()}
//                                   </tspan>
//                                   <tspan x="0" dy="14">
//                                     → {to.trim()}
//                                   </tspan>
//                                 </text>
//                               </g>
//                             );
//                           }}
//                         />
//                         <YAxis allowDecimals={false} />
//                         <Tooltip
//                           content={({ payload }) => {
//                             if (!payload || payload.length === 0) return null;
//                             const trip = payload[0].payload;
//                             return (
//                               <div className="bg-white shadow-lg rounded-lg p-4 border w-64">
//                                 <h3 className="font-semibold text-gray-800 mb-2">
//                                   {trip.name}
//                                 </h3>
//                                 <p className="text-sm text-gray-600">
//                                   <span className="font-medium">Seats:</span> {trip.seats}
//                                 </p>
//                                 <p className="text-sm text-gray-600">
//                                   <span className="font-medium">Price:</span> PKR{" "}
//                                   {trip.price}
//                                 </p>
//                                 <p className="text-sm text-gray-600">
//                                   <span className="font-medium">Mode:</span> {trip.mode}
//                                 </p>
//                                 <p className="text-sm text-gray-600">
//                                   <span className="font-medium">Class:</span>{" "}
//                                   {trip.classType}
//                                 </p>
//                                 <p className="text-sm text-gray-600">
//                                   <span className="font-medium">Depart:</span>{" "}
//                                   {new Date(trip.depart).toLocaleString()}
//                                 </p>
//                               </div>
//                             );
//                           }}
//                         />
//                         <Bar dataKey="seats" fill="#4F46E5" radius={[6, 6, 0, 0]} />
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// Icons
import { Bell, Settings, Bus, Ticket, CreditCard, Users } from "lucide-react";

type Mode = "Bus" | "Train";

type Trip = {
  id: number;
  from: string;
  to: string;
  depart: string;
  mode: Mode;
  classType: "Economy" | "Business";
  price: number;
  seatsAvailable: number;
};

type Agency = {
  id: number;
  name: string;
};

export default function AdminDashboard() {
  const { agencyId: paramAgencyId } = useParams<{ agencyId: string }>();
  const router = useRouter();

  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [activeAgency, setActiveAgency] = useState<Agency | null>(null);

  // Get role from localStorage (expected values: "booking_agent" or "agency_admin")
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  // Load agencies on mount
  useEffect(() => {
    const storedAgencies = localStorage.getItem("agencies");
    if (storedAgencies) {
      const parsed: Agency[] = JSON.parse(storedAgencies);
      setAgencies(parsed);

      const urlAgency = parsed.find((a) => a.id.toString() === paramAgencyId);
      const defaultAgency = urlAgency || parsed[0];
      setActiveAgency(defaultAgency);

      if (defaultAgency) {
        localStorage.setItem("activeAgencyId", defaultAgency.id.toString());
        if (paramAgencyId !== defaultAgency.id.toString()) {
          router.replace(
            `/${role === "booking_agent" ? "BookingDashboard" : "Admin"}/${defaultAgency.id}`
          );
        }
      }
    }
  }, [paramAgencyId, role, router]);

  // Fetch trips: booking agents -> bookingAgentTrips (read-only), admins -> getAllTrips
  useEffect(() => {
    if (!activeAgency || !role) return;

    const fetchTrips = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");

        const url =
          role === "booking_agent"
            ? `http://localhost:5000/api/trips/bookingAgentTrips?agencyId=${activeAgency.id}`
            : `http://localhost:5000/api/trips/getAllTrips?agencyId=${activeAgency.id}`;

        const res = await axios.get(url, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        setTrips(res.data || []);
      } catch (err: any) {
        setError(err?.response?.data?.message || err?.message || "Error fetching trips");
        setTrips([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [activeAgency, role]);

  const handleAgencyChange = (agencyId: string) => {
    const selected = agencies.find((a) => a.id.toString() === agencyId);
    if (!selected) return;

    setActiveAgency(selected);
    localStorage.setItem("activeAgencyId", selected.id.toString());

    router.push(`/${role === "booking_agent" ? "BookingDashboard" : "Admin"}/${selected.id}`);
  };

  // Stats cards (booking_agent = compact & colorful; agency_admin = admin stats)
  const statsCards =
    role === "booking_agent"
      ? [
          { title: "Passengers", value: 1250, icon: Users },
          { title: "Trips", value: trips.length, icon: Bus },
          { title: "Bookings", value: 980, icon: Ticket },
          { title: "Payments", value: "PKR 12,450", icon: CreditCard },
        ]
      : [
          { title: "Total Trips", value: trips.length, icon: Bus },
          { title: "Total Bookings", value: 4, icon: Ticket },
          { title: "Total Revenue", value: "PKR 11,300", icon: CreditCard },
        ];

  const chartData = trips.map((trip) => ({
    id: trip.id,
    name: `${trip.from} → ${trip.to}`,
    seats: trip.seatsAvailable,
    price: trip.price,
    mode: trip.mode,
    classType: trip.classType,
    depart: trip.depart,
  }));

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <div className="flex items-center gap-6">
          {agencies.length > 0 && (
            <select
              value={activeAgency?.id || ""}
              onChange={(e) => handleAgencyChange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              {agencies.map((agency) => (
                <option key={agency.id} value={agency.id}>
                  {agency.name}
                </option>
              ))}
            </select>
          )}

          <button className="relative text-gray-600 hover:text-blue-600">
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <button className="text-gray-600 hover:text-blue-600">
            <Settings size={22} />
          </button>

          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold cursor-pointer">
            E
          </div>
        </div>
      </div>

      {/* Welcome */}
      <div className="rounded-xl p-6 shadow-md bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h2 className="text-xl sm:text-2xl font-semibold">
          Welcome, {role === "booking_agent" ? "Booking Agent" : "Agency Admin"} 👋
        </h2>
        <p className="text-sm sm:text-base opacity-90">
          {role === "booking_agent"
            ? "Here’s a quick overview for booking agents."
            : "Here’s an overview of your agency’s performance."}
        </p>
      </div>

      {/* Stats (one-line) */}
      <div
        className={`grid items-stretch ${
          role === "booking_agent" ? "grid-cols-4 gap-8" : "grid-cols-3 gap-8"
        }`}
      >
        {statsCards.map(({ title, value, icon: Icon }, index) => (
          <div
            key={title}
            className="rounded-lg bg-white shadow p-6 flex items-center gap-5 hover:shadow-md transition"
          >
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-full ${
                role === "booking_agent"
                  ? [
                      "bg-blue-100 text-blue-600",
                      "bg-green-100 text-green-600",
                      "bg-yellow-100 text-yellow-600",
                      "bg-purple-100 text-purple-600",
                    ][index % 4]
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              <Icon size={28} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800">{value}</h3>
              <p className="text-sm font-medium text-gray-500">{title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Agent: simple read-only trips list (no actions) */}
      {role === "booking_agent" && (
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Available Trips</h2>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : trips.length === 0 ? (
            <div className="text-gray-600 text-sm">No trips available.</div>
          ) : (
            <div className="grid gap-3">
              {trips.map((trip) => (
                <div
                  key={trip.id}
                  className="bg-white rounded-lg shadow p-5 flex justify-between items-center hover:shadow-lg hover:bg-blue-50 transition cursor-pointer"
                >
                  {/* Left Section */}
                  <div>
                    <div className="font-semibold text-gray-800 text-lg">
                      {trip.from} → {trip.to}
                    </div>

                    {/* Badges Row */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {new Date(trip.depart).toLocaleString()}
                      </div>
                      <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        {trip.mode}
                      </div>
                      <div className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                        {trip.seatsAvailable} seats
                      </div>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-800">PKR {trip.price}</div>
                    <div className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">{trip.classType}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Agency Admin: Trips Chart (unchanged) */}
      {role === "agency_admin" && (
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">
            Available Trips Overview
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : trips.length === 0 ? (
            <div className="text-gray-600 text-sm">No trips available.</div>
          ) : (
            <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-6xl mx-auto overflow-x-auto">
              <div style={{ width: chartData.length * 140, minWidth: "100%" }}>
                <ResponsiveContainer width="100%" height={420}>
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      interval={0}
                      tick={({ x, y, payload }) => {
                        const [from, to] = payload.value.split("→");
                        return (
                          <g transform={`translate(${x},${y + 10})`}>
                            <text x={0} y={0} dy={16} textAnchor="middle" fill="#374151" fontSize={12}>
                              <tspan x="0" dy="0">
                                {from.trim()}
                              </tspan>
                              <tspan x="0" dy="14">
                                → {to.trim()}
                              </tspan>
                            </text>
                          </g>
                        );
                      }}
                    />
                    <YAxis allowDecimals={false} />
                    <Tooltip
                      content={({ payload }) => {
                        if (!payload || payload.length === 0) return null;
                        const trip = payload[0].payload;
                        return (
                          <div className="bg-white shadow-lg rounded-lg p-4 border w-64">
                            <h3 className="font-semibold text-gray-800 mb-2">{trip.name}</h3>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Seats:</span> {trip.seats}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Price:</span> PKR {trip.price}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Mode:</span> {trip.mode}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Class:</span> {trip.classType}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Depart:</span> {new Date(trip.depart).toLocaleString()}
                            </p>
                          </div>
                        );
                      }}
                    />
                    <Bar dataKey="seats" fill="#4F46E5" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
