// "use client";

// import React from "react";
// import Link from "next/link";
// import { useParams, usePathname } from "next/navigation";
// import {
//   TicketIcon,
//   CreditCardIcon,
//   ReceiptRefundIcon,
//   ArrowRightOnRectangleIcon,
//   Bars3Icon,
//   XMarkIcon,
//   BookOpenIcon,
//   UserGroupIcon,
//   PlusCircleIcon, // ✅ New Agency icon
// } from "@heroicons/react/24/outline";

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
//   const [desktopNavOpen, setDesktopNavOpen] = React.useState(true);

//   const params = useParams();
//   const agencyId = params?.agencyId as string;

//   // ✅ Role ko localStorage se uthao
//   const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;

//   // ✅ Admin sections
//   const ADMIN_SECTIONS = [
//     { href: `/Admin/${agencyId}/TripDetail`, label: "Trips Detail", icon: TicketIcon },
//     { href: `/Admin/${agencyId}/Bookings`, label: "Bookings", icon: BookOpenIcon },
//     { href: `/Admin/${agencyId}/payment`, label: "Payment", icon: CreditCardIcon },
//     { href: `/Admin/${agencyId}/receipt`, label: "Receipt", icon: ReceiptRefundIcon },
//     { href: "/admin/logout", label: "Logout", icon: ArrowRightOnRectangleIcon },
//   ];

//   // ✅ Booking Agent sections
//   const BOOKING_AGENT_SECTIONS = [
//     { href: `/Admin/${agencyId}/Passengers`, label: "Passengers", icon: UserGroupIcon },
//     { href: `/Admin/${agencyId}/Bookings`, label: "Bookings", icon: BookOpenIcon },
//     { href: `/Admin/${agencyId}/TripDetail`, label: "Trips", icon: TicketIcon },
//     { href: "/admin/logout", label: "Logout", icon: ArrowRightOnRectangleIcon },
//   ];

//   // ✅ Role ke hisaab se sections
//   const SECTIONS = role === "agency_admin" ? ADMIN_SECTIONS : BOOKING_AGENT_SECTIONS;

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row">
//       {/* Sidebar (Desktop) */}
//       <nav
//         className={`bg-white border-r border-blue-100 shadow-md flex flex-col transition-all duration-300 hidden md:flex
//         ${desktopNavOpen ? "w-60" : "w-16"}`}
//       >
//         {/* Logo + Toggle */}
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
//             {desktopNavOpen ? (
//               <XMarkIcon className="w-6 h-6 text-blue-600" />
//             ) : (
//               <Bars3Icon className="w-6 h-6 text-blue-600" />
//             )}
//           </button>
//         </div>
//         {/* ✅ New Agency Button (only for Admin) */}
//         {role === "agency_admin" && (
//           <div className="p-3 border-t border-gray-200">
//             <Link
//               href={`/Admin/AddAgencyPage`}
//               className="flex items-center gap-2 rounded-md px-3 py-2 bg-blue-500 text-white hover:bg-blue-600 transition"
//             >
//               <PlusCircleIcon className="h-5 w-5" />
//               {desktopNavOpen && <span className="font-medium">New Agency</span>}
//             </Link>
//           </div>
//         )}

//         {/* Sidebar Links */}
//         <div className="flex flex-col gap-1 px-2 py-3 flex-1">
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

//         {/* ✅ New Agency Button (only for Admin) */}
//         {/* {role === "agency_admin" && (
//           <div className="p-3 border-t border-gray-200">
//             <Link
//               href={`/Admin/AddAgencyPage`}
//               className="flex items-center gap-2 rounded-md px-3 py-2 bg-green-600 text-white hover:bg-green-700 transition"
//             >
//               <PlusCircleIcon className="h-5 w-5" />
//               {desktopNavOpen && <span className="font-medium">New Agency</span>}
//             </Link>
//           </div>
//         )} */}
//       </nav>

//       {/* Mobile Navbar */}
//       <nav className="bg-white border-b border-blue-100 shadow-sm flex items-center justify-between px-4 py-3 md:hidden">
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => setMobileMenuOpen((v) => !v)}
//             className="rounded focus:outline-none focus:ring-2 focus:ring-blue-400/50"
//           >
//             {mobileMenuOpen ? (
//               <XMarkIcon className="h-7 w-7 text-blue-600" />
//             ) : (
//               <Bars3Icon className="h-7 w-7 text-blue-600" />
//             )}
//           </button>
//           <div className="flex items-center space-x-2">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/69/69906.png"
//               alt="RideWay Logo"
//               className="h-7 w-7"
//             />
//             <h1 className="text-lg font-extrabold tracking-tight text-blue-600">
//               RideWay
//             </h1>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
//         {children}
//       </main>
//     </div>
//   );
// }

