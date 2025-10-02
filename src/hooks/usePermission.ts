import { useAuth } from "@/context/AuthContext";

export const usePermission = (perm: string) => {
  const { permissions } = useAuth();
  return permissions?.includes(perm);
};


// <PermissionGate required="create_trip">
//   <button>Create Trip</button>
// </PermissionGate>
