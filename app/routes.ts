import { type RouteConfig, index , route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("devices", "routes/devices.tsx"),
    route("automation", "routes/automation.tsx"),
    route("settings", "routes/settings.tsx"),
    route("addDevice", "routes/addDevice.tsx")
] satisfies RouteConfig;