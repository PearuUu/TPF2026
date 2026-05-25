import type { Route } from "./+types/home";
import { Welcome } from "../welcome/Welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "IlOveT" },
    { name: "description", content: "Welcome to our IoT management app" },
  ];
}

export default function Home() {
  return <Welcome />;
}