// "use client";

// import React from "react";
// import Link from "next/link";
// import { useParams, usePathname } from "next/navigation";
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

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
//   const [desktopNavOpen, setDesktopNavOpen] = React.useState(true);

//   const params = useParams();
//   const agencyId = params?.agencyId as string;

//   const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;

//   const ADMIN_SECTIONS = [
//     { href: `/Admin/${agencyId}/TripDetail`, label: "Trips Detail", icon: TicketIcon },
//     { href: `/Admin/${agencyId}/Bookings`, label: "Bookings", icon: BookOpenIcon },
//     { href: `/Admin/${agencyId}/payment`, label: "Payment", icon: CreditCardIcon },
//     { href: `/Admin/${agencyId}/receipt`, label: "Receipt", icon: ReceiptRefundIcon },
//     { href: "/admin/logout", label: "Logout", icon: ArrowRightOnRectangleIcon },
//   ];

//   const BOOKING_AGENT_SECTIONS = [
//     { href: `/Admin/${agencyId}/Passengers`, label: "Passengers", icon: UserGroupIcon },
//     { href: `/Admin/${agencyId}/Bookings`, label: "Bookings", icon: BookOpenIcon },
//     { href: `/Admin/${agencyId}/TripDetail`, label: "Trips", icon: TicketIcon },
//     { href: "/admin/logout", label: "Logout", icon: ArrowRightOnRectangleIcon },
//   ];

//   const SECTIONS = role === "agency_admin" ? ADMIN_SECTIONS : BOOKING_AGENT_SECTIONS;

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
//               <img src="https://cdn-icons-png.flaticon.com/512/69/69906.png" alt="RideWay Logo" className="h-8 w-8 flex-shrink-0" />
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

//         {/* Sidebar Links */}
//         <div className="flex flex-col gap-1 px-2 py-3 flex-1">
//           {SECTIONS.map(({ href, label, icon: Icon }) => {
//             const active = pathname === href;
//             return (
//               <Link
//                 key={href}
//                 href={href}
//                 title={!desktopNavOpen ? label : undefined}
//                 className={`group flex items-center gap-3 rounded-md px-3 py-2 transition-colors
//                   ${active ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"}`}
//               >
//                 <Icon className={`h-6 w-6 flex-shrink-0 ${active ? "text-blue-700" : "text-blue-600"}`} />
//                 {desktopNavOpen && <span className="font-medium">{label}</span>}
//               </Link>
//             );
//           })}

//           {/* New Agency Button */}
//           {role === "agency_admin" && (
//             <>
//               <Link
//                 href={`/Admin/AddAgencyPage`}
//                 className="group flex items-center gap-3 rounded-md px-3 py-2 mt-2 transition-colors
//                 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
//               >
//                 <PlusCircleIcon className="h-6 w-6 flex-shrink-0 text-blue-600" />
//                 {desktopNavOpen && <span className="font-medium">New Agency</span>}
//               </Link>
//               <hr className="border-t border-gray-200 mt-2" />
//             </>
//           )}
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

//           {/* Optional: Mobile Agency Switch Dropdown */}
//           <div className="flex items-center">
//             {/* Put your mobile dropdown here */}
//           </div>
//         </div>

//         {/* Mobile Menu Links */}
//         {mobileMenuOpen && (
//           <div className="flex flex-col bg-white shadow-md border-b border-blue-100">
//             {SECTIONS.map(({ href, label, icon: Icon }) => {
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

//             {role === "agency_admin" && (
//               <>
//                 <Link
//                   href={`/Admin/AddAgencyPage`}
//                   className="flex items-center gap-3 px-4 py-3 transition-colors text-gray-700 hover:bg-blue-50 hover:text-blue-700"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   <PlusCircleIcon className="h-5 w-5 text-blue-600" />
//                   <span className="font-medium">New Agency</span>
//                 </Link>
//                 <hr className="border-t border-gray-200 mt-2" />
//               </>
//             )}
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

// "use client";

// import React from "react";
// import Link from "next/link";
// import { useParams, usePathname } from "next/navigation";
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

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
//   const [desktopNavOpen, setDesktopNavOpen] = React.useState(true);

//   const params = useParams();
//   const agencyId = params?.agencyId as string;

//   const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;

//   const ADMIN_SECTIONS = [
//     { href: `/Admin/${agencyId}/TripDetail`, label: "Trips Detail", icon: TicketIcon },
//     { href: `/Admin/${agencyId}/Bookings`, label: "Bookings", icon: BookOpenIcon },
//     { href: `/Admin/${agencyId}/payment`, label: "Payment", icon: CreditCardIcon },
//     { href: `/Admin/${agencyId}/receipt`, label: "Receipt", icon: ReceiptRefundIcon },
//     { href: "/admin/logout", label: "Logout", icon: ArrowRightOnRectangleIcon },
//   ];

