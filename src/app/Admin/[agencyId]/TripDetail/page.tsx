// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "next/navigation";
// import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
// import { MdAddCircle } from "react-icons/md";

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
//   agencyId?: number;
// };

// export default function TripDetail() {
//   const params = useParams();
//   const agencyId = params.agencyId as string; // URL se agencyId
//   const [trips, setTrips] = useState<Trip[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const [newTrip, setNewTrip] = useState<Trip>({
//     id: 0,
//     from: "",
//     to: "",
//     depart: "",
//     mode: "Bus",
//     classType: "Economy",
//     price: 0,
//     seatsAvailable: 0,
//   });

//   // Load trips
//   useEffect(() => {
//     const fetchTrips = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(
//           `http://localhost:5000/api/trips/getAllTrips?agencyId=${agencyId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
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
//   }, []);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setNewTrip({ ...newTrip, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");

//       if (isEditing) {
//         const res = await axios.put(
//           `http://localhost:5000/api/trips/updateTrip/${newTrip.id}`,
//           newTrip,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         setTrips(
//           trips.map((trip) =>
//             trip.id === newTrip.id ? res.data.trip : trip
//           )
//         );
//         setIsEditing(false);
//       } else {
//         const res = await axios.post(
//           "http://localhost:5000/api/trips/addTrip",
//           { ...newTrip, agencyId: Number(agencyId) }, // 👈 important
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         setTrips([...trips, res.data.trip]);
//       }

//       setShowModal(false);
//       setNewTrip({
//         id: 0,
//         from: "",
//         to: "",
//         depart: "",
//         mode: "Bus",
//         classType: "Economy",
//         price: 0,
//         seatsAvailable: 0,
//       });
//     } catch (err: any) {
//       alert(err.response?.data?.message || err.message);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this trip?")) return;

//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:5000/api/trips/deleteTrip/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTrips(trips.filter((trip) => trip.id !== id));
//     } catch (err: any) {
//       alert(err.response?.data?.message || err.message);
//     }
//   };

//   const handleEdit = (trip: Trip) => {
//     setNewTrip(trip);
//     setIsEditing(true);
//     setShowModal(true);
//   };

//   // Filter trips based on search
//   const filteredTrips = trips.filter(
//     (trip) =>
//       trip.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       trip.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       trip.mode.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="space-y-10">
//       {/* Search + Add Button */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         {/* Heading */}
//       <div>
//         <h1 className="text-2xl font-bold">Trips Detail</h1>
//         <p className="text-gray-600 mt-2">
//           Plan, manage, and organize all your bus and train trips in one place.
//         </p>
//       </div>
//         <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
//           <div className="relative w-full sm:w-64">
//             <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
//             <input
//               type="text"
//               placeholder="Search trips..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
//             />
//           </div>
//           <button
//             onClick={() => {
//               setIsEditing(false);
//               setShowModal(true);
//             }}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
//           >
//             <MdAddCircle className="w-5 h-5" />
//             Add Trip
//           </button>
//         </div>
//       </div>

//       {/* Trips */}
//       <div>
//         <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">
//           Available Trips
//         </h2>

//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
//           </div>
//         ) : error ? (
//           <div className="text-red-500">{error}</div>
//         ) : filteredTrips.length === 0 ? (
//           <div className="text-gray-600 text-sm">No trips found.</div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
//             {filteredTrips.map((trip) => (
//               <div
//                 key={trip.id}
//                 className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border border-blue-100 flex flex-col justify-between"
//               >
//                 {/* Trip Info */}
//                 <div>
//                   <div className="flex items-center justify-between mb-1">
//                     <div className="font-semibold text-gray-900">
//                       {trip.mode} Trip
//                     </div>
//                     <div className="text-xs sm:text-sm text-gray-600 font-mono">
//                       {new Date(trip.depart).toLocaleDateString("en-GB")}
//                     </div>
//                   </div>
//                   <div className="text-xl font-bold text-gray-900">
//                     {trip.from} → {trip.to}
//                   </div>
//                   <div className="mt-1 text-sm text-gray-700">
//                     Class: {trip.classType}
//                   </div>
//                   <div className="mt-3 font-semibold text-gray-900">
//                     Price: PKR {trip.price.toLocaleString()}
//                   </div>
//                   {/* <div className="mt-1 text-sm text-gray-700">
//                     Seats Available: {trip.seatsAvailable}
//                   </div> */}
//                 </div>

