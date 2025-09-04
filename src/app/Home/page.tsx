
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TicketIcon,
  CreditCardIcon,
  ReceiptRefundIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

type Mode = "Bus" | "Train";

type Trip = {
  id: string;
  from: string;
  to: string;
  depart: string;
  mode: Mode;
  classType: "Economy" | "Business";
  price: number;
  seatsAvailable: number;
};

type BookingStatus = "Success" | "Pending" | "Cancelled";

type Booking = {
  id: string;
  tripId: string;
  name: string;
  email: string;
  date: string;
  status: BookingStatus;
  amount: number;
};

const SAMPLE_TRIPS: Trip[] = [
  { id: "T1", from: "Lahore", to: "Karachi", depart: "2025-08-20T09:30:00", mode: "Bus", classType: "Economy", price: 4500, seatsAvailable: 12 },
  { id: "T2", from: "Islamabad", to: "Lahore", depart: "2025-08-18T14:00:00", mode: "Train", classType: "Business", price: 1500, seatsAvailable: 5 },
  { id: "T3", from: "Karachi", to: "Hyderabad", depart: "2025-08-19T06:45:00", mode: "Bus", classType: "Economy", price: 800, seatsAvailable: 25 },
];

const SAMPLE_BOOKINGS: Booking[] = [
  { id: "B1", tripId: "T1", name: "Alex Morgan", email: "alex.m@email.com", date: "2025-08-01", status: "Success", amount: 4500 },
  { id: "B2", tripId: "T2", name: "Emily Stone", email: "emstone@email.com", date: "2025-08-02", status: "Success", amount: 1500 },
  { id: "B3", tripId: "T3", name: "Daniel King", email: "danielk@email.com", date: "2025-08-05", status: "Pending", amount: 800 },
  { id: "B4", tripId: "T1", name: "Sarah Lee", email: "sarah@email.com", date: "2025-08-06", status: "Pending", amount: 4500 },
];

const SAMPLE_PAYMENTS = [
  {
    id: "P001",
    name: "Ali Khan",
    tripId: "T1",
    date: "2025-08-10",
    status: "Success",
    amount: 3500,
  },
  {
    id: "P002",
    name: "Sara Ahmed",
    tripId: "T2",
    date: "2025-08-12",
    status: "Pending",
    amount: 4200,
  },
  {
    id: "P003",
    name: "Hassan Raza",
    tripId: "T3",
    date: "2025-08-13",
    status: "Failed",
    amount: 2900,
  },
];


// Sidebar sections rendered in-page (not links)
const SECTIONS = [
  { key: "trip-detail", label: "Trip Detail", icon: TicketIcon },
  { key: "payment", label: "Payment", icon: CreditCardIcon },
  { key: "receipt", label: "Receipt", icon: ReceiptRefundIcon },
  { key: "logout", label: "Logout", icon: ArrowRightOnRectangleIcon },
] as const;

type SectionKey = typeof SECTIONS[number]["key"];