//   const BOOKING_AGENT_SECTIONS = [
//     { href: `/Admin/${agencyId}/Passengers`, label: "Passengers", icon: UserGroupIcon },
//     { href: `/Admin/${agencyId}/Bookings`, label: "Bookings", icon: BookOpenIcon },
//     { href: `/Admin/${agencyId}/TripDetail`, label: "Trips", icon: TicketIcon },
//     { href: "/admin/logout", label: "Logout", icon: ArrowRightOnRectangleIcon },
//   ];

//   const SECTIONS = role === "agency_admin" ? ADMIN_SECTIONS : BOOKING_AGENT_SECTIONS;

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
//             {desktopNavOpen ? (
//               <XMarkIcon className="w-6 h-6 text-blue-600" />
//             ) : (
//               <Bars3Icon className="w-6 h-6 text-blue-600" />
//             )}
//           </button>
//         </div>

//         {/* New Agency Button */}
//         {role === "agency_admin" && (
//           <div className="px-2 py-3 border-b border-gray-200">
//             <Link
//               href={`/Admin/AddAgencyPage`}
//               title={!desktopNavOpen ? "New Agency" : undefined} // tooltip when collapsed
//               className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors
//                 ${desktopNavOpen ? "bg-blue-500 text-white hover:bg-blue-600" : "justify-center text-blue-600 hover:bg-blue-50"}`}
//             >
//               <PlusCircleIcon className="h-6 w-6 flex-shrink-0" />
//               {desktopNavOpen && <span className="font-medium">New Agency</span>}
//             </Link>
//           </div>
//         )}

//         {/* Sidebar Links */}
//         <div className="flex flex-col gap-1 px-2 py-3 flex-1">
//           {SECTIONS.map(({ href, label, icon: Icon }) => {
//             const active = pathname === href;
//             return (
//               <Link
//                 key={href}
//                 href={href}
//                 title={!desktopNavOpen ? label : undefined}
//                 className={`group flex items-center gap-3 rounded-md px-3 py-2 transition-colors
//                   ${active ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"}`}
//               >
//                 <Icon className={`h-6 w-6 flex-shrink-0 ${active ? "text-blue-700" : "text-blue-600"}`} />
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
//             {SECTIONS.map(({ href, label, icon: Icon }) => {
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

//             {role === "agency_admin" && (
//               <>
//                 <Link
//                   href={`/Admin/AddAgencyPage`}
//                   className="flex items-center gap-3 px-4 py-3 transition-colors text-gray-700 hover:bg-blue-50 hover:text-blue-700"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   <PlusCircleIcon className="h-5 w-5 text-blue-600" />
//                   <span className="font-medium">New Agency</span>
//                 </Link>
//                 <hr className="border-t border-gray-200 mt-2" />
//               </>
//             )}
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

// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useParams, usePathname } from "next/navigation";
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

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [desktopNavOpen, setDesktopNavOpen] = useState(true);

//   const params = useParams();
//   const agencyId = params?.agencyId as string;

//   const [role, setRole] = useState<string | null>(null);
//   const [sections, setSections] = useState<any[]>([]);

//   // Load role and initial sections
//   useEffect(() => {
//     const userRole = typeof window !== "undefined" ? localStorage.getItem("role") : null;
//     setRole(userRole);

//     if (userRole === "agency_admin") {
//       setSections([
//         { href: `/Admin/${agencyId}/TripDetail`, label: "Trips Detail", icon: TicketIcon },
//         { href: `/Admin/${agencyId}/Bookings`, label: "Bookings", icon: BookOpenIcon },
//         { href: `/Admin/${agencyId}/payment`, label: "Payment", icon: CreditCardIcon },
//         { href: `/Admin/${agencyId}/receipt`, label: "Receipt", icon: ReceiptRefundIcon },
//         { href: "/admin/logout", label: "Logout", icon: ArrowRightOnRectangleIcon },
//       ]);
//     } else {
//       setSections([
//         { href: `/Admin/${agencyId}/Passengers`, label: "Passengers", icon: UserGroupIcon },
//         { href: `/Admin/${agencyId}/Bookings`, label: "Bookings", icon: BookOpenIcon },
//         { href: `/Admin/${agencyId}/TripDetail`, label: "Trips", icon: TicketIcon },
//         { href: "/admin/logout", label: "Logout", icon: ArrowRightOnRectangleIcon },
//       ]);
//     }
//   }, [agencyId]);

