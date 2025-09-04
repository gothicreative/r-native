import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";
import { useApiClient, userApi } from "../utils/api";

export const useUserSync = () => {
  const { isSignedIn } = useAuth();
  const api = useApiClient();

  const syncUserMutation = useMutation({
    mutationFn: () => userApi.syncUser(api),
    onSuccess: (response: any) => {
      console.log("✅ User synced successfully:", response.data.user);
    },
    onError: (error: any) => {
      if (error.response) {
        console.error("❌ User sync failed - Server responded with:", error.response.data);
      } else if (error.request) {
        console.error("❌ User sync failed - No response received:", error.request);
      } else {
        console.error("❌ User sync failed - Error setting up request:", error.message);
      }
    },
  });

  useEffect(() => {
    if (isSignedIn && !syncUserMutation.data) {
      console.log("🔄 Attempting to sync user...");
      syncUserMutation.mutate();
    }
  }, [isSignedIn]);

  return null;
};
