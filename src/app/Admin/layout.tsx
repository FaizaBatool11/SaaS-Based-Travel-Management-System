
// "use client";

// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { usePathname } from "next/navigation";
// import {
//   TicketIcon,
//   CreditCardIcon,
//   ReceiptRefundIcon,
//   ArrowRightOnRectangleIcon,
//   Bars3Icon,
//   XMarkIcon,
//   MagnifyingGlassIcon,
//   BellIcon,
//   BookOpenIcon
// } from "@heroicons/react/24/outline";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
//   const [desktopNavOpen, setDesktopNavOpen] = React.useState(true);

//   const params = useParams();
//     const agencyId = params?.agencyId as string;

//     // Sidebar sections rendered as links
//     const SECTIONS = [
//     { href: `/Admin/${agencyId}/TripDetail`, label: "Trips Detail", icon: TicketIcon },
//     { href: `/Admin/${agencyId}/Bookings`, label: "Bookings", icon: BookOpenIcon },
//     { href: `/Admin/${agencyId}/payment`, label: "Payment", icon: CreditCardIcon },
//     { href: `/Admin/${agencyId}/receipt`, label: "Receipt", icon: ReceiptRefundIcon },
//     { href: "/admin/logout", label: "Logout", icon: ArrowRightOnRectangleIcon },
//     ] as const;
//   return (
//     <div className="min-h-screen bg-white flex flex-col md:flex-row">
//       {/* Sidebar (Desktop) */}
//       <nav
//         className={`bg-white text-gray-800 border-r border-blue-100 shadow-sm flex-col justify-between transition-all duration-300 hidden md:flex
//         ${desktopNavOpen ? "w-60" : "w-16"}`}
//       >
//         {/* Header / Toggle */}
//         <div className="px-3 py-4 border-b border-blue-100">
//           <div className="flex items-center justify-between">
//             <div
//               className={`font-extrabold tracking-tight text-2xl text-blue-600 overflow-hidden transition-opacity duration-300 ${
//                 desktopNavOpen ? "opacity-100" : "opacity-0"
//               }`}
//             >
//               Travel Management
//             </div>
//             <button
//               onClick={() => setDesktopNavOpen((v) => !v)}
//               aria-label={desktopNavOpen ? "Collapse menu" : "Expand menu"}
//               className="rounded focus:outline-none focus:ring-2 focus:ring-blue-400/50"
//             >
//               {desktopNavOpen ? (
//                 <XMarkIcon className="h-6 w-6 text-blue-600" />
//               ) : (
//                 <Bars3Icon className="h-6 w-6 text-blue-600" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Section links */}
//         <div className="flex flex-col gap-1 px-2 py-3">
//           {SECTIONS.map(({ href, label, icon: Icon }) => {
//             const active = pathname === href;
//             return (
//               <Link
//                 key={href}
//                 href={href}
//                 title={!desktopNavOpen ? label : undefined}
//                 className={`group flex items-center gap-3 rounded-md px-3 py-2 transition-colors
//                   ${
//                     active
//                       ? "bg-blue-100 text-blue-700"
//                       : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
//                   }`}
//               >
//                 <Icon
//                   className={`h-6 w-6 flex-shrink-0 ${
//                     active ? "text-blue-700" : "text-blue-600"
//                   }`}
//                 />
//                 {desktopNavOpen && <span className="font-medium">{label}</span>}
//               </Link>
//             );
//           })}
//         </div>

//         <div className="px-4 py-4 mt-auto border-t border-blue-100">
//           {desktopNavOpen}
//         </div>
//       </nav>

//       {/* Mobile Topbar */}
//       <nav className="bg-white text-gray-900 border-b border-blue-100 shadow-sm flex items-center justify-between px-4 py-3 md:hidden">
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => setMobileMenuOpen((v) => !v)}
//             className="rounded focus:outline-none focus:ring-2 focus:ring-blue-400/50"
//             aria-label="Toggle menu"
//             aria-expanded={mobileMenuOpen}
//           >
//             {mobileMenuOpen ? (
//               <XMarkIcon className="h-7 w-7 text-blue-600" />
//             ) : (
//               <Bars3Icon className="h-7 w-7 text-blue-600" />
//             )}
//           </button>
//           <h1 className="text-lg font-extrabold tracking-tight text-blue-600">
//             Travel Management
//           </h1>
//         </div>

