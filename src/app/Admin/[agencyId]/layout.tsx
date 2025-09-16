// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useParams, usePathname, useRouter } from "next/navigation";
// import {
//   TicketIcon,
//   CreditCardIcon,
//   ReceiptRefundIcon,
//   ArrowRightOnRectangleIcon,
//   Bars3Icon,
//   XMarkIcon,
//   BookOpenIcon,
//   UserGroupIcon,
//   PlusCircleIcon,
// } from "@heroicons/react/24/outline";
// import { UserPlusIcon } from "lucide-react";

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [desktopNavOpen, setDesktopNavOpen] = useState(true);

//   const params = useParams();
//   const agencyId = params?.agencyId as string;
//   const router = useRouter();
//   const [sections, setSections] = useState<any[]>([]);

//   // ✅ Ye wala useEffect redirect ke liye
//   useEffect(() => {
//     // Agar AddUserPage ya AddAgencyPage par ho to redirect na karein
//     if (pathname === "/Admin/AddUserPage" || pathname === "/Admin/AddAgencyPage") {
//       return;
//     }

//     // Sirf tab redirect kare jab Admin par ho without agencyId
//     if (pathname === "/Admin" || pathname === "/Admin/") {
//       router.push("/Admin/1");
//     }
//   }, [pathname, router]);

//   // Load all sections (no role-based check)
//   useEffect(() => {
//     setSections([
//       { href: `/Admin/AddAgencyPage`, label: "New Agency", icon: PlusCircleIcon },
//       { href: `/Admin/AddUserPage`, label: "New User", icon: UserPlusIcon },
//       { href: `/Admin/${agencyId}/TripDetail`, label: "Trips Detail", icon: TicketIcon },
//       { href: `/Admin/${agencyId}/Passengers`, label: "Passengers", icon: UserGroupIcon },
//       { href: `/Admin/${agencyId}/Bookings`, label: "Bookings", icon: BookOpenIcon },
//       { href: `/Admin/${agencyId}/payment`, label: "Payment", icon: CreditCardIcon },
//       { href: `/Admin/${agencyId}/receipt`, label: "Receipt", icon: ReceiptRefundIcon },
//       { href: "/Admin/logout", label: "Logout", icon: ArrowRightOnRectangleIcon },
//     ]);
//   }, [agencyId]);

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row">
//       {/* Sidebar Desktop */}
//       <nav
//         className={`bg-white border-r border-blue-100 shadow-md flex flex-col transition-all duration-300 hidden md:flex
//         ${desktopNavOpen ? "w-60" : "w-16"}`}
//       >
//         {/* Logo + toggle */}
//         <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
//           {desktopNavOpen && (
//             <div className="flex items-center space-x-2">
//               <img
//                 src="https://cdn-icons-png.flaticon.com/512/69/69906.png"
//                 alt="RideWay Logo"
//                 className="h-8 w-8 flex-shrink-0"
//               />
//               <h1 className="text-xl font-bold text-blue-600 leading-tight">
//                 RideWay <br />
//                 <span className="text-gray-800 text-lg">Travels</span>
//               </h1>
//             </div>
//           )}
//           <button
//             onClick={() => setDesktopNavOpen((v) => !v)}
//             className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400/50 ml-auto"
//           >
//             {desktopNavOpen ? <XMarkIcon className="w-6 h-6 text-blue-600" /> : <Bars3Icon className="w-6 h-6 text-blue-600" />}
//           </button>
//         </div>

//         {/* Always show New Agency button */}
//         {/* <div className="px-2 py-3 border-b border-gray-200">
//           <Link
//             href={`/Admin/AddAgencyPage`}
//             className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors
//               ${desktopNavOpen ? "bg-blue-500 text-white hover:bg-blue-600" : "justify-center text-blue-600 hover:bg-blue-50"}`}
//           >
//             <PlusCircleIcon className="h-6 w-6 flex-shrink-0" />
//             {desktopNavOpen && <span className="font-medium">New Agency</span>}
//           </Link>
//         </div> */}

//         {/* Sidebar Links */}
//         <div className="flex flex-col gap-1 px-2 py-3 flex-1">
//           {sections.map(({ href, label, icon: Icon }) => {
//             const active = pathname === href;
//             return (
//               <Link
//                 key={href}
//                 href={href}
//                 title={!desktopNavOpen ? label : undefined}
//                 className={`group flex items-center gap-3 rounded-md px-3 py-2 transition-colors
//                   ${active ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"}`}
//               >
//                 <Icon className={`h-5 w-5 flex-shrink-0 ${active ? "text-blue-700" : "text-blue-600"}`} />
//                 {desktopNavOpen && <span className="font-medium">{label}</span>}
//               </Link>
//             );
//           })}
//         </div>
//       </nav>

