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
import { auth } from "@/libs/firebase";
import Cookies from "js-cookie";

import {
  AuthContextProps,
  LoginWithEmailPassword,
  SignWithEmailPassword,
  User,
} from "./types";

auth.languageCode = "pt";

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const handleSetUser = (currentUser: UserFirebase) => {
    const user = {
      id: currentUser.uid,
      name: currentUser.displayName || "",
      email: currentUser.email || "",
      avatar: currentUser.photoURL || undefined,
    };

    setUser(user);
    const SETE_DIAS = 7;
    Cookies.set("user", JSON.stringify(user), {
      expires: SETE_DIAS,
      path: "/",
    });
  };

  const loginWithEmailPassword = async (input: LoginWithEmailPassword) => {
    await setPersistence(auth, browserLocalPersistence);
    const { user } = await signInWithEmailAndPassword(
      auth,
      input.email,
      input.password
    );

    handleSetUser(user);
  };

  const signWithEmailPassword = async (input: SignWithEmailPassword) => {
    await setPersistence(auth, browserLocalPersistence);
    const { user } = await createUserWithEmailAndPassword(
      auth,
      input.email,
      input.password
    );
    handleSetUser(user);
  };

  const loginWithGoogle = async () => {
    await setPersistence(auth, browserLocalPersistence);
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

    const { user } = await signInWithPopup(auth, provider);
    handleSetUser(user);
  };

  const logout = async () => {
    Cookies.remove("user", { path: "/" });
    return signOut(auth);
  };

  useEffect(() => {
    const currentUser = Cookies.get("user");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setUser(user);
    }
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