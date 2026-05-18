import type { Route } from "./+types/home";
import { Showcase } from "../features/showcase/components/Showcase";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Concierge Showcase" },
    { name: "description", content: "Component showcase for the smart home UI" },
  ];
}

export default function Home() {
  return <Showcase />;
}