export default function Dashboard() {
  const [trips] = React.useState<Trip[]>(SAMPLE_TRIPS);
  const [activeSection, setActiveSection] = React.useState<SectionKey>("trip-detail");
  const [search, setSearch] = React.useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [desktopNavOpen, setDesktopNavOpen] = React.useState(true);

  const totalBookings = SAMPLE_BOOKINGS.length;
  const totalRevenue = SAMPLE_BOOKINGS.reduce((sum, b) => sum + b.amount, 0);

  // 🔎 Search ONLY filters trips
  const filteredTrips = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return trips;
    return trips.filter((t) => {
      const dateStr = new Date(t.depart).toLocaleDateString("en-GB");
      return (
        t.from.toLowerCase().includes(q) ||
        t.to.toLowerCase().includes(q) ||
        t.mode.toLowerCase().includes(q) ||
        t.classType.toLowerCase().includes(q) ||
        dateStr.toLowerCase().includes(q) ||
        String(t.price).includes(q)
      );
    });
  }, [search, trips]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex">
      {/* Sidebar (Desktop) */}
      <nav
        className={`bg-white text-gray-800 border-r border-blue-100 shadow-sm flex-col justify-between transition-all duration-300 hidden md:flex
        ${desktopNavOpen ? "w-60" : "w-16"}`}
      >
        {/* Header / Toggle */}
        <div className="px-3 py-4 border-b border-blue-100">
          <div className="flex items-center justify-between">
            <div
              className={`font-extrabold tracking-tight text-2xl text-blue-600 overflow-hidden transition-opacity duration-300 ${
                desktopNavOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Travel Managment
            </div>
            <button
              onClick={() => setDesktopNavOpen((v) => !v)}
              aria-label={desktopNavOpen ? "Collapse menu" : "Expand menu"}
              className="rounded focus:outline-none focus:ring-2 focus:ring-blue-400/50"
            >
              {desktopNavOpen ? <XMarkIcon className="h-6 w-6 text-blue-600" /> : <Bars3Icon className="h-6 w-6 text-blue-600" />}
            </button>
          </div>

          {/* Tight spacing: elements sit just under the title */}
        </div>

        {/* Section buttons (no links) */}
        <div className="flex flex-col gap-1 px-2 py-3">
          {SECTIONS.map(({ key, label, icon: Icon }) => {
            const active = activeSection === key;
            return (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                title={!desktopNavOpen ? label : undefined}
                className={`group flex items-center gap-3 rounded-md px-3 py-2 transition-colors
                  ${active ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"}`}
                aria-pressed={active}
              >
                <Icon className={`h-6 w-6 flex-shrink-0 ${active ? "text-blue-700" : "text-blue-600"}`} />
                {desktopNavOpen && <span className="font-medium">{label}</span>}
              </button>
            );
          })}
        </div>

        <div className="px-4 py-4 mt-auto border-t border-blue-100">
          {desktopNavOpen && <div className="text-xs text-gray-500">© {new Date().getFullYear()} Flowa</div>}
        </div>
      </nav>

      {/* Mobile Topbar */}
      <nav className="bg-white text-gray-900 border-b border-blue-100 shadow-sm flex items-center justify-between px-4 py-3 w-full md:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="rounded focus:outline-none focus:ring-2 focus:ring-blue-400/50"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <XMarkIcon className="h-7 w-7 text-blue-600" /> : <Bars3Icon className="h-7 w-7 text-blue-600" />}
          </button>
          <h1 className="text-lg font-extrabold tracking-tight text-blue-600">Travel Managment</h1>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-blue-50">
            <MagnifyingGlassIcon className="h-5 w-5 text-blue-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-blue-50 relative">
            <BellIcon className="h-5 w-5 text-blue-600" />
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full ring-2 ring-white bg-green-400" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu (no search inside) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white text-gray-800 w-full border-b border-blue-100"
          >
            <div className="p-3">
              <div className="flex flex-col gap-1">
                {SECTIONS.map(({ key, label, icon: Icon }) => {
                  const active = activeSection === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setActiveSection(key);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors
                        ${active ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50"}`}
                    >
                      <Icon className="h-6 w-6 text-blue-600" />
                      <span className="font-medium">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {/* Top header with search & profile */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Dashboard</h1>

          <div className="flex items-center gap-3">
            {/* Global search (filters trips ONLY) */}
            <div className="relative hidden md:block">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search trips..."
                className="w-72 rounded-md bg-white border border-blue-200 pl-8 pr-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button className="p-2 rounded-full hover:bg-blue-50">
              <BellIcon className="h-6 w-6 text-blue-600" />
            </button>
          </div>
        </div>

        {/* Show the same search on mobile when Trip Detail is active */}
        {activeSection === "trip-detail" && (
          <div className="md:hidden mb-4">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search trips..."
                className="w-full rounded-md bg-white border border-blue-200 pl-8 pr-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-100">
            <div className="text-sm font-semibold text-blue-700">Total Trips</div>
            <div className="mt-1 text-3xl font-bold text-gray-900">{SAMPLE_TRIPS.length}</div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-100">
            <div className="text-sm font-semibold text-blue-700">Total Bookings</div>
            <div className="mt-1 text-3xl font-bold text-gray-900">{totalBookings}</div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-100">
            <div className="text-sm font-semibold text-blue-700">Total Revenue</div>
            <div className="mt-1 text-3xl font-bold text-gray-900">
              PKR {totalRevenue.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Section renderer */}
        <SectionRenderer activeSection={activeSection} trips={filteredTrips} allTrips={SAMPLE_TRIPS} />
      </main>
    </div>
  );
}

/* ---------------- Section Components ---------------- */

function SectionRenderer({
  activeSection,
  trips,
  allTrips,
}: {
  activeSection: SectionKey;
  trips: Trip[];
  allTrips: Trip[];
}) {
  if (activeSection === "trip-detail") {
    return (
      <div className="space-y-8">
        {/* Trips Grid */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">Available Trips</h2>
          {trips.length === 0 ? (
            <div className="text-gray-600 text-sm">No trips match your search.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {trips.map((trip) => (
                <div
                  key={trip.id}
                  className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border border-blue-100 cursor-pointer"
                >
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
                  <div className="mt-1 text-sm text-gray-700">
                    Seats Available: {trip.seatsAvailable}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Bookings Table */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">Recent Bookings</h2>
          <div className="overflow-x-auto rounded-lg border border-blue-100 shadow-sm bg-white">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Trip</Th>
                  <Th>Date</Th>
                  <Th>Status</Th>
                  <Th align="right">Amount (PKR)</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {SAMPLE_BOOKINGS.map((booking) => {
                  const trip = allTrips.find((t) => t.id === booking.tripId);
                  return (
                    <tr key={booking.id} className="bg-white">
                      <Td className="font-semibold text-gray-900">{booking.name}</Td>
                      <Td className="text-gray-700 font-mono">{booking.email}</Td>
                      <Td>{trip ? `${trip.from} → ${trip.to}` : "Unknown"}</Td>
                      <Td className="text-gray-700">
                        {new Date(booking.date).toLocaleDateString("en-GB")}
                      </Td>
                      <Td>
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${
                            booking.status === "Success"
                              ? "bg-green-100 text-green-800"
                              : booking.status === "Pending"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </Td>
                      <Td align="right" className="font-semibold text-gray-900">
                        {booking.amount.toLocaleString()}
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  }

  if (activeSection === "payment") {
    return (
      // <PlaceholderPanel
      //   title="Payment Center"
      //   subtitle="Review transactions, process refunds, and manage payouts."
      // />
     <section>
  <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">
    Recent Payments
  </h2>
  <div className="overflow-x-auto rounded-lg border border-blue-100 shadow-sm bg-white">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-blue-50">
        <tr>
          <Th>Payment ID</Th>
          <Th>Name</Th>
          <Th>Trip</Th>
          <Th>Date</Th>
          <Th>Status</Th>
          <Th align="right">Amount (PKR)</Th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {SAMPLE_PAYMENTS.map((payment) => {
          const trip = allTrips.find((t) => t.id === payment.tripId);
          return (
            <tr key={payment.id} className="bg-white">
              <Td className="font-semibold text-gray-900">{payment.id}</Td>
              <Td className="text-gray-700 font-mono">{payment.name}</Td>
              <Td>{trip ? `${trip.from} → ${trip.to}` : "Unknown"}</Td>
              <Td className="text-gray-700">
                {new Date(payment.date).toLocaleDateString("en-GB")}
              </Td>
              <Td>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${
                    payment.status === "Success"
                      ? "bg-green-100 text-green-800"
                      : payment.status === "Pending"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {payment.status}
                </span>
              </Td>
              <Td align="right" className="font-semibold text-gray-900">
                {payment.amount.toLocaleString()}
              </Td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</section>
    );
  }

  if (activeSection === "receipt") {
    return (
      <PlaceholderPanel
        title="Receipts"
        subtitle="Generate, download, and send receipts for completed bookings."
      />
    );
  }

  if (activeSection === "logout") {
    return (
      <PlaceholderPanel
        title="Logout"
        subtitle="This is a demo action in-page. Hook this button to your auth logic."
        cta="Sign out"
        onCta={() => alert("Connect this to your sign-out logic.")}
      />
    );
  }

  return null;
}

/* ---------- Small UI helpers ---------- */

function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      scope="col"
      className={`px-4 sm:px-6 py-3 text-${align} text-xs font-semibold text-blue-800 uppercase tracking-wider`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  align = "left",
  className = "",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
  className?: string;
}) {
  return (
    <td
      className={`px-4 sm:px-6 py-3 whitespace-nowrap text-sm text-gray-800 ${
        align === "right" ? "text-right" : "text-left"
      } ${className}`}
    >
      {children}
    </td>
  );
}

function PlaceholderPanel({
  title,
  subtitle,
  cta,
  onCta,
}: {
  title: string;
  subtitle: string;
  cta?: string;
  onCta?: () => void;
}) {
  return (
    <div className="bg-white border border-blue-100 rounded-xl p-6 sm:p-8 shadow-sm">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
      <p className="mt-2 text-gray-600">{subtitle}</p>
      {cta && (
        <button
          onClick={onCta}
          className="mt-4 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {cta}
        </button>
      )}
    </div>
  );
}