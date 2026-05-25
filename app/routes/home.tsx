import { useEffect, useState } from "react";
import type { Route } from "./+types/home";
import { Welcome } from "../welcome/Welcome";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "IlOveT" },
    { name: "description", content: "Welcome to our IoT management app" },
  ];
}

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('isLoggedIn')) setLoggedIn(true);
  }, []);

  if (!loggedIn) {
    return <Login onLogin={() => {
      setLoggedIn(true);
      sessionStorage.setItem('isLoggedIn', 'true')
    }} />;
  }

  return <Dashboard />;
}
