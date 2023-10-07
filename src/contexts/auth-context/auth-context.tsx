"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  signInWithPopup,
  User as UserFirebase,
  signOut,
} from "firebase/auth";
import { getAuth } from "@/libs/firebase";
import { useProtectedRoute } from "./use-protected-route";
import {
  AuthContextProps,
  LoginWithEmailPassword,
  SignWithEmailPassword,
  User,
} from "./types";

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useProtectedRoute(user);

  const handleSetUser = (user: UserFirebase) => {
    setUser({
      id: user.uid,
      name: user.displayName || "",
      email: user.email || "",
      avatar: user.photoURL || undefined,
    });
  };

  const loginWithEmailPassword = async (input: LoginWithEmailPassword) => {
    const auth = getAuth();
    auth.languageCode = "pt";

    await setPersistence(auth, browserLocalPersistence);
    const { user } = await signInWithEmailAndPassword(
      auth,
      input.email,
      input.password
    );

    handleSetUser(user);
  };

  const signWithEmailPassword = async (input: SignWithEmailPassword) => {
    const auth = getAuth();
    auth.languageCode = "pt";

    await setPersistence(auth, browserLocalPersistence);
    const { user } = await createUserWithEmailAndPassword(
      auth,
      input.email,
      input.password
    );
    handleSetUser(user);
  };

  const loginWithGoogle = async () => {
    const auth = getAuth();
    auth.languageCode = "pt";

    await setPersistence(auth, browserLocalPersistence);
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

    const { user } = await signInWithPopup(auth, provider);
    handleSetUser(user);
  };

  const logout = async () => {
    const auth = getAuth();

    return signOut(auth);
  };

  useEffect(() => {
    const { currentUser } = getAuth();
    if (currentUser) handleSetUser(currentUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signWithEmailPassword,
        loginWithEmailPassword,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext deve ser usado dentro do AuthProvider.");
  }

  return context;
};
