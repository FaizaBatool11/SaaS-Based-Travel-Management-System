"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { MdAddCircle } from "react-icons/md";
import { Pencil, Trash } from "lucide-react";
import PermissionGate from "@/components/PermissionGate"; // ✅ Import

interface Permission {
  id: number;
  name: string;
  description: string;
}

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: Permission[];
}

export default function AddRolesPage() {
  const { agencyId } = useParams() as { agencyId: string };
  const [roles, setRoles] = useState<Role[]>([]);
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState<number | null>(null);

  // Fetch permissions
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/permissions`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setPermissions(res.data);
      } catch (err) {
        console.error("Error fetching permissions:", err);
      }
    };
    fetchPermissions();
  }, []);

  // Fetch roles
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
  }, [agencyId]);

  // Toggle permission checkbox
  const togglePermission = (id: number) => {
    setSelectedPermissions((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // Open modal for creating or editing role
  const openModalForEdit = (role: Role | null = null) => {
    if (role) {
      setRoleName(role.name);
      setDescription(role.description || "");
      setSelectedPermissions(role.permissions.map((p) => p.id));
      setEditingRoleId(role.id);
    } else {
      setRoleName("");
      setDescription("");
      setSelectedPermissions([]);
      setEditingRoleId(null);
    }
    setShowModal(true);
  };

  // Save role (create or update)
  const handleSaveRole = async () => {
    if (!roleName) return alert("Role name is required!");
    const token = localStorage.getItem("token");
    try {
      setLoading(true);

      if (editingRoleId) {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/roles/${editingRoleId}`,
          { name: roleName, description, permissions: selectedPermissions, agencyId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setRoles((prev) =>
          prev.map((r) => (r.id === editingRoleId ? res.data.role : r))
        );
      } else {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/roles`,
          { name: roleName, description, permissions: selectedPermissions, agencyId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRoles((prev) => [...prev, res.data.role]);
      }

      setShowModal(false);
      setRoleName("");
      setDescription("");
      setSelectedPermissions([]);
      setEditingRoleId(null);
    } catch (err) {
      console.error("Error saving role:", err);
      alert("❌ Failed to save role");
    } finally {
      setLoading(false);
    }
  };

  // Delete role
  const handleDeleteRole = async (roleId: number) => {
    if (!confirm("Are you sure you want to delete this role?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/roles/${roleId}?agencyId=${agencyId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRoles((prev) => prev.filter((r) => r.id !== roleId));
    } catch (err) {
      console.error("Error deleting role:", err);
      alert("❌ Failed to delete role");
    }
  };

  const filteredRoles = roles
    .filter((r) => r.name.toLowerCase() !== "owner") // ❌ Exclude owner
    .filter((r) => r.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Roles</h1>
          <p className="text-gray-600 mt-2">
            Manage roles and assign permissions for Agency.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Add Role → roles:create */}
          <PermissionGate required="roles:create">
            <button
              onClick={() => openModalForEdit(null)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            >
              <MdAddCircle className="w-5 h-5" />
              Add Role
            </button>
          </PermissionGate>
        </div>
      </div>

      {/* Roles Table → roles:read */}
      <PermissionGate required="roles:view">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Role Name</th>
                <th className="px-4 py-3 text-left">Permissions</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRoles.length > 0 ? (
                filteredRoles.map((r) => (
                  <tr key={r.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{r.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{r.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {r.permissions.length > 0 ? (
                          r.permissions.map((p) => (
                            <span
                              key={p.id}
                              title={p.description}
                              className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
                            >
                              {p.name}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      {/* Edit → roles:update */}
                      <PermissionGate required="roles:update">
                        <button
                          onClick={() => openModalForEdit(r)}
                          className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-700"
                          title="Edit Role"
                        >
                          <Pencil size={16} />
                        </button>
                      </PermissionGate>

                      {/* Delete → roles:delete */}
                      <PermissionGate required="roles:delete">
                        <button
                          onClick={() => handleDeleteRole(r.id)}
                          className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-700"
                          title="Delete Role"
                        >
                          <Trash size={16} />
                        </button>
                      </PermissionGate>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500 text-sm">
                    No roles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </PermissionGate>

      {/* Add/Edit Role Modal → roles:create / roles:update */}
      {showModal && (
        <PermissionGate required={editingRoleId ? "roles:update" : "roles:create"}>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-bold mb-4 text-blue-600">
                {editingRoleId ? "Edit Role" : "Add Role"}
              </h2>

              {/* Role Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Role Name</label>
                <input
                  type="text"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  className="w-full border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter role name"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter description"
                />
              </div>

              {/* Permissions */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Assign Permissions</label>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded p-2">
                  {permissions.map((perm) => (
                    <label key={perm.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="accent-blue-600"
                        checked={selectedPermissions.includes(perm.id)}
                        onChange={() => togglePermission(perm.id)}
                      />
                      <span>{perm.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveRole}
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Role"}
                </button>
              </div>
            </div>
          </div>
        </PermissionGate>
      )}
    </div>
  );
}
