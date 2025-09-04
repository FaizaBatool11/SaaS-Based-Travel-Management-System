import { Bell, Settings, Users, Bus, Ticket, CreditCard } from "lucide-react";

export default function BookingDashboard() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header (Top Bar) */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        {/* Left Side -> Dashboard Title */}
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

        {/* Right Side -> Icons */}
        <div className="flex items-center gap-6">
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
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Welcome back, Booking Agent 👋
          </h2>
          <p className="text-gray-500 text-sm">
            Here’s a quick overview of your travel management system.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Passengers */}
          <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
              <Users size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">1,250</h3>
              <p className="text-gray-500 text-sm">Passengers</p>
            </div>
          </div>

          {/* Trips */}
          <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition">
            <div className="p-3 bg-green-100 text-green-600 rounded-full">
              <Bus size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">320</h3>
              <p className="text-gray-500 text-sm">Trips</p>
            </div>
          </div>

          {/* Bookings */}
          <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition">
            <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
              <Ticket size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">980</h3>
              <p className="text-gray-500 text-sm">Bookings</p>
            </div>
          </div>

          {/* Payments */}
          <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
              <CreditCard size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">$12,450</h3>
              <p className="text-gray-500 text-sm">Payments</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
