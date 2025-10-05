// "use client";
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { PlusCircle, Search, X, Pencil, Trash2 } from "lucide-react";
// import axios from "axios";
// import { useParams } from "next/navigation"; // ✅ agencyId lene ke liye

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
//   const [token, setToken] = useState<string | null>(null);

//   // ✅ Next.js hook se agencyId lo (URL me [agencyId] hai)
//   const params = useParams();
//   const agencyId = Number(params?.agencyId);

//   // ✅ Token ko safe tarike se set karo (reactive with storage)
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const savedToken = localStorage.getItem("token");
//       setToken(savedToken);

//       const handleStorageChange = () => {
//         const newToken = localStorage.getItem("token");
//         setToken(newToken);
//       };

//       window.addEventListener("storage", handleStorageChange);
//       return () => window.removeEventListener("storage", handleStorageChange);
//     }
//   }, []);

//   // ✅ Fetch passengers jab token ready ho
//   useEffect(() => {
//     if (token) fetchPassengers();
//   }, [token]);

//   const fetchPassengers = async () => {
//     const freshToken = localStorage.getItem("token");
//     if (!freshToken) return;

//     try {
//       console.log("AgencyId being sent:", agencyId);
//       const res = await axios.get(`http://localhost:5000/api/passengers/getAllPassengers?agencyId=${agencyId}`, {
//         headers: { Authorization: `Bearer ${freshToken}` },
//       });
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

//     const ageNum = Number(age);
//     if (isNaN(ageNum) || ageNum <= 0) {
//       alert("Age must be a positive number.");
//       return;
//     }

//     if (!/^\d{11}$/.test(phone)) {
//       alert("Phone must be exactly 11 digits.");
//       return;
//     }

//     try {
//       const freshToken = localStorage.getItem("token");
//       if (!freshToken) return;

//       if (editId !== null) {
//         // ✅ Update Passenger
//         await axios.put(
//           `http://localhost:5000/api/passengers/updatePassenger/${editId}`,
//           { name, age, phone, agencyId },
//           { headers: { Authorization: `Bearer ${freshToken}` } }
//         );
//       } else {
//         // ✅ Add Passenger
//         await axios.post(
//           "http://localhost:5000/api/passengers/addPassenger",
//           { name, age, phone,agencyId },
//           { headers: { Authorization: `Bearer ${freshToken}` } }
//         );
//       }

//       await fetchPassengers();
//       resetForm();
//       setShowForm(false);
//     } catch (err) {
//       console.error("Error saving passenger:", err);
//     }
//   };

//   // ✅ Delete passenger
//   const handleDelete = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this passenger?")) return;
//     try {
//       const freshToken = localStorage.getItem("token");
//       if (!freshToken) return;

//       await axios.delete(`http://localhost:5000/api/passengers/deletePassenger/${id}`, {
//         headers: { Authorization: `Bearer ${freshToken}` },
//         data: {agencyId},
//       });
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

//   // ✅ Reset form
//   const resetForm = () => {
//     setName("");
//     setAge("");
//     setPhone("");
//     setEditId(null);
//   };

//   const filteredPassengers = passengers.filter(
//     (p) =>
//       p.name.toLowerCase().includes(search.toLowerCase()) ||
//       p.phone.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="space-y-10">
//       {/* Header with Search + Add Button */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold">Passengers</h1>
//           <p className="text-gray-600 mt-2">Manage and keep track of your passengers easily.</p>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
//           {/* Search */}
//           <div className="relative w-full sm:w-64">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
//             <input
//               type="text"
//               placeholder="Search passenger..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
//             />
//           </div>

//           {/* Add Button */}
//           <button
//             onClick={() => {
//               if (showForm) {
//                 setShowForm(false);
//                 resetForm();
//               } else {
//                 setShowForm(true);
//               }
//             }}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
//           >
//             {showForm ? (
//               <>
//                 <X className="w-5 h-5" /> Close
//               </>
//             ) : (
//               <>
//                 <PlusCircle className="w-5 h-5" /> Add Passenger
//               </>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Form */}
//       <AnimatePresence>
//         {showForm && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="bg-white p-5 rounded-xl shadow mb-6"
//           >
//             <h2 className="text-lg font-semibold mb-4">
//               {editId ? "Edit Passenger" : "Add Passenger Details"}
//             </h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-gray-700 mb-1">Name</label>
//                 <input
//                   type="text"
//                   placeholder="Enter name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 mb-1">Age</label>
//                 <input
//                   type="number"
//                   placeholder="Enter age"
//                   value={age}
//                   onChange={(e) =>
//                     setAge(e.target.value ? Number(e.target.value) : "")
//                   }
//                   className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 mb-1">Phone</label>
//                 <input
//                   type="text"
//                   placeholder="Enter phone number"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>