//       {/* Mobile Header */}
//       <div className="md:hidden flex flex-col">
//         <div className="bg-white border-b border-blue-100 shadow-sm flex items-center justify-between px-4 py-3">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setMobileMenuOpen((v) => !v)}
//               className="rounded focus:outline-none focus:ring-2 focus:ring-blue-400/50"
//             >
//               {mobileMenuOpen ? <XMarkIcon className="h-7 w-7 text-blue-600" /> : <Bars3Icon className="h-7 w-7 text-blue-600" />}
//             </button>
//             <div className="flex items-center space-x-2">
//               <img src="https://cdn-icons-png.flaticon.com/512/69/69906.png" alt="RideWay Logo" className="h-7 w-7" />
//               <h1 className="text-lg font-extrabold tracking-tight text-blue-600">RideWay</h1>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu Links */}
//         {mobileMenuOpen && (
//           <div className="flex flex-col bg-white shadow-md border-b border-blue-100">
//             {sections.map(({ href, label, icon: Icon }) => {
//               const active = pathname === href;
//               return (
//                 <Link
//                   key={href}
//                   href={href}
//                   className={`flex items-center gap-3 px-4 py-3 transition-colors
//                     ${active ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"}`}
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   <Icon className={`h-5 w-5 ${active ? "text-blue-700" : "text-blue-600"}`} />
//                   <span className="font-medium">{label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* Main Content */}
//       <main className="flex-1 p-4 sm:p-6 overflow-x-hidden mt-0 md:mt-0">
//         {children}
//       </main>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  TicketIcon,
  CreditCardIcon,
  ReceiptRefundIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  BookOpenIcon,
  UserGroupIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { UserPlusIcon } from "lucide-react";
import axios from "axios";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopNavOpen, setDesktopNavOpen] = useState(true);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const params = useParams();
  const agencyId = params?.agencyId as string;
  const router = useRouter();
  const [sections, setSections] = useState<any[]>([]);

  // ✅ redirect
  useEffect(() => {
    if (pathname === "/Admin/AddUserPage" || pathname === "/Admin/AddAgencyPage") {
      return;
    }
    if (pathname === "/Admin" || pathname === "/Admin/") {
      router.push("/Admin/1");
    }
  }, [pathname, router]);

  // ✅ sidebar sections
  useEffect(() => {
    setSections([
      { href: `/Admin/AddAgencyPage`, label: "New Agency", icon: PlusCircleIcon },
      { href: `/Admin/${agencyId}/TripDetail`, label: "Trips Detail", icon: TicketIcon },
      { href: `/Admin/${agencyId}/Passengers`, label: "Passengers", icon: UserGroupIcon },
      { href: `/Admin/${agencyId}/Bookings`, label: "Bookings", icon: BookOpenIcon },
      { href: `/Admin/${agencyId}/payment`, label: "Payment", icon: CreditCardIcon },
      { href: `/Admin/${agencyId}/receipt`, label: "Receipt", icon: ReceiptRefundIcon },
      { href: "/Admin/logout", label: "Logout", icon: ArrowRightOnRectangleIcon },
    ]);
  }, [agencyId]);

  // ✅ save user API call
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.post("http://localhost:5000/api/users", {
        ...newUser,
        agencyId, // ✅ agencyId bhi send kar rahe
      });
      setIsUserModalOpen(false);
      setNewUser({ name: "", email: "", password: "", role: "" });
      router.refresh();
    } catch (error) {
      console.error("Error saving user", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar Desktop */}
      <nav
        className={`bg-white border-r border-blue-100 shadow-md flex flex-col transition-all duration-300 hidden md:flex
        ${desktopNavOpen ? "w-60" : "w-16"}`}
      >
        {/* Logo + toggle */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          {desktopNavOpen && (
            <div className="flex items-center space-x-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/69/69906.png"
                alt="RideWay Logo"
                className="h-8 w-8 flex-shrink-0"
              />
              <h1 className="text-xl font-bold text-blue-600 leading-tight">
                RideWay <br />
                <span className="text-gray-800 text-lg">Travels</span>
              </h1>
            </div>
          )}
          <button
            onClick={() => setDesktopNavOpen((v) => !v)}
            className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400/50 ml-auto"
          >
            {desktopNavOpen ? (
              <XMarkIcon className="w-6 h-6 text-blue-600" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-blue-600" />
            )}
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col gap-1 px-2 py-3 flex-1">
          {/* ✅ New User Button (Modal Open Karega) */}
          <button
            onClick={() => setIsUserModalOpen(true)}
            className="group flex items-center gap-3 rounded-md px-3 py-2 transition-colors text-gray-700 hover:bg-blue-50 hover:text-blue-700"
          >
            <UserPlusIcon className="h-5 w-5 text-blue-600" />
            {desktopNavOpen && <span className="font-medium">New User</span>}
          </button>

          {/* ✅ Baqi links as it is */}
          {sections.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                title={!desktopNavOpen ? label : undefined}
                className={`group flex items-center gap-3 rounded-md px-3 py-2 transition-colors
                  ${active ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"}`}
              >
                <Icon
                  className={`h-5 w-5 flex-shrink-0 ${
                    active ? "text-blue-700" : "text-blue-600"
                  }`}
                />
                {desktopNavOpen && <span className="font-medium">{label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 overflow-x-hidden mt-0 md:mt-0">
        {children}
      </main>

      {/* ✅ Add User Modal with your given styling */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-blue-600">Add User</h2>
            <form onSubmit={handleAddUser} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="w-full border p-2 rounded"
                required
              />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full border p-2 rounded"
                required
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="manager">Manager</option>
                <option value="booking-agent">Booking Agent</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
