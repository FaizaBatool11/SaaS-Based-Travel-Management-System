// "use client";
// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import { usePathname, useParams} from "next/navigation";
// import {
//   TicketIcon,
//   CreditCardIcon,
//   BookOpenIcon,
//   ArrowRightOnRectangleIcon,
//   Bars3Icon,
//   XMarkIcon,
//   MagnifyingGlassIcon,
//   BellIcon,
//   UserGroupIcon,
// } from "@heroicons/react/24/outline";

// export default function BookingDashboardLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [desktopNavOpen, setDesktopNavOpen] = useState(true);

//   // 🔑 agencyId ko state me rakho
//   const [agencyId, setAgencyId] = useState<string>("");

//   useEffect(() => {
//     // Example: login ke baad localStorage me agencyId save kar dena
//     const storedAgencyId = localStorage.getItem("agencyId");
//     if (storedAgencyId) {
//       setAgencyId(storedAgencyId);
//     }
//   }, []);

//   const SECTIONS = [
//     { href: `/BookingDashboard/${agencyId}/Passengers`, label: "Passengers", icon: UserGroupIcon },
//     { href: `/BookingDashboard/${agencyId}/Trips`, label: "Trips", icon: TicketIcon },
//     { href: `/BookingDashboard/${agencyId}/Bookings`, label: "Bookings", icon: BookOpenIcon },
//     { href: `/BookingDashboard/${agencyId}/Payments`, label: "Payments", icon: CreditCardIcon },
//     { href: `/BookingDashboard/${agencyId}/Logout`, label: "Logout", icon: ArrowRightOnRectangleIcon },
//   ];


//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       {/* Sidebar (Desktop) */}
//       <aside
//         className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 hidden md:flex ${
//           desktopNavOpen ? "w-60" : "w-16"
//         }`}
//       >
//         {/* Logo & Toggle */}
//         <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
//           {/* Logo (only when open) */}
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

//           {/* Toggle Button */}
//           <button
//             onClick={() => setDesktopNavOpen((v) => !v)}
//             className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400/50 ml-auto"
//           >
//             {desktopNavOpen ? (
//               <XMarkIcon className="w-6 h-6 text-blue-600" />
//             ) : (
//               <Bars3Icon className="w-6 h-6 text-blue-600" />
//             )}
//           </button>
//         </div>

//         {/* Navigation Links */}
//         <nav className="flex-1 px-2 py-4 space-y-1">
//           {SECTIONS.map(({ href, label, icon: Icon }) => {
//             const active = pathname === href;
//             return (
//               <Link
//               key={href}
//               href={href}
//               title={!desktopNavOpen ? label : undefined}
//               className={`group flex items-center gap-3 rounded-md px-3 py-2 transition-colors
//                 ${
//                   active
//                     ? "bg-blue-100 text-blue-700"
//                     : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
//                 }`}
//             >
//               <Icon
//                 className={`h-6 w-6 flex-shrink-0 ${
//                   active ? "text-blue-700" : "text-blue-600"
//                 }`}
//               />
//               {desktopNavOpen && <span className="font-medium">{label}</span>}
//             </Link>
//             );
//           })}
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">

