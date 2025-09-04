// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { PlusCircle, Search, X, Pencil, Trash2 } from "lucide-react";

// interface Passenger {
//   id: number;
//   name: string;
//   age: number;
//   phone: string;
// }

// export default function PassengersPage() {
//   const [passengers, setPassengers] = useState<Passenger[]>([]);
//   const [showForm, setShowForm] = useState(false);
//   const [name, setName] = useState("");
//   const [age, setAge] = useState<number | "">("");
//   const [phone, setPhone] = useState("");
//   const [search, setSearch] = useState("");
//   const [editId, setEditId] = useState<number | null>(null); // track editing passenger

//   const handleAddPassenger = () => {
//     if (!name || !age || !phone) {
//       alert("All fields are required.");
//       return;
//     }

//     if (editId !== null) {
//       // update passenger
//       setPassengers((prev) =>
//         prev.map((p) =>
//           p.id === editId ? { ...p, name, age: Number(age), phone } : p
//         )
//       );
//       setEditId(null);
//     } else {
//       // add passenger
//       const newPassenger: Passenger = {
//         id: passengers.length + 1,
//         name,
//         age: Number(age),
//         phone,
//       };
//       setPassengers([...passengers, newPassenger]);
//     }

//     // reset form
//     setName("");
//     setAge("");
//     setPhone("");
//     setShowForm(false);
//   };

//   const handleEdit = (id: number) => {
//     const passenger = passengers.find((p) => p.id === id);
//     if (passenger) {
//       setName(passenger.name);
//       setAge(passenger.age);
//       setPhone(passenger.phone);
//       setEditId(passenger.id);
//       setShowForm(true);
//     }
//   };

//   const handleDelete = (id: number) => {
//     if (confirm("Are you sure you want to delete this passenger?")) {
//       setPassengers(passengers.filter((p) => p.id !== id));
//     }
//   };

//   const filteredPassengers = passengers.filter(
//     (p) =>
//       p.name.toLowerCase().includes(search.toLowerCase()) ||
//       p.phone.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="w-full min-h-screen bg-gray-50">
//       {/* Title */}
//       <div className="bg-white px-6 py-4 shadow-sm">
//         <h1 className="text-2xl font-bold text-gray-800">Passengers</h1>
//       </div>
//       <main className="p-6">
//         <p className="text-gray-600 mb-6">
//           Manage and keep track of your passengers easily.
//         </p>

//         {/* Top Actions */}
//         <div className="flex justify-between items-center mb-6 gap-4">
//           {/* Add Passenger Button */}
//           <button
//             onClick={() => {
//               setShowForm(!showForm);
//               setEditId(null);
//               setName("");
//               setAge("");
//               setPhone("");
//             }}
//             className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//           >
//             {showForm ? (
//               <>
//                 <X size={18} />
//                 Close
//               </>
//             ) : (
//               <>
//                 <PlusCircle size={18} />
//                 Add Passenger
//               </>
//             )}
//           </button>

//           {/* Search Bar */}
//           <div className="flex items-center border-2 border-gray-300 rounded-lg px-3 py-2 w-64 bg-white shadow-sm focus-within:border-blue-500">
//             <Search size={22} className="text-gray-400 mr-2" />
//             <input
//               type="text"
//               placeholder="Search passenger..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full outline-none text-sm"
//             />
//           </div>
//         </div>

//         {/* Form */}
//         <AnimatePresence>
//           {showForm && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="bg-white p-5 rounded-xl shadow mb-6"
//             >
//               <h2 className="text-lg font-semibold mb-4">
//                 {editId ? "Edit Passenger" : "Add Passenger Details"}
//               </h2>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-gray-700 mb-1">Name</label>
//                   <input
//                     type="text"
//                     placeholder="Enter name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 mb-1">Age</label>
//                   <input
//                     type="number"
//                     placeholder="Enter age"
//                     value={age}
//                     onChange={(e) =>
//                       setAge(e.target.value ? Number(e.target.value) : "")
//                     }
//                     className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 mb-1">Phone</label>
//                   <input
//                     type="text"
//                     placeholder="Enter phone number"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>

