import { useState } from "react";
import { Button } from "../../../components/base/Button";
import { Card } from "../../../components/base/Card";
import { signIn, signInWithGoogle, getMockUsers } from "../authService";

type Field = "email" | "password";

const IS_DEV = true;

export function Login({ onLogin }: { onLogin?: () => void }) {
    const [fields, setFields] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [authError, setAuthError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    function validate() {
        const next: Partial<Record<Field, string>> = {};
        if (!fields.email) next.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(fields.email))
            next.email = "Enter a valid email address.";
        if (!fields.password) next.password = "Password is required.";
        return next;
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFields((f) => ({ ...f, [name]: value }));
        if (errors[name as Field])
            setErrors((err) => ({ ...err, [name]: undefined }));
        setAuthError("");
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const next = validate();
        if (Object.keys(next).length) {
            setErrors(next);
            return;
        }
        setLoading(true);
        setAuthError("");
        try {
            await signIn(fields.email, fields.password);
            onLogin?.();
        } catch (err: unknown) {
            const code = (err as { code?: string })?.code ?? "";
            if (
                code === "auth/user-not-found" ||
                code === "auth/wrong-password" ||
                code === "auth/invalid-credential"
            ) {
                setAuthError("Invalid email or password. Please try again.");
            } else if (code === "auth/too-many-requests") {
                setAuthError("Too many failed attempts. Please wait and try again.");
            } else if (code === "auth/network-request-failed") {
                setAuthError("Network error. Check your connection and try again.");
            } else {
                setAuthError("Sign-in failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    async function handleGoogle() {
        setGoogleLoading(true);
        setAuthError("");
        try {
            await signInWithGoogle();
            onLogin?.();
        } catch (err: unknown) {
            const code = (err as { code?: string })?.code ?? "";
            if (code !== "auth/popup-closed-by-user") {
                setAuthError("Google sign-in failed. Please try again.");
            }
        } finally {
            setGoogleLoading(false);
        }
    }

    const mockUsers = IS_DEV ? getMockUsers() : [];

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-12">
            {/* Background ambient glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 overflow-hidden"
            >
                <div
                    style={{
                        position: "absolute",
                        top: "-10%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "600px",
                        height: "600px",
                        background:
                            "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)",
                        borderRadius: "50%",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "10%",
                        right: "15%",
                        width: "400px",
                        height: "400px",
                        background:
                            "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
                        borderRadius: "50%",
                    }}
                />
            </div>

            <div className="relative w-full max-w-sm">
                {/* Logo mark */}
                <div className="mb-8 flex flex-col items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-400/15 text-2xl text-sky-300 shadow-lg shadow-sky-500/10 ring-1 ring-inset ring-white/10">
                        ⌂
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-semibold text-white tracking-tight">Concierge</p>
                        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-400 mt-0.5">
                            Smart Home
                        </p>
                    </div>
                </div>

                {/* Card */}
                <Card className="px-6 py-7">
                    <div className="mb-6">
                        <h1 className="text-xl font-semibold text-white tracking-tight">
                            Welcome back
                        </h1>
                        <p className="mt-1 text-sm text-slate-400">
                            Sign in to your home dashboard.
                        </p>
                    </div>

                    {authError && (
                        <div className="mb-5 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
                            {authError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="space-y-4">
                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-1.5 block text-xs font-medium text-slate-300"
                                >
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={fields.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className={`w-full rounded-2xl border px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition
                                        bg-white/5 backdrop-blur-sm
                                        focus:bg-white/8 focus:ring-2 focus:ring-emerald-500/40
                                        ${errors.email
                                            ? "border-rose-500/50 focus:ring-rose-500/30"
                                            : "border-white/10 focus:border-emerald-500/40"
                                        }`}
                                />
                                {errors.email && (
                                    <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <div className="mb-1.5 flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="text-xs font-medium text-slate-300"
                                    >
                                        Password
                                    </label>
                                    <button
                                        type="button"
                                        className="text-xs text-emerald-400 hover:text-emerald-300 transition"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        value={fields.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className={`w-full rounded-2xl border px-4 py-3 pr-11 text-sm text-slate-100 placeholder-slate-500 outline-none transition
                                            bg-white/5 backdrop-blur-sm
                                            focus:bg-white/8 focus:ring-2 focus:ring-emerald-500/40
                                            ${errors.password
                                                ? "border-rose-500/50 focus:ring-rose-500/30"
                                                : "border-white/10 focus:border-emerald-500/40"
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition p-1"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                                <line x1="1" y1="1" x2="23" y2="23" />
                                            </svg>
                                        ) : (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1.5 text-xs text-rose-400">{errors.password}</p>
                                )}
                            </div>

                            {/* Remember me */}
                            <div className="flex items-center gap-2.5">
                                <button
                                    type="button"
                                    role="checkbox"
                                    aria-checked={rememberMe}
                                    onClick={() => setRememberMe((v) => !v)}
                                    className={`relative h-5 w-5 flex-shrink-0 rounded-md border transition
                                        ${rememberMe
                                            ? "border-emerald-500 bg-emerald-500"
                                            : "border-white/20 bg-white/5 hover:border-white/30"
                                        }`}
                                >
                                    {rememberMe && (
                                        <svg
                                            className="absolute inset-0 m-auto"
                                            width="11"
                                            height="11"
                                            viewBox="0 0 12 12"
                                            fill="none"
                                        >
                                            <path
                                                d="M2 6l3 3 5-5"
                                                stroke="#020817"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    )}
                                </button>
                                <span className="text-sm text-slate-400">Remember me for 30 days</span>
                            </div>
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            variant="primary"
                            className="mt-6 w-full"
                            disabled={loading || googleLoading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg
                                        className="animate-spin"
                                        width="15"
                                        height="15"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                    >
                                        <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
                                    </svg>
                                    Signing in…
                                </span>
                            ) : (
                                "Sign in"
                            )}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="my-5 flex items-center gap-3">
                        <div className="h-px flex-1 bg-white/8" />
                        <span className="text-xs text-slate-500">or</span>
                        <div className="h-px flex-1 bg-white/8" />
                    </div>

                    {/* Google sign-in */}
                    <Button
                        variant="secondary"
                        className="w-full"
                        disabled={loading || googleLoading}
                        onClick={handleGoogle}
                    >
                        {googleLoading ? (
                            <span className="flex items-center gap-2">
                                <svg
                                    className="animate-spin"
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                >
                                    <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
                                </svg>
                                Connecting…
                            </span>
                        ) : (
                            <>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Continue with Google
                            </>
                        )}
                    </Button>

                    {/* Dev-mode mock user hints */}
                    {IS_DEV && mockUsers.length > 0 && (
                        <div className="mt-5 rounded-2xl border border-sky-500/20 bg-sky-500/5 px-4 py-3">
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-sky-400">
                                Dev — mock accounts
                            </p>
                            <ul className="space-y-1">
                                {mockUsers.map((u) => (
                                    <li key={u.email}>
                                        <button
                                            type="button"
                                            className="text-left text-xs text-slate-400 hover:text-slate-200 transition"
                                            onClick={() =>
                                                setFields((f) => ({ ...f, email: u.email }))
                                            }
                                        >
                                            <span className="text-slate-300">{u.displayName}</span>
                                            {" · "}
                                            {u.email}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Card>

                {/* Footer link */}
                <p className="mt-5 text-center text-sm text-slate-500">
                    Don&apos;t have an account?{" "}
                    <button type="button" className="text-emerald-400 hover:text-emerald-300 transition font-medium">
                        Request access
                    </button>
                </p>

                {/* Security badge */}
                <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-600">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Secured with end-to-end encryption
                </p>
            </div>
        </div>
    );
}
