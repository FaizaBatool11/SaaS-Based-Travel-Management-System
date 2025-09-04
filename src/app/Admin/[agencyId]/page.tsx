"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
import { Bell, Settings, Bus, Ticket, CreditCard } from "lucide-react";

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

export default function AdminDashboard() {
  const { agencyId } = useParams<{ agencyId: string }>();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem("token");
        const agencyId = localStorage.getItem("activeAgencyId");
        const res = await axios.get(
         `http://localhost:5000/api/trips/getAllTrips?agencyId=${agencyId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTrips(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, [agencyId]);

  const stats = [
    { title: "Total Trips", value: trips.length },
    { title: "Total Bookings", value: 4 },
    { title: "Total Revenue", value: "PKR 11,300" },
  ];

  // Chart data mapping
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
      {/* Header with Right Icons */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-6">
          {/* Notification Icon */}
          <button className="relative text-gray-600 hover:text-blue-600">
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Settings Icon */}
          <button className="text-gray-600 hover:text-blue-600">
            <Settings size={22} />
          </button>

          {/* Profile Avatar */}
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold cursor-pointer">
            E
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-md">
        <h2 className="text-xl sm:text-2xl font-semibold">Welcome, Admin 👋</h2>
        <p className="text-sm sm:text-base opacity-90">
          Here’s an overview of your agency’s performance.
        </p>
      </div>

      {/* Stats Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Trips */}
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4 hover:shadow-md transition">
    <div className="p-3 bg-green-100 text-green-600 rounded-full">
      <Bus size={24} />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-800">{trips.length}</h3>
      <p className="text-gray-500 text-sm">Total Trips</p>
    </div>
  </div>

  {/* Bookings */}
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4 hover:shadow-md transition">
    <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
      <Ticket size={24} />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-800">4</h3>
      <p className="text-gray-500 text-sm">Total Bookings</p>
    </div>
  </div>

  {/* Revenue */}
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4 hover:shadow-md transition">
    <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
      <CreditCard size={24} />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-800">PKR 11,300</h3>
      <p className="text-gray-500 text-sm">Total Revenue</p>
    </div>
  </div>
</div>  

      {/* Available Trips - Chart View */}
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
            {/* Scrollable Container */}
            <div style={{ width: chartData.length * 140, minWidth: "100%" }}>
              <ResponsiveContainer width="100%" height={420}>
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    interval={0}
                    tick={({ x, y, payload }) => {
                      const [from, to] = payload.value.split("→");
                      return (
                        <g transform={`translate(${x},${y + 10})`}>
                          <text
                            x={0}
                            y={0}
                            dy={16}
                            textAnchor="middle"
                            fill="#374151"
                            fontSize={12}
                          >
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
                          <h3 className="font-semibold text-gray-800 mb-2">
                            {trip.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Seats:</span>{" "}
                            {trip.seats}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Price:</span> PKR{" "}
                            {trip.price}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Mode:</span>{" "}
                            {trip.mode}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Class:</span>{" "}
                            {trip.classType}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Depart:</span>{" "}
                            {new Date(trip.depart).toLocaleString()}
                          </p>
                        </div>
                      );
                    }}
                  />
                  <Bar
                    dataKey="seats"
                    fill="#4F46E5"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
