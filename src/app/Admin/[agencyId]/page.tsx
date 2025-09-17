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
import { Bell, Settings, Bus, Ticket, CreditCard, Users as UsersIcon, Plus } from "lucide-react";

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

type Stats = {
  passengers: number;
  trips: number;
  bookings: number;
};

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function AdminDashboard() {
  const { agencyId: paramAgencyId } = useParams<{ agencyId?: string }>();
  const router = useRouter();

  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [activeAgency, setActiveAgency] = useState<Agency | null>(null);

  const [role, setRole] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);

  // 🔹 Users state
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  // ✅ Fetch agencies
  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/agencies", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        const data: Agency[] = res.data;
        setAgencies(data);

        if (data.length > 0) {
          setActiveAgency(data[0]);
          localStorage.setItem("activeAgencyId", data[0].id.toString());
        }
      } catch (err) {
        console.error("Error fetching agencies:", err);
      }
    };

    fetchAgencies();
  }, []);

  // ✅ Sync active agency
  useEffect(() => {
    if (agencies.length === 0) return;

    const storedActiveId = localStorage.getItem("activeAgencyId");

    let selectedAgency =
      agencies.find((a) => a.id.toString() === paramAgencyId) ||
      agencies.find((a) => a.id.toString() === storedActiveId) ||
      agencies[0];

    if (!selectedAgency) return;

    setActiveAgency(selectedAgency);
    localStorage.setItem("activeAgencyId", selectedAgency.id.toString());

    if (paramAgencyId !== selectedAgency.id.toString()) {
      router.replace(`/Admin/${selectedAgency.id}`);
    }
  }, [agencies, paramAgencyId, router]);

  // ✅ Switch Agency token
  useEffect(() => {
    const switchAgency = async () => {
      if (!activeAgency) return;
      const oldToken = localStorage.getItem("token");
      if (!oldToken) return;

      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/switchAgency",
          { agencyId: activeAgency.id },
          { headers: { Authorization: `Bearer ${oldToken}` } }
        );

        localStorage.setItem("token", res.data.token);
        console.log("Switched to agency:", activeAgency.id);
      } catch (err) {
        console.error("Failed to switch agency:", err);
      }
    };

    switchAgency();
  }, [activeAgency]);

  // ✅ Fetch trips
  useEffect(() => {
    const fetchTrips = async () => {
      if (!activeAgency) return;

      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/trips/getAllTrips", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTrips(res.data || []);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Error fetching trips");
        setTrips([]);
      } finally {
        setLoading(false);
      }
    };

    if (localStorage.getItem("token")) {
      fetchTrips();
    }
  }, [activeAgency]);

  // ✅ Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      if (!activeAgency) return;
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/dashboard/stats/${activeAgency.id}`,
          { headers: token ? { Authorization: `Bearer ${token}` } : {} }
        );
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, [activeAgency]);

  // ✅ Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      if (!activeAgency) return;
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/users/${activeAgency.id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setUsers(res.data.users || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, [activeAgency]);

  const handleAgencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const agencyIdStr = e.target.value;
    const selected = agencies.find((a) => a.id.toString() === agencyIdStr);
    if (!selected) return;

    setActiveAgency(selected);
    setTrips([]);
    setLoading(true);
    setError("");
    localStorage.setItem("activeAgencyId", selected.id.toString());
    router.push(`/Admin/${selected.id}`);
  };

  const statsCards = stats
    ? [
        { title: "Passengers", value: stats.passengers, icon: UsersIcon },
        { title: "Trips", value: stats.trips, icon: Bus },
        { title: "Bookings", value: stats.bookings, icon: Ticket },
        { title: "Payments", value: "PKR 50,000", icon: CreditCard },
      ]
    : [];

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
              value={activeAgency ? activeAgency.id.toString() : ""}
              onChange={handleAgencyChange}
              className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              {agencies.map((agency) => (
                <option key={agency.id} value={agency.id.toString()}>
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
            F
          </div>
        </div>
      </div>

      {/* Welcome */}
      <div className="rounded-xl p-6 shadow-md bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h2 className="text-xl sm:text-2xl font-semibold">Welcome, Owner 👋</h2>
        <p className="text-sm sm:text-base opacity-90">
          Here’s an overview of your agency’s performance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-8">
        {statsCards.map(({ title, value, icon: Icon }) => (
          <div
            key={title}
            className="rounded-lg bg-white shadow p-6 flex items-center gap-5 hover:shadow-md transition"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Icon size={28} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800">{value}</h3>
              <p className="text-sm font-medium text-gray-500">{title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Users Section */}
      {/* <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
          Agency Users
          </h2>
        </div>

        {users.length === 0 ? (
          <p className="text-gray-600 text-sm">No users found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((u) => (
              <div key={u.id} className="p-4 border rounded-lg bg-white shadow-sm">
                <h3 className="font-semibold">{u.name}</h3>
                <p className="text-sm text-gray-600">{u.email}</p>
                <span className="text-xs text-blue-600">{u.role}</span>
              </div>
            ))}
          </div>
        )}
      </div> */}
      {/* 🔹 Users Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
            Agency Users
          </h2>
        </div>

        {users.length === 0 ? (
          <p className="text-gray-600 text-sm">No users found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users
              .filter((u) => u.role !== "owner") // ✅ owner ko skip kar diya
              .map((u) => (
          <div
            key={u.id}
            className="w-56 bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
          >
            {/* 🔹 Top Banner */}
            <div className="h-20 bg-gradient-to-r from-indigo-500 to-blue-600"></div>

            {/* 🔹 Profile Circle */}
            <div className="flex justify-center -mt-10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg font-bold shadow-md">
                {u.name.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* 🔹 User Info */}
            <div className="text-center mt-3 px-3">
              <h3 className="font-semibold text-gray-800 text-base">{u.name}</h3>
              <p className="text-xs text-gray-500">{u.email}</p>
            </div>

            {/* Divider */}
            {/* <div className="border-t mt-4"></div> */}

            {/* 🔹 Role */}
            <div className="py-3 text-center mb-4">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600 shadow-sm">
                {u.role}
              </span>
            </div>
          </div>
              ))}
          </div>
        )}
      </div>

      {/* Trips Chart */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">
          Available Trips Overview
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
          </div>
        ) : trips.length === 0 ? (
          <div className="text-gray-600 text-sm">No trips available.</div>
        ) : (
          <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-6xl mx-auto overflow-x-auto">
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
                  <Bar dataKey="seats" fill="#4F46E5" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
