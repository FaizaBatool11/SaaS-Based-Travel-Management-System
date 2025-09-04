// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FiSearch } from "react-icons/fi";

// type Trip = {
//   id: number;
//   from: string;
//   to: string;
//   depart: string;
//   mode: string; // Bus / Train
// };

// export default function TripsPage() {
//   const [trips, setTrips] = useState<Trip[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);

//   // API call
//   useEffect(() => {
//     const fetchTrips = async () => {
//       try {
//         const token = localStorage.getItem("token"); // get token
//         if (!token) {
//           console.error("No token found. Please login.");
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get(
//           `http://localhost:5000/api/trips/bookingAgentTrips`,
//           {
//             headers: { Authorization: `Bearer ${token}` }, // send token
//           }
//         );

//         setTrips(res.data);
//       } catch (err) {
//         console.error("Error fetching trips:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrips();
//   }, []);

//   // Filter trips based on search
//   const filteredTrips = trips.filter(
//     (trip) =>
//       trip.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       trip.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       trip.mode.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="w-full min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white px-6 py-4 shadow-sm">
//         <h1 className="text-2xl font-bold text-gray-800">Trips</h1>
//         <p className="text-gray-600 text-sm">
//           Browse all available trips and stay updated with journey details in one place.
//         </p>
//       </div>

//       <main className="p-6 space-y-6">
//         {/* Search bar */}
//         <div className="relative w-full sm:w-72">
//           <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
//           <input
//             type="text"
//             placeholder="Search trips..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//           />
//         </div>

//         {/* Trips List */}
//         {loading ? (
//           <p className="text-gray-500">Loading trips...</p>
//         ) : filteredTrips.length > 0 ? (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {filteredTrips.map((trip) => (
//               <div
//                 key={trip.id}
//                 className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
//               >
//                 <h2 className="font-semibold text-gray-800 text-lg">
//                   {trip.from} → {trip.to}
//                 </h2>
//                 <p className="text-sm text-gray-600">
//                   {new Date(trip.depart).toLocaleDateString()} | {new Date(trip.depart).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                 </p>
//                 <span className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600">
//                   {trip.mode}
//                 </span>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No trips found.</p>
//         )}
//       </main>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { useParams } from "next/navigation";

type Trip = {
  id: number;
  from: string;
  to: string;
  depart: string;
  mode: string; // Bus / Train
  agency?: {
    id: number;
    name: string;
  };
};

export default function TripsPage() {
  const params = useParams();
  const agencyId = params?.agencyId ? Number(params.agencyId) : null;

  const [trips, setTrips] = useState<Trip[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!agencyId) return; // don't fetch if no agencyId

    const fetchTrips = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found. Please login.");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `http://localhost:5000/api/trips/bookingAgentTrips?agencyId=${agencyId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTrips(res.data);
      } catch (err) {
        console.error("Error fetching trips:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [agencyId]);

  // Filter trips based on search term
  const filteredTrips = trips.filter(
    (trip) =>
      trip.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.mode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Trips</h1>
        <p className="text-gray-600 text-sm">
          Browse all available trips and stay updated with journey details in one place.
        </p>
      </div>

      <main className="p-6 space-y-6">
        {/* Search bar */}
        <div className="relative w-full sm:w-72">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search trips..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Trips List */}
        {loading ? (
          <p className="text-gray-500">Loading trips...</p>
        ) : filteredTrips.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTrips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
              >
                <h2 className="font-semibold text-gray-800 text-lg">
                  {trip.from} → {trip.to}
                </h2>
                <p className="text-sm text-gray-600">
                  {new Date(trip.depart).toLocaleDateString()} |{" "}
                  {new Date(trip.depart).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                {trip.agency && (
                  <p className="text-xs text-gray-500 mt-1">
                    Agency: {trip.agency.name}
                  </p>
                )}
                <span className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600">
                  {trip.mode}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No trips found.</p>
        )}
      </main>
    </div>
  );
}
