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
  Pie,
  Cell,
  Legend,
  PieChart as RePieChart,
  Label,
} from "recharts";

// Icons
import { Bell, Settings, Bus, Ticket, Users as UsersIcon, Building} from "lucide-react";
import PermissionGate from "@/components/PermissionGate";
import { useAuth } from "@/context/AuthContext";

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

export default function AdminDashboard() {
  const { agencyId: paramAgencyId } = useParams<{ agencyId?: string }>();
  const router = useRouter();

  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [activeAgency, setActiveAgency] = useState<Agency | null>(null);

  // const [role, setRole] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [utilization, setUtilization] = useState<{ bookedSeats: number; availableSeats: number } | null>(null);
  const { user, permissions } = useAuth();

const fetchSeatUtilization = async (agencyId: number) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token missing");

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/seatUtilization/${agencyId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setUtilization(res.data);
  } catch (err) {
    console.error("Error fetching seat utilization:", err);
  }
};

useEffect(() => {
  if (!activeAgency) return;

  fetchTrips(activeAgency.id);
  fetchStats(activeAgency.id);

  // ✅ Only fetch if user has permission
  if (permissions.includes("seat_utilization:view")) {
    fetchSeatUtilization(activeAgency.id);
  }
}, [activeAgency, permissions]);

const fetchTrips = async (agencyId: number) => {
  if (!agencyId) return;
  setLoading(true);
  setError("");

  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token missing");

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/trips/getAllTrips?agencyId=${agencyId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("Trips",res.data);

    setTrips(res.data || []);
  } catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    setError(err.response?.data?.message || "Error fetching trips");
  } else {
    setError("Unknown error occurred");
  }
  } finally {
    setLoading(false);
  }
};

const fetchStats = async (agencyId: number) => {
  if (!agencyId) return;

  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token missing");

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/stats/${agencyId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setStats(res.data);
  } catch (err) {
    console.error("Error fetching stats:", err);
  }
};