//   // Function to refresh sections after adding new agency
//   const refreshSections = () => {
//     if (role === "agency_admin") {
//       setSections((prev) => [
//         ...prev.filter((s) => s.label !== "New Agency"), // remove old Add Agency if exists
//         { href: `/Admin/AddAgencyPage`, label: "New Agency", icon: PlusCircleIcon },
//       ]);
//     }
//   };

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

//         {/* Always show New Agency button under logo */}
//         {role === "agency_admin" && (
//           <div className="px-2 py-3 border-b border-gray-200">
//             <Link
//               href={`/Admin/AddAgencyPage`}
//               title={!desktopNavOpen ? "New Agency" : undefined} // tooltip when collapsed
//               className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors
//                 ${desktopNavOpen ? "bg-blue-500 text-white hover:bg-blue-600" : "justify-center text-blue-600 hover:bg-blue-50"}`}
//             >
//               <PlusCircleIcon className="h-6 w-6 flex-shrink-0" />
//               {desktopNavOpen && <span className="font-medium">New Agency</span>}
//             </Link>
//           </div>
//         )}

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
//                 onClick={label === "New Agency" ? refreshSections : undefined}
//               >
//                 <Icon className={`h-6 w-6 flex-shrink-0 ${active ? "text-blue-700" : "text-blue-600"}`} />
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
import { useParams, usePathname } from "next/navigation";
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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopNavOpen, setDesktopNavOpen] = useState(true);

  const params = useParams();
  const agencyId = params?.agencyId as string;

  const [sections, setSections] = useState<any[]>([]);

  // Load all sections (no role-based check)
  useEffect(() => {
    setSections([
      { href: `/Admin/AddAgencyPage`, label: "New Agency", icon: PlusCircleIcon },
      { href: `/Admin/AddUserPage`, label: "New User", icon: UserPlusIcon },
      { href: `/Admin/${agencyId}/TripDetail`, label: "Trips Detail", icon: TicketIcon },
      { href: `/Admin/${agencyId}/Passengers`, label: "Passengers", icon: UserGroupIcon },
      { href: `/Admin/${agencyId}/Bookings`, label: "Bookings", icon: BookOpenIcon },
      { href: `/Admin/${agencyId}/payment`, label: "Payment", icon: CreditCardIcon },
      { href: `/Admin/${agencyId}/receipt`, label: "Receipt", icon: ReceiptRefundIcon },
      { href: "/admin/logout", label: "Logout", icon: ArrowRightOnRectangleIcon },
    ]);
  }, [agencyId]);

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
            {desktopNavOpen ? <XMarkIcon className="w-6 h-6 text-blue-600" /> : <Bars3Icon className="w-6 h-6 text-blue-600" />}
          </button>
        </div>

        {/* Always show New Agency button */}
        {/* <div className="px-2 py-3 border-b border-gray-200">
          <Link
            href={`/Admin/AddAgencyPage`}
            className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors
              ${desktopNavOpen ? "bg-blue-500 text-white hover:bg-blue-600" : "justify-center text-blue-600 hover:bg-blue-50"}`}
          >
            <PlusCircleIcon className="h-6 w-6 flex-shrink-0" />
            {desktopNavOpen && <span className="font-medium">New Agency</span>}
          </Link>
        </div> */}

        {/* Sidebar Links */}
        <div className="flex flex-col gap-1 px-2 py-3 flex-1">
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
                <Icon className={`h-5 w-5 flex-shrink-0 ${active ? "text-blue-700" : "text-blue-600"}`} />
                {desktopNavOpen && <span className="font-medium">{label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Header */}
      <div className="md:hidden flex flex-col">
        <div className="bg-white border-b border-blue-100 shadow-sm flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="rounded focus:outline-none focus:ring-2 focus:ring-blue-400/50"
            >
              {mobileMenuOpen ? <XMarkIcon className="h-7 w-7 text-blue-600" /> : <Bars3Icon className="h-7 w-7 text-blue-600" />}
            </button>
            <div className="flex items-center space-x-2">
              <img src="https://cdn-icons-png.flaticon.com/512/69/69906.png" alt="RideWay Logo" className="h-7 w-7" />
              <h1 className="text-lg font-extrabold tracking-tight text-blue-600">RideWay</h1>
            </div>
          </div>
        </div>

        {/* Mobile Menu Links */}
        {mobileMenuOpen && (
          <div className="flex flex-col bg-white shadow-md border-b border-blue-100">
            {sections.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-4 py-3 transition-colors
                    ${active ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className={`h-5 w-5 ${active ? "text-blue-700" : "text-blue-600"}`} />
                  <span className="font-medium">{label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 overflow-x-hidden mt-0 md:mt-0">
        {children}
      </main>
    </div>
  );
}
