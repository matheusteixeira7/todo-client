import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";
import axios from "axios";

import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type SignInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()

    if (token) {
      // recoverUserInformation().then(response => {
      //   setUser(response.user)
      // })
      console.log(token);
    }
  }, [])

  async function signIn({ email, password }: SignInData) {
    let user: User = null;
    let token: string = null;

    try {
      const { data } = await axios.post("http://localhost:8000/session", {
        email,
        password,
      });
      user = data.user;
      token = data.token;
    } catch (error) {
      console.log(error);
      throw new Error('Credenciais inválidas');
    }

    setCookie(undefined, "nextauth.token", token, {
      maxAge: 60 * 60 * 5, // 5 hours
    });

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    setUser(user);

    Router.push("/dashboard");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