useEffect(() => {
  const fetchAgencies = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Always set axios header to latest token
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      let agencyList: Agency[] = [];

      if (permissions.includes("agencies:view")) {
        // Owner → fetch all agencies from backend
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/agencies`);
        agencyList = res.data;
      } else if (user?.agencies) {
        // Manager/Agent → show only own agencies
        agencyList = user.agencies;
      }

      setAgencies(agencyList);

      // Auto-set active agency if none selected
      if (!activeAgency && agencyList.length > 0) {
        const storedId = localStorage.getItem("activeAgencyId");
        const selected =
          agencyList.find(a => a.id.toString() === storedId) || agencyList[0];

        setActiveAgency(selected);
        localStorage.setItem("activeAgencyId", selected.id.toString());
      }

    } catch (err) {
      console.error("Error fetching agencies:", err);
    }
  };

  fetchAgencies();
}, [permissions, user]);


  // ✅ Sync active agency
  useEffect(() => {
    if (agencies.length === 0) return;

    const storedActiveId = localStorage.getItem("activeAgencyId");

    const selectedAgency =
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
  const switchAgencyToken = async () => {
    if (!activeAgency) return;
    const oldToken = localStorage.getItem("token");
    if (!oldToken) return;

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/switchAgency`,
        { agencyId: activeAgency.id },
        { headers: { Authorization: `Bearer ${oldToken}` } }
      );

      localStorage.setItem("token", res.data.token);
      console.log("Switched to agency:", activeAgency.id);

      // ✅ Fetch trips and stats after switching
      fetchTrips(activeAgency.id);
      fetchStats(activeAgency.id);
    } catch (err) {
      console.error("Failed to switch agency:", err);
    }
  };

  switchAgencyToken();
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

  // const statsCards = stats
  //   ? [
  //       { title: "Passengers", value: stats.passengers, icon: UsersIcon, color: "blue" },
  //       { title: "Trips", value: stats.trips, icon: Bus, color: "green" },
  //       { title: "Bookings", value: stats.bookings, icon: Ticket, color: "purple" },
  //     ]
  //   : [];

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
       <div className="flex items-center gap-4">
        {permissions.includes("agencies:view") && agencies.length > 0 ? (
          // ✅ Owner: show dropdown
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
        ) : (
          // ✅ Non-owner: show label with icon
          <span className="flex items-center gap-2 px-4 py-2 bg-white text-gray-800 rounded-md shadow-sm hover:shadow-lg transition transform text-md">
            <Building size={16} className="text-blue-600" />
            {user?.agencies[0]?.name || "No Agency"}
          </span>
        )}

        {/* Notification & Settings buttons */}
        <button className="relative text-gray-600 hover:text-blue-600">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <button className="text-gray-600 hover:text-blue-600">
          <Settings size={22} />
        </button>

        {/* User Avatar with first letter of email */}
        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold cursor-pointer">
          {user?.email?.[0].toUpperCase() || "U"}
        </div>
      </div>
      </div>

      <div className="rounded-2xl p-6 sm:p-8 shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white relative overflow-hidden">
      {/* Background glass/blur effect */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl"></div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Welcome to the Dashboard 👋
        </h2>
        <p className="mt-2 text-sm sm:text-base text-white/90">
          Here’s an overview of your performance and activities.
        </p>
      </div>
    </div>

      <div className="grid grid-cols-4 gap-8">
      {/* Passengers */}
      <PermissionGate required="stats:passengers:view">
        <div className="rounded-2xl bg-white shadow-md p-6 flex items-center gap-5 hover:shadow-lg transition transform">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <UsersIcon size={30} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{stats?.passengers ?? 0}</h3>
            <p className="text-sm font-medium text-gray-500">Passengers</p>
          </div>
        </div>
      </PermissionGate>

      {/* Trips */}
      <PermissionGate required="stats:trips:view">
        <div className="rounded-2xl bg-white shadow-md p-6 flex items-center gap-5 hover:shadow-lg transition transform">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-100 text-green-600">
            <Bus size={30} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{stats?.trips ?? 0}</h3>
            <p className="text-sm font-medium text-gray-500">Trips</p>
          </div>
        </div>
      </PermissionGate>

      {/* Bookings */}
      <PermissionGate required="stats:bookings:view">
        <div className="rounded-2xl bg-white shadow-md p-6 flex items-center gap-5 hover:shadow-lg transition transform">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-100 text-purple-600">
            <Ticket size={30} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{stats?.bookings ?? 0}</h3>
            <p className="text-sm font-medium text-gray-500">Bookings</p>
          </div>
        </div>
      </PermissionGate>

      {/* ✅ Seats Overview */}
      <PermissionGate required="seat_utilization:view">
        <div className="rounded-2xl bg-white shadow-md p-6 flex items-center gap-5 hover:shadow-lg transition transform">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-orange-100 text-orange-600">
            <Bus size={30} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              {utilization
                ? `${utilization.bookedSeats}/${utilization.bookedSeats + utilization.availableSeats}`
                : "0/0"}
            </h3>
            <p className="text-sm font-medium text-gray-500">Seats (Booked/Total)</p>
          </div>
        </div>
      </PermissionGate>
    </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Trips Chart */}
      <PermissionGate required="trips:read">
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">
          Available Trips Overview
        </h2>

        {error && <p className="text-red-600">{error}</p>}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
          </div>
        ) : trips.length === 0 ? (
          <div className="text-gray-600 text-sm">No trips available.</div>
        ) : (
          <div>
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
      </PermissionGate>
      {/* Seat Utilization */}
       <PermissionGate required="seat_utilization:view">
      {utilization && (
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Seat Utilization</h2>
        <ResponsiveContainer width="100%" height={420}>
        <RePieChart>
          <Pie
            data={[
              { name: "Booked Seats", value: utilization.bookedSeats },
              { name: "Available Seats", value: utilization.availableSeats },
            ]}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            label
          >
            <Cell fill="#8884d8" />   {/* Booked */}
            <Cell fill="#82ca9d" />   {/* Available */}
            <Label
              value={`Total: ${utilization.bookedSeats + utilization.availableSeats}`}
              position="center"
              style={{ fontSize: "16px", fontWeight: "bold", fill: "#333" }}
            />
          </Pie>
          <Tooltip />
          <Legend />
        </RePieChart>
      </ResponsiveContainer>
        </div>
      )}
      </PermissionGate>
      </div>
    </div>
  );
}
