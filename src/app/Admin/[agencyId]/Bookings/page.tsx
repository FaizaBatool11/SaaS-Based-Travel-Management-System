"use client";

import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdAddCircle } from "react-icons/md";

export default function BookingsPage() {
  // Mock data (replace with backend API later)
  const trips = [
    { id: 1, name: "Lahore → Karachi Express" },
    { id: 2, name: "Islamabad → Multan Bus" },
    { id: 3, name: "Rawalpindi → Quetta Train" },
  ];

  const passengers = [
    { id: 1, name: "Ali Khan" },
    { id: 2, name: "Sara Ahmed" },
    { id: 3, name: "Bilal Hussain" },
  ];

  // State
  const [bookings, setBookings] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Form fields
  const [selectedTrip, setSelectedTrip] = useState("");
  const [selectedPassenger, setSelectedPassenger] = useState("");
  const [seats, setSeats] = useState("");

  // Handle Add Booking
  const handleAddBooking = () => {
    if (!selectedTrip || !selectedPassenger || !seats) {
      alert("All fields are required!");
      return;
    }

    const newBooking = {
      id: bookings.length + 1,
      trip: trips.find((t) => t.id === parseInt(selectedTrip))?.name,
      passenger: passengers.find((p) => p.id === parseInt(selectedPassenger))?.name,
      seats,
    };

    setBookings([...bookings, newBooking]);
    setShowModal(false);
    setSelectedTrip("");
    setSelectedPassenger("");
    setSeats("");
  };

  // Filtered bookings
  const filteredBookings = bookings.filter(
    (b) =>
      b.passenger.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.trip.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* Header with Search + Add Button on Right */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left Side - Heading */}
        <div>
          <h1 className="text-2xl font-bold">Bookings</h1>
          <p className="text-gray-600 mt-2">
            Easily add, update, and organize your bookings to keep every journey hassle-free.
          </p>
        </div>

        {/* Right Side - Search + Add Button */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
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

        {/* Bookings Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border-b">ID</th>
                <th className="p-3 border-b">Passenger</th>
                <th className="p-3 border-b">Trip</th>
                <th className="p-3 border-b">Seats</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="p-3 border-b">{booking.id}</td>
                    <td className="p-3 border-b">{booking.passenger}</td>
                    <td className="p-3 border-b">{booking.trip}</td>
                    <td className="p-3 border-b">{booking.seats}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      {/* Add Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Add Booking</h2>

            {/* Passenger Dropdown */}
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

            {/* Trip Dropdown */}
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

            {/* Seats Input */}
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

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border"
              >
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
