// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// type Agency = {
//   id: number;
//   name: string;
// };

// export default function SelectAgency() {
//   const [agencies, setAgencies] = useState<Agency[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     // LocalStorage se agencies array nikaal lo
//     const storedAgencies = localStorage.getItem("agencies");
//     if (storedAgencies) {
//       setAgencies(JSON.parse(storedAgencies));
//     } else {
//       // agar agencies hi nahi mili to redirect kar do
//       router.push("/login");
//     }
//   }, [router]);

//   const handleSelect = (agency: Agency) => {
//     // user ne jo agency choose ki usko activeAgencyId me save karo
//     localStorage.setItem("activeAgencyId", String(agency.id));
//     localStorage.setItem("activeAgencyName", agency.name);

//     // redirect to admin dashboard
//     router.push("/Admin");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">
//         Select an Agency
//       </h1>

//       <div className="grid gap-4 w-full max-w-md">
//         {agencies.length > 0 ? (
//           agencies.map((agency) => (
//             <button
//               key={agency.id}
//               onClick={() => handleSelect(agency)}
//               className="w-full p-4 bg-white rounded-xl shadow hover:bg-blue-50 transition text-left"
//             >
//               <span className="text-lg font-medium text-gray-900">
//                 {agency.name}
//               </span>
//             </button>
//           ))
//         ) : (
//           <p className="text-gray-600 text-center">No agencies found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdAddCircle } from "react-icons/md";

interface Agency {
  id: number;
  name: string;
}

export default function SelectAgency() {
  const router = useRouter();
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAgencies = localStorage.getItem("agencies");
    if (storedAgencies) {
      setAgencies(JSON.parse(storedAgencies));
    }
    setLoading(false);
  }, []);

  const handleSelect = (agencyId: number) => {
    localStorage.setItem("activeAgencyId", agencyId.toString());
    router.push(`/Admin/${agencyId}`);
  };

  const handleAddNewAgency = () => {
    router.push("/AddAgencyPage");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen flex flex-col">
    {/* Navbar */}
      <header className="bg-gradient-to-b from-blue-50 to-white flex justify-between items-center px-8 py-4 shadow-sm">
        <div className="flex items-center space-x-2">
          {/* Placeholder Logo Icon (bus+train idea) */}
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
          <Link
            href="/Login"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            href="/Signup"
            className="text-gray-700 hover:text-blue-600"
          >
            Signup
          </Link>
        </nav>
      </header>
      <div className="flex flex-1 justify-center items-center mt-8 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg border border-blue-100">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Select or Add Agency
        </h1>

        {agencies.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-gray-600 font-semibold">Your Agencies</h2>
            {agencies.map((agency) => (
              <button
                key={agency.id}
                onClick={() => handleSelect(agency.id)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                {agency.name}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mb-4">
            You don’t have any agencies yet.
          </p>
        )}

        <div className="mt-6">
          <button
            onClick={handleAddNewAgency}
            className="flex items-center justify-center space-x-2 w-full border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition duration-300"
          >
            <MdAddCircle className="w-5 h-5" />
            <span>Add New Agency</span>
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

