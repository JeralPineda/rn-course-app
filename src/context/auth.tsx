import { createContext, useContext, useEffect, useState } from "react";

export enum UserRole {
  Admin = "admin",
  User = "user",
  Guest = "guest",
}

export type User = {
  name: string;
  email: string;
  role: UserRole;
};

type AuthContext = {
  user: User | undefined;
  login: () => Promise<void>;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContext | undefined>(undefined);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    login();
  }, []);

  async function login() {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay
      setUser({
        name: "Jeral",
        email: "jeral@gmail.com",
        role: UserRole.User,
      });
    } catch (error) {
      alert("Something went awrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout: () => setUser(undefined),
        setUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("Please wrap the component with Auth Provider");
  }

  return context;
}