//                 <button
//                   onClick={handleAddPassenger}
//                   className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition"
//                 >
//                   {editId ? "Update Passenger" : "Save Passenger"}
//                 </button>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Passengers Table */}
//         <div className="bg-white rounded-sm shadow overflow-hidden">
//           <table className="w-full text-sm text-left border-collapse">
//             <thead className="bg-gray-100 text-gray-700">
//               <tr>
//                 <th className="px-4 py-3">ID</th>
//                 <th className="px-4 py-3">Name</th>
//                 <th className="px-4 py-3">Age</th>
//                 <th className="px-4 py-3">Phone</th>
//                 <th className="px-4 py-3">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredPassengers.map((p) => (
//                 <tr key={p.id} className="border-t hover:bg-gray-50">
//                   <td className="px-4 py-2">{p.id}</td>
//                   <td className="px-4 py-2">{p.name}</td>
//                   <td className="px-4 py-2">{p.age}</td>
//                   <td className="px-4 py-2">{p.phone}</td>
//                   <td className="px-4 py-2 flex gap-2">
//                     <button
//                       onClick={() => handleEdit(p.id)}
//                       className="p-1 text-blue-600 hover:bg-blue-50 rounded"
//                     >
//                       <Pencil size={18} />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(p.id)}
//                       className="p-1 text-red-600 hover:bg-red-50 rounded"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {filteredPassengers.length === 0 && (
//                 <tr>
//                   <td
//                     colSpan={5}
//                     className="px-4 py-3 text-center text-gray-500"
//                   >
//                     No passengers found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// }

// "use client";
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { PlusCircle, Search, X, Pencil, Trash2 } from "lucide-react";
// import axios from "axios"; // 👈 direct axios import

// interface Passenger {
//   id: number;
//   name: string;
//   age: number;
//   phone: string;
// }

// export default function PassengersPage() {
//   const [passengers, setPassengers] = useState<Passenger[]>([]);
//   const [showForm, setShowForm] = useState(false);
//   const [name, setName] = useState("");
//   const [age, setAge] = useState<number | "">("");
//   const [phone, setPhone] = useState("");
//   const [search, setSearch] = useState("");
//   const [editId, setEditId] = useState<number | null>(null);

//   const BASE_URL = "http://localhost:5000/api/passengers"; // 👈 apna backend base url yahan likho

//   // ✅ Fetch passengers from backend on load
//   useEffect(() => {
//     fetchPassengers();
//   }, []);

//   const fetchPassengers = async () => {
//     try {
//       const res = await axios.get(BASE_URL);
//       setPassengers(res.data);
//     } catch (err) {
//       console.error("Error fetching passengers:", err);
//     }
//   };

//   // ✅ Add / Update passenger
//   const handleAddPassenger = async () => {
//     if (!name || !age || !phone) {
//       alert("All fields are required.");
//       return;
//     }

//     try {
//       if (editId !== null) {
//         await axios.put(`${BASE_URL}/${editId}`, { name, age, phone });
//       } else {
//         await axios.post(BASE_URL, { name, age, phone });
//       }

//       await fetchPassengers();
//       resetForm();
//     } catch (err) {
//       console.error("Error saving passenger:", err);
//     }
//   };

//   // ✅ Delete passenger
//   const handleDelete = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this passenger?")) return;
//     try {
//       await axios.delete(`${BASE_URL}/${id}`);
//       await fetchPassengers();
//     } catch (err) {
//       console.error("Error deleting passenger:", err);
//     }
//   };

//   const handleEdit = (id: number) => {
//     const passenger = passengers.find((p) => p.id === id);
//     if (passenger) {
//       setName(passenger.name);
//       setAge(passenger.age);
//       setPhone(passenger.phone);
//       setEditId(passenger.id);
//       setShowForm(true);
//     }
//   };