//         {/* Mobile Topbar */}
//         <header className="md:hidden bg-white border-b border-gray-200 flex items-center justify-between px-4 py-3">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setMobileMenuOpen((v) => !v)}
//               className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400/50"
//             >
//               {mobileMenuOpen ? (
//                 <XMarkIcon className="w-7 h-7 text-blue-600" />
//               ) : (
//                 <Bars3Icon className="w-7 h-7 text-blue-600" />
//               )}
//             </button>
//             {/* Mobile Logo */}
//             <div className="flex items-center space-x-2">
//               <img
//                 src="https://cdn-icons-png.flaticon.com/512/69/69906.png"
//                 alt="RideWay Logo"
//                 className="h-7 w-7"
//               />
//               <h1 className="text-lg font-bold text-blue-600 leading-tight">
//                 RideWay <br />
//                 <span className="text-gray-800 text-sm">Travels</span>
//               </h1>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <button className="p-2 rounded-full hover:bg-blue-50">
//               <MagnifyingGlassIcon className="w-5 h-5 text-blue-600" />
//             </button>
//             <button className="p-2 rounded-full hover:bg-blue-50 relative">
//               <BellIcon className="w-5 h-5 text-blue-600" />
//               <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-green-400" />
//             </button>
//           </div>
//         </header>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {mobileMenuOpen && (
//             <motion.div
//               key="mobileMenu"
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               transition={{ duration: 0.25 }}
//               className="md:hidden bg-white border-b border-gray-200"
//             >
//               <div className="p-3 flex flex-col space-y-1">
//                 {SECTIONS.map(({ href, label, icon: Icon }) => {
//                   const active = pathname === href;
//                   return (
//                     <Link
//                       key={href}
//                       href={href}
//                       onClick={() => setMobileMenuOpen(false)}
//                       className={`flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors ${
//                         active ? "bg-blue-100 text-blue-700" : ""
//                       }`}
//                     >
//                       <Icon className="w-5 h-5 text-blue-600" />
//                       <span className="font-medium">{label}</span>
//                     </Link>
//                   );
//                 })}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Page Content */}
//         <main className="flex-1 p-4 sm:p-6 overflow-x-auto bg-white">{children}</main>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import {
  TicketIcon,
  CreditCardIcon,
  BookOpenIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  BellIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function BookingDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams(); // get URL params
  const agencyId = params?.agencyId; // assuming URL: /BookingDashboard/[id]/...

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopNavOpen, setDesktopNavOpen] = useState(true);

  // ✅ Create sections only after agencyId is available
  const [SECTIONS, setSECTIONS] = useState<
    { href: string; label: string; icon: any }[]
  >([]);

  useEffect(() => {
    if (agencyId) {
      setSECTIONS([
        { href: `/BookingDashboard/${agencyId}/Passengers`, label: "Passengers", icon: UserGroupIcon },
        { href: `/BookingDashboard/${agencyId}/Trips`, label: "Trips", icon: TicketIcon },
        { href: `/BookingDashboard/${agencyId}/Bookings`, label: "Bookings", icon: BookOpenIcon },
        { href: `/BookingDashboard/${agencyId}/Payments`, label: "Payments", icon: CreditCardIcon },
        { href: `/BookingDashboard/${agencyId}/Logout`, label: "Logout", icon: ArrowRightOnRectangleIcon },
      ]);
    }
  }, [agencyId]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar (Desktop) */}
      <aside
        className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 hidden md:flex ${
          desktopNavOpen ? "w-60" : "w-16"
        }`}
      >
        {/* Logo & Toggle */}
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

        {/* Navigation Links */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {SECTIONS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                title={!desktopNavOpen ? label : undefined}
                className={`group flex items-center gap-3 rounded-md px-3 py-2 transition-colors
                  ${active ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"}`}
              >
                <Icon className={`h-6 w-6 flex-shrink-0 ${active ? "text-blue-700" : "text-blue-600"}`} />
                {desktopNavOpen && <span className="font-medium">{label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Topbar */}
        <header className="md:hidden bg-white border-b border-gray-200 flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400/50"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-7 h-7 text-blue-600" />
              ) : (
                <Bars3Icon className="w-7 h-7 text-blue-600" />
              )}
            </button>
            <div className="flex items-center space-x-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/69/69906.png"
                alt="RideWay Logo"
                className="h-7 w-7"
              />
              <h1 className="text-lg font-bold text-blue-600 leading-tight">
                RideWay <br />
                <span className="text-gray-800 text-sm">Travels</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-blue-50">
              <MagnifyingGlassIcon className="w-5 h-5 text-blue-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-blue-50 relative">
              <BellIcon className="w-5 h-5 text-blue-600" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-green-400" />
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && SECTIONS.length > 0 && (
            <motion.div
              key="mobileMenu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-white border-b border-gray-200"
            >
              <div className="p-3 flex flex-col space-y-1">
                {SECTIONS.map(({ href, label, icon: Icon }) => {
                  const active = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors ${
                        active ? "bg-blue-100 text-blue-700" : ""
                      }`}
                    >
                      <Icon className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">{label}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-x-auto bg-white">{children}</main>
      </div>
    </div>
  );
}