//                 {/* Buttons Bottom Right
//                 <div className="flex justify-end gap-3">
//                   <button
//                     onClick={() => handleEdit(trip)}
//                     className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600"
//                   >
//                     <FiEdit className="text-lg" />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(trip.id)}
//                     className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
//                   >
//                     <FiTrash2 className="text-lg" />
//                   </button>
//                 </div> */}
//                 <div className="flex items-center justify-between">
//                 <div className="text-sm text-gray-700">
//                   Seats Available: {trip.seatsAvailable}
//                 </div>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => handleEdit(trip)}
//                     className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600"
//                   >
//                   <FiEdit className="text-lg" />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(trip.id)}
//                     className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
//                   >
//                   <FiTrash2 className="text-lg" />
//                   </button>
//                </div>
//             </div>
//             </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
//             <h2 className="text-lg font-bold mb-4 text-blue-600">
//               {isEditing ? "Update Trip" : "Add New Trip"}
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <input
//                   type="text"
//                   name="from"
//                   placeholder="From"
//                   value={newTrip.from}
//                   onChange={handleChange}
//                   className="p-2 border rounded"
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="to"
//                   placeholder="To"
//                   value={newTrip.to}
//                   onChange={handleChange}
//                   className="p-2 border rounded"
//                   required
//                 />
//               </div>
//               <input
//                 type="datetime-local"
//                 name="depart"
//                 value={newTrip.depart}
//                 onChange={handleChange}
//                 className="p-2 border rounded w-full"
//                 required
//               />
//               <div className="grid grid-cols-2 gap-4">
//                 <select
//                   name="mode"
//                   value={newTrip.mode}
//                   onChange={handleChange}
//                   className="p-2 border rounded"
//                 >
//                   <option value="Bus">Bus</option>
//                   <option value="Train">Train</option>
//                 </select>
//                 <select
//                   name="classType"
//                   value={newTrip.classType}
//                   onChange={handleChange}
//                   className="p-2 border rounded"
//                 >
//                   <option value="Economy">Economy</option>
//                   <option value="Business">Business</option>
//                 </select>
//               </div>
//               <input
//                 type="number"
//                 name="price"
//                 placeholder="Price"
//                 value={newTrip.price}
//                 onChange={handleChange}
//                 className="p-2 border rounded w-full"
//                 required
//               />
//               <input
//                 type="number"
//                 name="seatsAvailable"
//                 placeholder="Seats Available"
//                 value={newTrip.seatsAvailable}
//                 onChange={handleChange}
//                 className="p-2 border rounded w-full"
//                 required
//               />
//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="px-4 py-2 border rounded-lg"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg"
//                 >
//                   {isEditing ? "Update Trip" : "Save Trip"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import { MdAddCircle } from "react-icons/md";

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
  agencyId?: number;
};

