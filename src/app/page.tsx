"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { TicketIcon, CheckBadgeIcon, ReceiptRefundIcon } from "@heroicons/react/24/outline"; // Added icons

export default function LandingPage() {
  const features = [
    {
      title: "Book Trips",
      desc: "Easily search and book available bus and train trips.",
      icon: TicketIcon,
      label: "Booking",
    },
    {
      title: "Get Approvals",
      desc: "Submit and track trip approvals seamlessly.",
      icon: CheckBadgeIcon,
      label: "Approvals",
    },
    {
      title: "Generate Receipts",
      desc: "Download receipts instantly after booking.",
      icon: ReceiptRefundIcon,
      label: "Receipts",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 shadow-sm">
        <div className="flex items-center space-x-2">
          {/* Placeholder Logo Icon (bus+train idea) */}
          <Image
            src="https://cdn-icons-png.flaticon.com/512/69/69906.png"
            alt="RideWay Logo"
            width={32}   // h-8 = 32px
            height={32}  // w-8 = 32px
            className="h-8 w-8"
          />
          <h1 className="text-xl font-bold text-blue-600 leading-tight">
            RideWay <br />
            <span className="text-gray-800 text-lg">Travels</span>
          </h1>
        </div>
        <nav className="space-x-4">
          <Link href="/Login" className="text-gray-700 hover:text-blue-600">
            Login
          </Link>
          <Link
            href="/Signup"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Signup
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 py-12 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            Simplify Your <span className="text-blue-600">Travel Management</span>
          </h2>
          <p className="text-lg text-gray-600">
            Manage trips, approvals, and receipts for your agency all in one place.
            Fast, efficient, and tailored for bus and train travel.
          </p>
          <div className="space-x-4">
            <Link
              href="/Signup"
              className="bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Signup
            </Link>
            <Link
              href="/Login"
              className="border border-blue-600 text-blue-600 px-5 py-3 rounded-lg font-medium hover:bg-blue-50 transition"
            >
              Login
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex justify-center"
        >
          <img
            src="https://img.freepik.com/free-photo/morskie-oko-tatry_1204-510.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Travel illustration"
            className="rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="pt-6 pb-12">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <motion.h2
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-extrabold text-blue-600 leading-tight"
    >
      Our Features
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="text-gray-600 mt-2 text-lg"
    >
      Everything you need to make your travel process smooth and hassle-free.
    </motion.p>
  </div>

  <div className="max-w-6xl mx-auto px-6 mt-12 grid md:grid-cols-3 gap-8">
    {features.map((feature, index) => {
      const Icon = feature.icon;
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true }}
          className="p-6 border rounded-lg shadow-md bg-white hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full mx-auto">
            <Icon className="h-8 w-8 text-blue-600" />
          </div>
          <span className="mt-4 inline-block text-sm font-semibold text-blue-500 uppercase tracking-wide">
            {feature.label}
          </span>
          <h3 className="text-xl font-semibold text-gray-800 mt-1">
            {feature.title}
          </h3>
          <p className="text-gray-600 mt-2">{feature.desc}</p>
        </motion.div>
      );
    })}
  </div>
</section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-4 mt-auto">
        © {new Date().getFullYear()} Travel Management System. All rights reserved.
      </footer>
    </div>
  );
}
