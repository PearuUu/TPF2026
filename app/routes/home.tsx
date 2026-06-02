import { useEffect, useState } from "react";
import type { Route } from "./+types/home";
import { Login } from "../features/auth/components/Login";
import { Dashboard } from "../features/dashboard/components/Dashboard";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Concierge" },
        { name: "description", content: "Smart home dashboard" },
    ];
}

export default function Home() {
    const [isChecking, setIsChecking] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('isLoggedIn') === 'true') {
            setLoggedIn(true);
        }
        setIsChecking(false);
    }, []);

    if (isChecking) {
        return null; 
    }

    if (!loggedIn) {
        return (
            <Login 
                onLogin={() => {
                    setLoggedIn(true);
                    sessionStorage.setItem('isLoggedIn', 'true');
                }} 
            />
        );
    }

    return <Dashboard />;
}