export default function TripDetail() {
  const params = useParams();
  const agencyId = params.agencyId as string;

  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [role, setRole] = useState<string | null>(null); // 👈 role state

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  

  const [newTrip, setNewTrip] = useState<Trip>({
    id: 0,
    from: "",
    to: "",
    depart: "",
    mode: "Bus",
    classType: "Economy",
    price: 0,
    seatsAvailable: 0,
  });

  // Load trips
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedRole = localStorage.getItem("role"); // 👈 role localStorage se
        setRole(storedRole);

        let url = "";
        if (storedRole === "agency_admin") {
          url = `http://localhost:5000/api/trips/getAllTrips?agencyId=${agencyId}`;
        } else if (storedRole === "booking_agent") {
          url = "http://localhost:5000/api/trips/bookingAgentTrips";
        }

        if (!url) return;

        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTrips(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, [agencyId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewTrip({ ...newTrip, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (isEditing) {
        const res = await axios.put(
          `http://localhost:5000/api/trips/updateTrip/${newTrip.id}`,
          newTrip,
          {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          }
        );
        setTrips(trips.map((trip) => (trip.id === newTrip.id ? res.data.trip : trip)));
        setIsEditing(false);
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/trips/addTrip",
          { ...newTrip, agencyId: Number(agencyId) },
          {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          }
        );
        setTrips([...trips, res.data.trip]);
      }

      setShowModal(false);
      setNewTrip({
        id: 0,
        from: "",
        to: "",
        depart: "",
        mode: "Bus",
        classType: "Economy",
        price: 0,
        seatsAvailable: 0,
      });
    } catch (err: any) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this trip?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/trips/deleteTrip/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrips(trips.filter((trip) => trip.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const handleEdit = (trip: Trip) => {
    setNewTrip(trip);
    setIsEditing(true);
    setShowModal(true);
  };

  // Filter trips
  const filteredTrips = trips.filter(
    (trip) =>
      trip.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.mode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {role === "agency_admin" && (
        <>
          {/* Admin UI (unchanged) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Trips Detail</h1>
              <p className="text-gray-600 mt-2">
                Plan, manage, and organize all your bus and train trips in one place.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search trips..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                />
              </div>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setShowModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
              >
                <MdAddCircle className="w-5 h-5" />
                Add Trip
              </button>
            </div>
          </div>

          {/* Trips List */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">Available Trips</h2>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : filteredTrips.length === 0 ? (
              <div className="text-gray-600 text-sm">No trips found.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {filteredTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border border-blue-100 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-semibold text-gray-900">{trip.mode} Trip</div>
                        <div className="text-xs sm:text-sm text-gray-600 font-mono">
                          {new Date(trip.depart).toLocaleDateString("en-GB")}
                        </div>
                      </div>
                      <div className="text-xl font-bold text-gray-900">
                        {trip.from} → {trip.to}
                      </div>
                      <div className="mt-1 text-sm text-gray-700">Class: {trip.classType}</div>
                      <div className="mt-3 font-semibold text-gray-900">
                        Price: PKR {trip.price.toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="text-sm text-gray-700">
                        Seats Available: {trip.seatsAvailable}
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(trip)}
                          className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600"
                        >
                          <FiEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleDelete(trip.id)}
                          className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                        >
                          <FiTrash2 className="text-lg" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

{role === "booking_agent" && (
  <div className="space-y-4">
    {/* Heading + Search Bar in one row */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
        Available Trips
      </h2>

      {/* 🔍 Search bar */}
      <div className="relative w-full sm:w-64">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        <input
          type="text"
          placeholder="Search trips..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
        />
      </div>
    </div>

    {loading ? (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-blue-600"></div>
      </div>
    ) : error ? (
      <div className="text-red-500">{error}</div>
    ) : filteredTrips.length === 0 ? (
      // ✅ trips → filteredTrips
      <div className="text-gray-600 text-sm">No trips found.</div>
    ) : (
      <div className="grid gap-3">
        {filteredTrips.map((trip) => (
          // ✅ trips → filteredTrips
          <div
            key={trip.id}
            className="bg-white rounded-lg shadow p-5 flex justify-between items-center hover:shadow-lg hover:bg-blue-50 transition cursor-pointer"
          >
            {/* Left Section */}
            <div>
              <div className="font-semibold text-gray-800 text-lg">
                {trip.from} → {trip.to}
              </div>

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
              <div className="text-lg font-bold text-gray-800">
                PKR {trip.price}
              </div>
              <div className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                {trip.classType}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)}

      {/* Modal (only admin uses it) */}
      {role === "agency_admin" && showModal && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4 text-blue-600">
              {isEditing ? "Update Trip" : "Add New Trip"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="from"
                  placeholder="From"
                  value={newTrip.from}
                  onChange={handleChange}
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="to"
                  placeholder="To"
                  value={newTrip.to}
                  onChange={handleChange}
                  className="p-2 border rounded"
                  required
                />
              </div>
              <input
                type="datetime-local"
                name="depart"
                value={newTrip.depart}
                onChange={handleChange}
                className="p-2 border rounded w-full"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <select
                  name="mode"
                  value={newTrip.mode}
                  onChange={handleChange}
                  className="p-2 border rounded"
                >
                  <option value="Bus">Bus</option>
                  <option value="Train">Train</option>
                </select>
                <select
                  name="classType"
                  value={newTrip.classType}
                  onChange={handleChange}
                  className="p-2 border rounded"
                >
                  <option value="Economy">Economy</option>
                  <option value="Business">Business</option>
                </select>
              </div>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={newTrip.price}
                onChange={handleChange}
                className="p-2 border rounded w-full"
                required
              />
              <input
                type="number"
                name="seatsAvailable"
                placeholder="Seats Available"
                value={newTrip.seatsAvailable}
                onChange={handleChange}
                className="p-2 border rounded w-full"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  {isEditing ? "Update Trip" : "Save Trip"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
