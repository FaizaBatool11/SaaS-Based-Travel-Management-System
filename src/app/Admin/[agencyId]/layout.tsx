"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  TicketIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  BookOpenIcon,
  UserGroupIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { UserPlusIcon } from "lucide-react";
import PermissionGate from "@/components/PermissionGate";
import { useAuth } from "@/context/AuthContext";

// ✅ Section type
interface Section {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isLogout?: boolean;
  perm?: string;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [desktopNavOpen, setDesktopNavOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const params = useParams();
  const agencyId = params?.agencyId as string;
  const router = useRouter();
 const {permissions, logout } = useAuth();

  const [sections, setSections] = useState<Section[]>([]);

  // ✅ Redirect logic
  useEffect(() => {
    if (pathname === "/Admin/AddUserPage" || pathname === "/Admin/AddAgencyPage") return;
    if (pathname === "/Admin" || pathname === "/Admin/") {
      router.push("/Admin/1");
    }
  }, [pathname, router]);

  // ✅ Sidebar sections
  useEffect(() => {
    setSections([
      { href: `/Admin/AddAgencyPage`, label: "New Agency", icon: PlusCircleIcon, perm: "agencies:create" },
      { href: `/Admin/${agencyId}/AddUsers`, label: "New User", icon: UserPlusIcon, perm: "users:create" },
      { href: `/Admin/${agencyId}/AddRoles`, label: "Roles", icon: UserGroupIcon, perm: "roles:view" },
      { href: `/Admin/${agencyId}/TripDetail`, label: "Trips Detail", icon: TicketIcon, perm: "trips:read" },
      { href: `/Admin/${agencyId}/Passengers`, label: "Passengers", icon: UserGroupIcon, perm: "passengers:read" },
      { href: `/Admin/${agencyId}/Bookings`, label: "Bookings", icon: BookOpenIcon, perm: "bookings:read" },
      // { href: `/Admin/${agencyId}/payment`, label: "Payment", icon: CreditCardIcon },
      // { href: `/Admin/${agencyId}/receipt`, label: "Receipt", icon: ReceiptRefundIcon },
      { href: `#logout`, label: "Logout", icon: ArrowRightOnRectangleIcon, isLogout: true },
    ]);
  }, [agencyId]);

  // ✅ Handle Logout
  const handleLogout = () => {
  logout(); // Clears user, permissions, token
  setLogoutModalOpen(false);
  router.push("/Login");
};

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* ===== Sidebar Desktop ===== */}
      <nav
        className={`fixed top-0 left-0 h-screen bg-white border-r border-blue-100 shadow-md flex-col transition-all duration-300 hidden md:flex
        ${desktopNavOpen ? "w-60" : "w-16"}`}
      >
        {/* Logo + toggle */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          {desktopNavOpen && (
            <div className="flex items-center space-x-2">
              <Image
                src="https://cdn-icons-png.flaticon.com/512/69/69906.png"
                alt="RideWay Logo"
                width={32}
                height={32}
                className="h-8 w-8"
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
        <div className="flex flex-col gap-1 px-2 py-3 flex-1 overflow-y-auto">
          {sections.map(({ href, label, icon: Icon, isLogout, perm }) => {
          const active = pathname === href;

          if (isLogout) {
            // ✅ Logout button: always visible
            return (
              <button
                key={label}
                onClick={() => setLogoutModalOpen(true)}
                title={!desktopNavOpen ? label : undefined}
                className="group flex items-center gap-3 rounded-md px-3 py-2 transition-colors text-left w-full text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              >
                <Icon className="h-6 w-6 flex-shrink-0 text-blue-600" />
                {desktopNavOpen && <span className="font-medium">{label}</span>}
              </button>
            );
          }

          // ✅ Normal links: only show if no perm required or user has permission
          return (!perm || permissions.includes(perm)) ? (
            <Link
              key={label}
              href={href}
              title={!desktopNavOpen ? label : undefined}
              className={`group flex items-center gap-3 rounded-md px-3 py-2 transition-colors
                ${active ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"}`}
            >
              <Icon className={`h-6 w-6 flex-shrink-0 ${active ? "text-blue-700" : "text-blue-600"}`} />
              {desktopNavOpen && <span className="font-medium">{label}</span>}
            </Link>
          ) : null;
        })}
        </div>
      </nav>

      {/* ===== Mobile Navbar ===== */}
      <div className="md:hidden flex items-center justify-between bg-white border-b px-4 py-3 shadow-sm">
        <div className="flex items-center space-x-2">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/69/69906.png"
            alt="RideWay Logo"
            width={28}
            height={28}
          />
          <h1 className="text-lg font-bold text-blue-600">RideWay</h1>
        </div>
        <button onClick={() => setMobileMenuOpen(true)}>
          <Bars3Icon className="w-7 h-7 text-blue-600" />
        </button>
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Drawer */}
          <div className="relative w-64 bg-white shadow-lg p-4 flex flex-col">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4"
            >
              <XMarkIcon className="w-6 h-6 text-blue-600" />
            </button>

            <div className="mt-10 flex flex-col gap-2">
              {sections.map(({ href, label, icon: Icon, isLogout, perm }) => {
                const active = pathname === href;
                return (
                  <PermissionGate required={perm ?? ""} key={label}>
                    {isLogout ? (
                      <button
                        onClick={() => {
                          setLogoutModalOpen(true);
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                      >
                        <Icon className="h-6 w-6 text-blue-600" />
                        <span className="font-medium">{label}</span>
                      </button>
                    ) : (
                      <Link
                        href={href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md 
                          ${active ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"}`}
                      >
                        <Icon className="h-6 w-6 text-blue-600" />
                        <span className="font-medium">{label}</span>
                      </Link>
                    )}
                  </PermissionGate>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ===== Main Content ===== */}
      <main
        className={`flex-1 p-4 sm:p-6 transition-all duration-300 
        ${desktopNavOpen ? "md:ml-60" : "md:ml-16"}`}
      >
        {children}
      </main>

      {/* ===== Logout Modal ===== */}
      {logoutModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setLogoutModalOpen(false)}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
