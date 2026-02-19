import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            setIsLoading(false);

            if (result?.error) {
                setError("Invalid email or password");
            } else {
                router.push("/");
            }
        } catch (error) {
            console.log("Login failed", error);
            alert("Network error. Please try again.");
        }
    };

    return (
        <>
            <Head>
                <title>Login - GeoYama</title>
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
                            Welcome back, hiker!
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
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

                        {/* Error Message */}
                        {error && (
                            <div
                                className="text-sm p-3 rounded-lg"
                                style={{
                                    backgroundColor: "rgba(255, 71, 87, 0.1)",
                                    color: "#ff4757",
                                    border: "1px solid #ff4757",
                                }}
                            >
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 rounded-lg font-semibold transition-all duration-200"
                            style={{
                                backgroundColor: "var(--primary)",
                                color: "white",
                                opacity: isLoading ? 0.6 : 1,
                                cursor: isLoading ? "not-allowed" : "pointer",
                            }}
                            onMouseEnter={(e) => {
                                if (!isLoading) {
                                    e.currentTarget.style.backgroundColor =
                                        "var(--primary-hover)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor =
                                    "var(--primary)";
                            }}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div
                        className="mt-6 text-center text-sm"
                        style={{ color: "var(--text-muted)" }}
                    >
                        <p>
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/"
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
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
