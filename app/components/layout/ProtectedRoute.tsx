import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";

export default function ProtectedRoute() {
    const navigate = useNavigate();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        if (sessionStorage.getItem("isLoggedIn") !== "true") {
            navigate("/", { replace: true });
        } else {
            setChecking(false);
        }
    }, [navigate]);

    if (checking) return null;

    return <Outlet />;
}
