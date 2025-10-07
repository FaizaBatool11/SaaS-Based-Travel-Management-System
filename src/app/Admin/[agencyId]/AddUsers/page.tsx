"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { MdAddCircle } from "react-icons/md";
import PermissionGate from "@/components/PermissionGate"; // ✅ import

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Role {
  id: number;
  name: string;
}

export default function UsersPage() {
  const { agencyId } = useParams();
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");

  const fetchUsers = useCallback(async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${agencyId}`,
      { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    );
    setUsers(res.data);
  } catch (err) {
    console.error("Error fetching users:", err);
  }
}, [agencyId]);

  // ✅ Add user
  const handleAddUser = async () => {
    if (!name || !email || !password || !roleId) {
      alert("All fields are required!");
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${agencyId}`,
        { name, email, password, roleId },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );

      // Refresh users
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${agencyId}`,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      setUsers(res.data);

      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setRoleId("");
      setShowModal(false);
    } catch (err) {
      console.error("Error adding user:", err);
      alert("❌ Failed to add user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const fetchRoles = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/roles?agencyId=${agencyId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRoles(res.data);
    } catch (err) {
      console.error("Error fetching roles:", err);
    }
  };

  fetchRoles();
  fetchUsers();
}, [agencyId, fetchUsers]); 

  // ✅ Search filter
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-gray-600 mt-2">
            Manage users and assign roles for Agency.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Add User → users:create */}
          <PermissionGate required="users:create">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            >
              <MdAddCircle className="w-5 h-5" />
              Add User
            </button>
          </PermissionGate>
        </div>
      </div>

      {/* Users Grid → users:read */}
      <PermissionGate required="users:read">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((u) => (
              <div
                key={u.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition transform hover:-translate-y-1 w-68 mx-auto"
              >
                {/* Banner */}
                <div className="h-16 w-full bg-gradient-to-r from-blue-300 to-blue-600 rounded-t-xl"></div>

                {/* Avatar */}
                <div className="flex justify-center -mt-10">
                  <div className="w-20 h-20 rounded-full bg-white shadow flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center">
                      <span className="text-xl font-bold text-indigo-600">
                        {u.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* User Info */}
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">{u.name}</h3>
                  <p className="text-gray-500 text-sm truncate">{u.email}</p>
                </div>

                {/* Role Badge */}
                <div className="pb-4 flex justify-center">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-indigo-600 border border-indigo-200">
                    {u.role}
                  </span>
                </div>

                {/* Future actions (Update/Delete) */}
                {/* 
                  <PermissionGate required="users:update">
                    <button>Edit</button>
                  </PermissionGate>
                  <PermissionGate required="users:delete">
                    <button>Delete</button>
                  </PermissionGate>
                */}
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No users found.</p>
          )}
        </div>
      </PermissionGate>

      {/* Add User Modal → users:create */}
      {showModal && (
        <PermissionGate required="users:create">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-bold mb-4 text-blue-600">Add User</h2>

              {/* Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter name"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter email"
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter password"
                />
              </div>

              {/* Role Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  value={roleId}
                  onChange={(e) => setRoleId(e.target.value)}
                  className="w-full border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save User"}
                </button>
              </div>
            </div>
          </div>
        </PermissionGate>
      )}
    </div>
  );
}
