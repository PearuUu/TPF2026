import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    layout("components/layout/ProtectedRoute.tsx", [
        route("devices",       "routes/devices.tsx"),
        route("automation",    "routes/automation.tsx"),
        route("settings",      "routes/settings.tsx"),
        route("addDevice",     "routes/addDevice.tsx"),
        route("notifications", "routes/notifications.tsx"),
    ]),
] satisfies RouteConfig;
