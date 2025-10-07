"use client";
import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { MdAddCircle } from "react-icons/md";
import { Pencil, CheckCircle, XCircle } from "lucide-react";
import axios, { AxiosError } from "axios";
import PermissionGate from "@/components/PermissionGate"; // ✅ import kiya

// Interfaces
interface Passenger {
  id: number;
  name: string;
}

interface Trip {
  id: number;
  from: string;
  to: string;
}

interface Booking {
  id: number;
  passenger: Passenger;
  trip: Trip;
  seats: number;
  status: string;
}

export default function BookingsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [selectedTrip, setSelectedTrip] = useState<string>("");
  const [selectedPassenger, setSelectedPassenger] = useState<string>("");
  const [seats, setSeats] = useState<string>("");

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  const [token, setToken] = useState<string | null>(null);

  // Load token
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  // Fetch trips, passengers, bookings
  useEffect(() => {
    if (!token) return;

    const fetchTrips = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/trips/getAllTrips`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTrips(Array.isArray(res.data) ? res.data : res.data.trips || []);
      } catch {
        setTrips([]);
      }
    };

    const fetchPassengers = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/passengers/getAllPassengers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPassengers(Array.isArray(res.data) ? res.data : res.data.passengers || []);
      } catch {
        setPassengers([]);
      }
    };

    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/getAllBookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(Array.isArray(res.data) ? res.data : res.data.bookings || []);
      } catch {
        setBookings([]);
      }
    };

    fetchTrips();
    fetchPassengers();
    fetchBookings();
  }, [token]);

  // Add Booking
  const handleAddBooking = async () => {
    if (!selectedTrip || !selectedPassenger || !seats) {
      alert("All fields are required!");
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/createBooking`,
        {
          tripId: Number(selectedTrip),
          passengerId: Number(selectedPassenger),
          seats: Number(seats),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const passenger = passengers.find((p) => p.id === Number(selectedPassenger));
      const trip = trips.find((t) => t.id === Number(selectedTrip));

      const newBooking: Booking = {
        ...res.data,
        passenger: passenger || { id: Number(selectedPassenger), name: "Unknown" },
        trip: trip || { id: Number(selectedTrip), from: "?", to: "?" },
      };

      setBookings([newBooking, ...bookings]);
      setShowModal(false);
      setSelectedTrip("");
      setSelectedPassenger("");
      setSeats("");
    // } catch (err: any) {
    //   alert(err.response?.data?.message || "Error adding booking");
    // }
    } catch (err) {
  const error = err as AxiosError<{ message?: string }>;
  alert(error.response?.data?.message || "Error adding booking");
}

  };

  // Update Status
  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/updateBooking/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedBooking: Booking = res.data.booking;
      setBookings((prev) => prev.map((b) => (b.id === id ? updatedBooking : b)));
    } catch {
      alert("Error updating status");
    }
  };

  // Update Booking
  const handleUpdateBooking = async () => {
    if (!editingBooking) return;
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/updateBooking/${editingBooking.id}`,
        {
          tripId: editingBooking.trip?.id,
          passengerId: editingBooking.passenger?.id,
          seats: editingBooking.seats,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedBooking: Booking = res.data.booking;
      setBookings((prev) => prev.map((b) => (b.id === updatedBooking.id ? updatedBooking : b)));
      setShowUpdateModal(false);
      setEditingBooking(null);
    } catch {
      alert("Error updating booking");
    }
  };

  const filteredBookings = bookings.filter(
    (b) =>
      b.passenger?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${b.trip?.from} ${b.trip?.to}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Bookings</h1>
          <p className="text-gray-600 mt-2">Manage your bookings.</p>
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

          {/* Add Booking → bookings:create */}
          <PermissionGate required="bookings:create">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            >
              <MdAddCircle className="w-5 h-5" />
              Add Booking
            </button>
          </PermissionGate>
        </div>
      </div>

      {/* Table → bookings:read */}
      <PermissionGate required="bookings:read">
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
                    <td className="p-3 border-b">{b.passenger?.name || "N/A"}</td>
                    <td className="p-3 border-b">
                      {b.trip ? `${b.trip.from} → ${b.trip.to}` : "N/A"}
                    </td>
                    <td className="p-3 border-b">{b.seats}</td>
                    <td className="p-3 border-b capitalize">{b.status}</td>
                    <td className="p-3 border-b flex gap-2">
                      {b.status === "pending" ? (
                        <>
                          {/* Confirm → bookings:update */}
                          <PermissionGate required="bookings:update">
                            <button
                              onClick={() => updateStatus(b.id, "confirmed")}
                              className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 text-green-700"
                              title="Confirm Booking"
                            >
                              <CheckCircle size={16} />
                            </button>
                          </PermissionGate>

                          {/* Cancel → bookings:update */}
                          <PermissionGate required="bookings:cancel">
                            <button
                              onClick={() => updateStatus(b.id, "cancelled")}
                              className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-700"
                              title="Cancel Booking"
                            >
                              <XCircle size={16} />
                            </button>
                          </PermissionGate>

                          {/* Update Booking → bookings:update */}
                          <PermissionGate required="bookings:update">
                            <button
                              onClick={() => {
                                setEditingBooking(b);
                                setShowUpdateModal(true);
                              }}
                              className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-700"
                              title="Update Booking"
                            >
                              <Pencil size={16} />
                            </button>
                          </PermissionGate>
                        </>
                      ) : (
                        <span className="text-gray-500">No actions</span>
                      )}
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
      </PermissionGate>

      {/* Add Booking Modal → bookings:create */}
      {showModal && (
        <PermissionGate required="bookings:create">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-bold mb-4 text-blue-600">Add Booking</h2>

              {/* Passenger */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Passenger</label>
                <select
                  value={selectedPassenger}
                  onChange={(e) => setSelectedPassenger(e.target.value)}
                  className="w-full border p-2 rounded-lg focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Passenger</option>
                  {passengers.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Trip */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Trip</label>
                <select
                  value={selectedTrip}
                  onChange={(e) => setSelectedTrip(e.target.value)}
                  className="w-full border p-2 rounded-lg focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Trip</option>
                  {trips.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.from} → {t.to}
                    </option>
                  ))}
                </select>
              </div>

              {/* Seats */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Seats</label>
                <input
                  type="number"
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                  className="w-full border p-2 rounded-lg focus:ring-1 focus:ring-blue-500"
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
        </PermissionGate>
      )}

      {/* Update Booking Modal → bookings:update */}
      {showUpdateModal && editingBooking && (
        <PermissionGate required="bookings:update">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-bold mb-4">Update Booking</h2>
              {/* Passenger */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Passenger</label>
                <select
                  value={editingBooking.passenger?.id || ""}
                  onChange={(e) =>
                    setEditingBooking({
                      ...editingBooking,
                      passenger: {
                        ...editingBooking.passenger,
                        id: Number(e.target.value),
                        name: passengers.find((p) => p.id === Number(e.target.value))?.name || "",
                      },
                    })
                  }
                  className="w-full border p-2 rounded-lg focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Passenger</option>
                  {passengers.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Trip */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Trip</label>
                <select
                  value={editingBooking.trip?.id || ""}
                  onChange={(e) =>
                    setEditingBooking({
                      ...editingBooking,
                      trip: {
                        ...editingBooking.trip,
                        id: Number(e.target.value),
                        from: trips.find((t) => t.id === Number(e.target.value))?.from || "",
                        to: trips.find((t) => t.id === Number(e.target.value))?.to || "",
                      },
                    })
                  }
                  className="w-full border p-2 rounded-lg focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Trip</option>
                  {trips.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.from} → {t.to}
                    </option>
                  ))}
                </select>
              </div>
              {/* Seats */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Seats</label>
                <input
                  type="number"
                  value={editingBooking.seats}
                  onChange={(e) =>
                    setEditingBooking({ ...editingBooking, seats: Number(e.target.value) })
                  }
                  className="w-full border p-2 rounded-lg focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateBooking}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Update Booking
                </button>
              </div>
            </div>
          </div>
        </PermissionGate>
      )}
    </div>
  );
}