//   const resetForm = () => {
//     setName("");
//     setAge("");
//     setPhone("");
//     setEditId(null);
//     setShowForm(false);
//   };

//   const filteredPassengers = passengers.filter(
//     (p) =>
//       p.name.toLowerCase().includes(search.toLowerCase()) ||
//       p.phone.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="w-full min-h-screen bg-gray-50">
//       {/* Title */}
//       <div className="bg-white px-6 py-4 shadow-sm">
//         <h1 className="text-2xl font-bold text-gray-800">Passengers</h1>
//       </div>
//       <main className="p-6">
//         <p className="text-gray-600 mb-6">
//           Manage and keep track of your passengers easily.
//         </p>

//         {/* Top Actions */}
//         <div className="flex justify-between items-center mb-6 gap-4">
//           <button
//             onClick={() => {
//               setShowForm(!showForm);
//               resetForm();
//             }}
//             className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//           >
//             {showForm ? (
//               <>
//                 <X size={18} /> Close
//               </>
//             ) : (
//               <>
//                 <PlusCircle size={18} /> Add Passenger
//               </>
//             )}
//           </button>

//           <div className="flex items-center border-2 border-gray-300 rounded-lg px-3 py-2 w-64 bg-white shadow-sm focus-within:border-blue-500">
//             <Search size={22} className="text-gray-400 mr-2" />
//             <input
//               type="text"
//               placeholder="Search passenger..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full outline-none text-sm"
//             />
//           </div>
//         </div>

//         {/* Form */}
//         <AnimatePresence>
//           {showForm && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="bg-white p-5 rounded-xl shadow mb-6"
//             >
//               <h2 className="text-lg font-semibold mb-4">
//                 {editId ? "Edit Passenger" : "Add Passenger Details"}
//               </h2>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-gray-700 mb-1">Name</label>
//                   <input
//                     type="text"
//                     placeholder="Enter name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 mb-1">Age</label>
//                   <input
//                     type="number"
//                     placeholder="Enter age"
//                     value={age}
//                     onChange={(e) =>
//                       setAge(e.target.value ? Number(e.target.value) : "")
//                     }
//                     className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 mb-1">Phone</label>
//                   <input
//                     type="text"
//                     placeholder="Enter phone number"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>

//                 <button
//                   onClick={handleAddPassenger}
//                   className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition"
//                 >
//                   {editId ? "Update Passenger" : "Save Passenger"}
//                 </button>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Passengers Table */}
//         <div className="bg-white rounded-sm shadow overflow-hidden">
//           <table className="w-full text-sm text-left border-collapse">
//             <thead className="bg-gray-100 text-gray-700">
//               <tr>
//                 <th className="px-4 py-3">ID</th>
//                 <th className="px-4 py-3">Name</th>
//                 <th className="px-4 py-3">Age</th>
//                 <th className="px-4 py-3">Phone</th>
//                 <th className="px-4 py-3">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredPassengers.map((p) => (
//                 <tr key={p.id} className="border-t hover:bg-gray-50">
//                   <td className="px-4 py-2">{p.id}</td>
//                   <td className="px-4 py-2">{p.name}</td>
//                   <td className="px-4 py-2">{p.age}</td>
//                   <td className="px-4 py-2">{p.phone}</td>
//                   <td className="px-4 py-2 flex gap-2">
//                     <button
//                       onClick={() => handleEdit(p.id)}
//                       className="p-1 text-blue-600 hover:bg-blue-50 rounded"
//                     >
//                       <Pencil size={18} />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(p.id)}
//                       className="p-1 text-red-600 hover:bg-red-50 rounded"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {filteredPassengers.length === 0 && (
//                 <tr>
//                   <td
//                     colSpan={5}
//                     className="px-4 py-3 text-center text-gray-500"
//                   >
//                     No passengers found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Search, X, Pencil, Trash2 } from "lucide-react";
import axios from "axios";

