import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
// import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignupPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password || !confirmPassword) {
            return alert("Email, password, and confirm password are required");
        } else if (password !== confirmPassword) {
            return alert("Passwords do not match");
        }

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    name: email.split("@")[0],
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                console.error("Signup failed:", data);
                alert("Signup failed. Please try again.");
            } else {
                await router.push("/");
            }

        } catch (error) {
            console.error("Signup error:", error);
            alert("Network error. Please try again.");
        }
    };

    return (
        <>
            <Head>
                <title>Sign Up - GeoYama</title>
            </Head>

            <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(/background.jpg)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        opacity: 0.8,
                    }}
                />

                <div
                    className="w-full max-w-md relative z-10"
                    style={{
                        background: "var(--card-bg)",
                        borderRadius: "var(--card-radius)",
                        padding: "2rem",
                        boxShadow: "var(--card-shadow)",
                    }}
                >
                    <div className="text-center mb-8">
                        <h1
                            className="text-4xl font-bold mb-2"
                            style={{ color: "var(--text-primary)" }}
                        >
                            GeoYama
                        </h1>
                        <p
                            className="text-base"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            Create your account
                        </p>
                    </div>

                    <form className="space-y-5">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold mb-2"
                                style={{ color: "var(--text-primary)" }}
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                required
                                className="w-full px-4 py-3 rounded-lg border-2 border-transparent focus:border-(--primary) outline-none transition-all"
                                style={{
                                    backgroundColor: "var(--select-bg)",
                                    color: "var(--text-primary)",
                                }}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold mb-2"
                                style={{ color: "var(--text-primary)" }}
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-3 rounded-lg border-2 border-transparent focus:border-(--primary) outline-none transition-all"
                                style={{
                                    backgroundColor: "var(--select-bg)",
                                    color: "var(--text-primary)",
                                }}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-semibold mb-2"
                                style={{ color: "var(--text-primary)" }}
                            >
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-3 rounded-lg border-2 border-transparent focus:border-(--primary) outline-none transition-all"
                                style={{
                                    backgroundColor: "var(--select-bg)",
                                    color: "var(--text-primary)",
                                }}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            onClick={handleSignup}
                            className="w-full py-3 rounded-lg font-semibold transition-all duration-200"
                            style={{
                                backgroundColor: "var(--primary)",
                                color: "white",
                                opacity: 1,
                                cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor =
                                    "var(--primary-hover)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor =
                                    "var(--primary)";
                            }}
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div
                        className="mt-6 text-center text-sm"
                        style={{ color: "var(--text-muted)" }}
                    >
                        <p>
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-semibold transition-colors"
                                style={{ color: "var(--primary)" }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color =
                                        "var(--primary-hover)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color =
                                        "var(--primary)";
                                }}
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