//         <div className="flex items-center gap-2">
//           <button className="p-2 rounded-full hover:bg-blue-50">
//             <MagnifyingGlassIcon className="h-5 w-5 text-blue-600" />
//           </button>
//           <button className="p-2 rounded-full hover:bg-blue-50 relative">
//             <BellIcon className="h-5 w-5 text-blue-600" />
//             <span className="absolute top-1 right-1 block h-2 w-2 rounded-full ring-2 ring-white bg-green-400" />
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <motion.div
//             key="mobileMenu"
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.25 }}
//             className="md:hidden bg-white text-gray-800 w-full border-b border-blue-100"
//           >
//             <div className="p-3">
//               <div className="flex flex-col gap-1">
//                 {SECTIONS.map(({ href, label, icon: Icon }) => {
//                   const active = pathname === href;
//                   return (
//                     <Link
//                       key={href}
//                       href={href}
//                       onClick={() => setMobileMenuOpen(false)}
//                       className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors
//                         ${
//                           active
//                             ? "bg-blue-100 text-blue-700"
//                             : "text-gray-700 hover:bg-blue-50"
//                         }`}
//                     >
//                       <Icon className="h-6 w-6 text-blue-600" />
//                       <span className="font-medium">{label}</span>
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Main Page Content */}
//       <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
//         {children}
//       </main>
//     </div>
//   );
// }

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import {
  TicketIcon,
  CreditCardIcon,
  ReceiptRefundIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  BellIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [desktopNavOpen, setDesktopNavOpen] = React.useState(true);

  const params = useParams();
  const agencyId = params?.agencyId as string;

  // Sidebar sections rendered as links
  const SECTIONS = [
    { href: `/Admin/${agencyId}/TripDetail`, label: "Trips Detail", icon: TicketIcon },
    { href: `/Admin/${agencyId}/Bookings`, label: "Bookings", icon: BookOpenIcon },
    { href: `/Admin/${agencyId}/payment`, label: "Payment", icon: CreditCardIcon },
    { href: `/Admin/${agencyId}/receipt`, label: "Receipt", icon: ReceiptRefundIcon },
    { href: "/admin/logout", label: "Logout", icon: ArrowRightOnRectangleIcon },
  ] as const;

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Sidebar (Desktop) */}
      <nav
        className={`bg-white text-gray-800 border-r border-blue-100 shadow-sm flex flex-col transition-all duration-300 hidden md:flex
        ${desktopNavOpen ? "w-60" : "w-16"}`}
      >
      {/* Logo & Toggle */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
        {/* Logo (only when open) */}
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
      
        {/* Toggle Button */}
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

        {/* Section links */}
        <div className="flex flex-col gap-1 px-2 py-3">
          {SECTIONS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                title={!desktopNavOpen ? label : undefined}
                className={`group flex items-center gap-3 rounded-md px-3 py-2 transition-colors
                  ${
                    active
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  }`}
              >
                <Icon
                  className={`h-6 w-6 flex-shrink-0 ${
                    active ? "text-blue-700" : "text-blue-600"
                  }`}
                />
                {desktopNavOpen && <span className="font-medium">{label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Topbar */}
      <nav className="bg-white text-gray-900 border-b border-blue-100 shadow-sm flex items-center justify-between px-4 py-3 md:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="rounded focus:outline-none focus:ring-2 focus:ring-blue-400/50"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-7 w-7 text-blue-600" />
            ) : (
              <Bars3Icon className="h-7 w-7 text-blue-600" />
            )}
          </button>
          <div className="flex items-center space-x-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/69/69906.png"
              alt="RideWay Logo"
              className="h-7 w-7"
            />
            <h1 className="text-lg font-extrabold tracking-tight text-blue-600">
              RideWay Admin
            </h1>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
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
                {SECTIONS.map(({ href, label, icon: Icon }) => {
                  const active = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors
                        ${
                          active
                            ? "bg-blue-100 text-blue-700"
                            : "text-gray-700 hover:bg-blue-50"
                        }`}
                    >
                      <Icon className="h-6 w-6 text-blue-600" />
                      <span className="font-medium">{label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Content */}
      <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