interface Passenger {
  id: number;
  name: string;
  age: number;
  phone: string;
}

export default function PassengersPage() {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [phone, setPhone] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // ✅ Token ko safe tarike se set karo
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token");
      setToken(savedToken);
    }
  }, []);

  // ✅ Fetch passengers jab token ready ho
  useEffect(() => {
    if (token) fetchPassengers();
  }, [token]);

  const fetchPassengers = async () => {
    if (!token) return;
    try {
      const res = await axios.get(
        "http://localhost:5000/api/passengers/getAllPassengers",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPassengers(res.data);
    } catch (err) {
      console.error("Error fetching passengers:", err);
    }
  };

  // ✅ Add / Update passenger
  const handleAddPassenger = async () => {
    if (!name || !age || !phone) {
      alert("All fields are required.");
      return;
    }

    // ✅ Age validation
  const ageNum = Number(age);
  if (isNaN(ageNum) || ageNum <= 0) {
    alert("Age must be a positive number.");
    return;
  }

  // ✅ Phone validation
  if (!/^\d{11}$/.test(phone)) {
    alert("Phone must be exactly 11 digits.");
    return;
  }

    try {
      if (!token) return;

      if (editId !== null) {
        await axios.put(
          `http://localhost:5000/api/passengers/updatePassenger/${editId}`,
          { name, age, phone },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/passengers/addPassenger",
          { name, age, phone },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      await fetchPassengers();
      resetForm();
      setShowForm(false); // ✅ form close
    } catch (err) {
      console.error("Error saving passenger:", err);
    }
  };

  // ✅ Delete passenger
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this passenger?")) return;
    try {
      if (!token) return;
      await axios.delete(
        `http://localhost:5000/api/passengers/deletePassenger/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchPassengers();
    } catch (err) {
      console.error("Error deleting passenger:", err);
    }
  };

  const handleEdit = (id: number) => {
    const passenger = passengers.find((p) => p.id === id);
    if (passenger) {
      setName(passenger.name);
      setAge(passenger.age);
      setPhone(passenger.phone);
      setEditId(passenger.id);
      setShowForm(true);
    }
  };

  // ✅ Reset form but form close na ho unnecessarily
  const resetForm = () => {
    setName("");
    setAge("");
    setPhone("");
    setEditId(null);
  };

  const filteredPassengers = passengers.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Title */}
      <div className="bg-white px-6 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Passengers</h1>
      </div>
      <main className="p-6">
        <p className="text-gray-600 mb-6">
          Manage and keep track of your passengers easily.
        </p>

        {/* Top Actions */}
        <div className="flex justify-between items-center mb-6 gap-4">
          <button
            onClick={() => {
              if (showForm) {
                setShowForm(false);
                resetForm();
              } else {
                setShowForm(true);
              }
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            {showForm ? (
              <>
                <X size={18} /> Close
              </>
            ) : (
              <>
                <PlusCircle size={18} /> Add Passenger
              </>
            )}
          </button>

          <div className="flex items-center border-2 border-gray-300 rounded-lg px-3 py-2 w-64 bg-white shadow-sm focus-within:border-blue-500">
            <Search size={22} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search passenger..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none text-sm"
            />
          </div>
        </div>

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white p-5 rounded-xl shadow mb-6"
            >
              <h2 className="text-lg font-semibold mb-4">
                {editId ? "Edit Passenger" : "Add Passenger Details"}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    placeholder="Enter age"
                    value={age}
                    onChange={(e) =>
                      setAge(e.target.value ? Number(e.target.value) : "")
                    }
                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <button
                  onClick={handleAddPassenger}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                  {editId ? "Update Passenger" : "Save Passenger"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Passengers Table */}
        <div className="bg-white rounded-sm shadow overflow-hidden">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Age</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPassengers.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{p.id}</td>
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">{p.age}</td>
                  <td className="px-4 py-2">{p.phone}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(p.id)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPassengers.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-3 text-center text-gray-500"
                  >
                    No passengers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
