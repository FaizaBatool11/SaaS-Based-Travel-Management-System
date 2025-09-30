"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";  // ✅ useParams import
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import axios, { AxiosError } from "axios";

interface AgencyFormData {
  name: string;
  phone: string;
  address: string;
}

export default function AddAgencyPage() {
  const router = useRouter();
  const params = useParams();
  // const agencyId = params?.agencyId as string; // ✅ dynamic id

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<AgencyFormData>({
    name: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/Login");
    }
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (!token) {
        alert("🚪 Please login first (no token found).");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/agencies",
        { ...formData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Agency created successfully!");

      if (res.data.agency?.id) {
        localStorage.setItem("agencyId", res.data.agency.id);
      }

      // ✅ Redirect to admin dashboard of that agency
      router.push(`/Admin/${res.data.agency.id}`);

      setIsOpen(false);
      setFormData({ name: "", phone: "", address: "" });
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      if (err.response) {
        alert(`❌ ${err.response.data?.message || "Server error"}`);
      } else if (err.request) {
        alert("❌ No response from server.");
      } else {
        alert(`❌ ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Navbar */}
      <header className="bg-gradient-to-b from-blue-50 to-white flex justify-between items-center px-8 py-4 shadow-sm">
        <div className="flex items-center space-x-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/69/69906.png"
            alt="RideWay Logo"
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

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow px-4 text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to{" "}
          <span className="text-blue-600">Agency Management</span>
        </motion.h1>

        <motion.p
          className="max-w-xl text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Add your agency details and start managing trips, approvals, and receipts with ease.
        </motion.p>

        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg font-semibold hover:bg-blue-700 transition"
        >
          Add Your Agency
        </motion.button>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-8 shadow-lg w-96 text-left"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">
                Add Your Agency
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" placeholder="Agency Name" value={formData.name} onChange={handleChange} className="w-full border rounded-lg p-2" required />
                <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full border rounded-lg p-2" required />
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full border rounded-lg p-2" required />

                <div className="flex justify-end space-x-2">
                  <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                    Cancel
                  </button>
                  <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
