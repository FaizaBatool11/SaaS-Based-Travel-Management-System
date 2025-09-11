// "use client";

// import React, { useState, useEffect } from "react";
// import { FiSearch } from "react-icons/fi";
// import { MdAddCircle } from "react-icons/md";
// import axios from "axios";

// export default function BookingsPage() {
//   // API se data
//   const [trips, setTrips] = useState<any[]>([]);
//   const [passengers, setPassengers] = useState<any[]>([]);

//   // Local state
//   const [bookings, setBookings] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   // Form fields
//   const [selectedTrip, setSelectedTrip] = useState("");
//   const [selectedPassenger, setSelectedPassenger] = useState("");
//   const [seats, setSeats] = useState("");

//   // 🔹 API Calls for trips & passengers
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     const fetchTrips = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/trips/getAllTrips", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setTrips(res.data);
//       } catch (err) {
//         console.error("Error fetching trips:", err);
//       }
//     };

//     const fetchPassengers = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/passengers/getAllPassengers", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setPassengers(res.data);
//       } catch (err) {
//         console.error("Error fetching passengers:", err);
//       }
//     };

//     fetchTrips();
//     fetchPassengers();
//   }, []);

//   // 🔹 Handle Add Booking (local only for now)
//   const handleAddBooking = () => {
//     if (!selectedTrip || !selectedPassenger || !seats) {
//       alert("All fields are required!");
//       return;
//     }

//     const newBooking = {
//       id: bookings.length + 1,
//       trip: trips.find((t) => t.id === parseInt(selectedTrip))?.name || "Unknown Trip",
//       passenger: passengers.find((p) => p.id === parseInt(selectedPassenger))?.name || "Unknown Passenger",
//       seats,
//     };

//     setBookings([...bookings, newBooking]);
//     setShowModal(false);
//     setSelectedTrip("");
//     setSelectedPassenger("");
//     setSeats("");
//   };

//   // 🔹 Filtered bookings
//   const filteredBookings = bookings.filter(
//     (b) =>
//       b.passenger.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       b.trip.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="space-y-10">
//       {/* Header with Search + Add Button */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold">Bookings</h1>
//           <p className="text-gray-600 mt-2">
//             Easily add, update, and organize your bookings to keep every journey hassle-free.
//           </p>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
//           <div className="relative w-full sm:w-64">
//             <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
//             <input
//               type="text"
//               placeholder="Search bookings..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
//             />
//           </div>

//           <button
//             onClick={() => setShowModal(true)}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
//           >
//             <MdAddCircle className="w-5 h-5" />
//             Add Booking
//           </button>
//         </div>
//       </div>

//       {/* Bookings Table */}
//       <div className="bg-white shadow rounded-lg overflow-hidden">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="p-3 border-b">ID</th>
//               <th className="p-3 border-b">Passenger</th>
//               <th className="p-3 border-b">Trip</th>
//               <th className="p-3 border-b">Seats</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredBookings.length > 0 ? (
//               filteredBookings.map((booking) => (
//                 <tr key={booking.id} className="hover:bg-gray-50">
//                   <td className="p-3 border-b">{booking.id}</td>
//                   <td className="p-3 border-b">{booking.passenger}</td>
//                   <td className="p-3 border-b">{booking.trip}</td>
//                   <td className="p-3 border-b">{booking.seats}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={4} className="p-4 text-center text-gray-500">
//                   No bookings found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Add Booking Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
//             <h2 className="text-lg font-bold mb-4">Add Booking</h2>

//             {/* Passenger Dropdown */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-1">Passenger</label>
//               <select
//                 value={selectedPassenger}
//                 onChange={(e) => setSelectedPassenger(e.target.value)}
//                 className="w-full border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
//               >
//                 <option value="">Select Passenger</option>
//                 {passengers.map((p) => (
//                   <option key={p.id} value={p.id}>
//                     {p.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Trip Dropdown */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-1">Trip</label>
//               <select
//                 value={selectedTrip}
//                 onChange={(e) => setSelectedTrip(e.target.value)}
//                 className="w-full border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
//               >
//                 <option value="">Select Trip</option>
//                 {trips.map((t) => (
//                   <option key={t.id} value={t.id}>
//                     {t.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Seats Input */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-1">Seats</label>
//               <input
//                 type="number"
//                 value={seats}
//                 onChange={(e) => setSeats(e.target.value)}
//                 className="w-full border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 placeholder="Enter number of seats"
//               />
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 rounded-lg border"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAddBooking}
//                 className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
//               >
//                 Save Booking
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { MdAddCircle } from "react-icons/md";
import axios from "axios";

export default function BookingsPage() {
  const [trips, setTrips] = useState<any[]>([]);
  const [passengers, setPassengers] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [selectedTrip, setSelectedTrip] = useState("");
  const [selectedPassenger, setSelectedPassenger] = useState("");
  const [seats, setSeats] = useState("");

  const token = localStorage.getItem("token");

  // 🔹 Fetch trips, passengers, bookings
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/trips/getAllTrips", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTrips(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchPassengers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/passengers/getAllPassengers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPassengers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/booking", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTrips();
    fetchPassengers();
    fetchBookings();
  }, []);

  // 🔹 Add Booking
  const handleAddBooking = async () => {
    if (!selectedTrip || !selectedPassenger || !seats) {
      alert("All fields are required!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/booking",
        {
          tripId: selectedTrip,
          passengerId: selectedPassenger,
          seats,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings([res.data, ...bookings]);
      setShowModal(false);
      setSelectedTrip("");
      setSelectedPassenger("");
      setSeats("");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Error adding booking");
    }
  };

  // 🔹 Update Status
  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/booking/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings(bookings.map((b) => (b.id === id ? res.data : b)));
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
  };

  const filteredBookings = bookings.filter(
    (b) =>
      b.passenger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.trip.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Bookings</h1>
          <p className="text-gray-600 mt-2">
            Manage your bookings. New bookings are automatically pending.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            <MdAddCircle className="w-5 h-5" />
            Add Booking
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b">ID</th>
              <th className="p-3 border-b">Passenger</th>
              <th className="p-3 border-b">Trip</th>
              <th className="p-3 border-b">Seats</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{b.id}</td>
                  <td className="p-3 border-b">{b.passenger.name}</td>
                  <td className="p-3 border-b">{b.trip.name}</td>
                  <td className="p-3 border-b">{b.seats}</td>
                  <td className="p-3 border-b capitalize">{b.status}</td>
                  <td className="p-3 border-b flex gap-2">
                    {b.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(b.id, "confirmed")}
                          className="px-2 py-1 bg-green-600 text-white rounded"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => updateStatus(b.id, "cancelled")}
                          className="px-2 py-1 bg-red-600 text-white rounded"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {b.status !== "pending" && <span className="text-gray-500">No actions</span>}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Add Booking</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Passenger</label>
              <select
                value={selectedPassenger}
                onChange={(e) => setSelectedPassenger(e.target.value)}
                className="w-full border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Passenger</option>
                {passengers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Trip</label>
              <select
                value={selectedTrip}
                onChange={(e) => setSelectedTrip(e.target.value)}
                className="w-full border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Trip</option>
                {trips.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Seats</label>
              <input
                type="number"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                className="w-full border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter number of seats"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg border">
                Cancel
              </button>
              <button
                onClick={handleAddBooking}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Save Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