//               <button
//                 onClick={handleAddPassenger}
//                 className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition"
//               >
//                 {editId ? "Update Passenger" : "Save Passenger"}
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Passengers Table */}
//       <div className="bg-white rounded-sm shadow overflow-hidden">
//         <table className="w-full text-sm text-left border-collapse">
//           <thead className="bg-gray-100 text-gray-700">
//             <tr>
//               <th className="px-4 py-3">ID</th>
//               <th className="px-4 py-3">Name</th>
//               <th className="px-4 py-3">Age</th>
//               <th className="px-4 py-3">Phone</th>
//               <th className="px-4 py-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredPassengers.map((p) => (
//               <tr key={p.id} className="border-t hover:bg-gray-50">
//                 <td className="px-4 py-2">{p.id}</td>
//                 <td className="px-4 py-2">{p.name}</td>
//                 <td className="px-4 py-2">{p.age}</td>
//                 <td className="px-4 py-2">{p.phone}</td>
//                 <td className="px-4 py-2 flex gap-2">
//                   <button
//                     onClick={() => handleEdit(p.id)}
//                     className="p-1 text-blue-600 hover:bg-blue-50 rounded"
//                   >
//                     <Pencil size={18} />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(p.id)}
//                     className="p-1 text-red-600 hover:bg-red-50 rounded"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {filteredPassengers.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={5}
//                   className="px-4 py-3 text-center text-gray-500"
//                 >
//                   No passengers found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useCallback, useState, useEffect } from "react";
import { PlusCircle, Search, X, Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { useParams } from "next/navigation"; // ✅ agencyId lene ke liye
import PermissionGate from "@/components/PermissionGate"; // ✅ PermissionGate import karo

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

  const params = useParams();
  const agencyId = Number(params?.agencyId);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token");
      setToken(savedToken);

      const handleStorageChange = () => {
        const newToken = localStorage.getItem("token");
        setToken(newToken);
      };

      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }
  }, []);

  // const fetchPassengers = async () => {
  //   const freshToken = localStorage.getItem("token");
  //   if (!freshToken) return;

  //   try {
  //     const res = await axios.get(
  //       `http://localhost:5000/api/passengers/getAllPassengers?agencyId=${agencyId}`,
  //       { headers: { Authorization: `Bearer ${freshToken}` } }
  //     );
  //     setPassengers(res.data);
  //   } catch (err) {
  //     console.error("Error fetching passengers:", err);
  //   }
  // };
  const fetchPassengers = useCallback(async () => {
    const freshToken = localStorage.getItem("token");
    if (!freshToken) return;

    try {
      const res = await axios.get(
        `http://localhost:5000/api/passengers/getAllPassengers?agencyId=${agencyId}`,
        { headers: { Authorization: `Bearer ${freshToken}` } }
      );
      setPassengers(res.data);
    } catch (err) {
      console.error("Error fetching passengers:", err);
    }
  }, [agencyId]); 

  useEffect(() => {
    if (token) fetchPassengers();
  }, [token, fetchPassengers]);

  const handleAddPassenger = async () => {
    if (!name || !age || !phone) {
      alert("All fields are required.");
      return;
    }

    const ageNum = Number(age);
    if (isNaN(ageNum) || ageNum <= 0) {
      alert("Age must be a positive number.");
      return;
    }

    if (!/^\d{11}$/.test(phone)) {
      alert("Phone must be exactly 11 digits.");
      return;
    }

    try {
      const freshToken = localStorage.getItem("token");
      if (!freshToken) return;

      if (editId !== null) {
        await axios.put(
          `http://localhost:5000/api/passengers/updatePassenger/${editId}`,
          { name, age, phone, agencyId },
          { headers: { Authorization: `Bearer ${freshToken}` } }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/passengers/addPassenger",
          { name, age, phone, agencyId },
          { headers: { Authorization: `Bearer ${freshToken}` } }
        );
      }

      await fetchPassengers();
      resetForm();
      setShowForm(false);
    } catch (err) {
      console.error("Error saving passenger:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this passenger?")) return;
    try {
      const freshToken = localStorage.getItem("token");
      if (!freshToken) return;

      await axios.delete(
        `http://localhost:5000/api/passengers/deletePassenger/${id}`,
        {
          headers: { Authorization: `Bearer ${freshToken}` },
          data: { agencyId },
        }
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
    <div className="space-y-10">
      {/* Header with Search + Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Passengers</h1>
          <p className="text-gray-600 mt-2">Manage and keep track of your passengers easily.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search passenger..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            />
          </div>

          {/* Add Passenger Button → passengers:create */}
          <PermissionGate required="passengers:create">
            <button
              onClick={() => {
                if (showForm) {
                  setShowForm(false);
                  resetForm();
                } else {
                  setShowForm(true);
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            >
              {showForm ? (
                <>
                  <X className="w-5 h-5" /> Close
                </>
              ) : (
                <>
                  <PlusCircle className="w-5 h-5" /> Add Passenger
                </>
              )}
            </button>
          </PermissionGate>
        </div>
      </div>

      {/* Form (also needs passengers:create or passengers:update) */}
      {/* Modal (for Add / Edit Passenger) */}
      {showForm && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4 text-blue-600">
              {editId ? "Edit Passenger" : "Add New Passenger"}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddPassenger();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Age
                </label>
                <input
                  type="number"
                  placeholder="Enter age"
                  value={age}
                  onChange={(e) =>
                    setAge(e.target.value ? Number(e.target.value) : "")
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  {editId ? "Update Passenger" : "Save Passenger"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Passengers Table → passengers:read */}
      <PermissionGate required="passengers:read">
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
                    {/* Edit → passengers:update */}
                    <PermissionGate required="passengers:update">
                      <button
                        onClick={() => handleEdit(p.id)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Pencil size={18} />
                      </button>
                    </PermissionGate>

                    {/* Delete → passengers:delete */}
                    <PermissionGate required="passengers:delete">
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={18} />
                      </button>
                    </PermissionGate>
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
      </PermissionGate>
    </div>
  );
}
