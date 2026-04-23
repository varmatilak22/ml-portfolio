import { useActor } from "@caffeineai/core-infrastructure";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createActor } from "../backend";

interface AuthContextValue {
  isAdmin: boolean;
  isChecking: boolean;
  checkAdmin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  isAdmin: false,
  isChecking: true,
  checkAdmin: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const checkAdmin = useCallback(async () => {
    if (!actor || isFetching) return;
    try {
      const result = await actor.isCallerAdmin();
      setIsAdmin(result);
    } catch {
      setIsAdmin(false);
    } finally {
      setIsChecking(false);
    }
  }, [actor, isFetching]);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsAdmin(false);
      setIsChecking(false);
      return;
    }
    if (isAuthenticated && actor && !isFetching) {
      setIsChecking(true);
      checkAdmin();
    }
  }, [isAuthenticated, actor, isFetching, checkAdmin]);

  return (
    <AuthContext.Provider value={{ isAdmin, isChecking, checkAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
