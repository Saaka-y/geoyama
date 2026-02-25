import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { CiMenuBurger } from "react-icons/ci";

export function NavMenu() {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();

    const handleSignInOrOut = () => {
        if (session) {
            signOut({ callbackUrl: "/signin" });
            setOpen(false);
        } else {
            router.push("/signin");
            setOpen(false);
        }
    };

    return (
        <>
            <button
                className=" fixed top-4 left-4 z-50 p-2 bg-white/70 rounded-full shadow-lg"
                onClick={() => setOpen(!open)}
                aria-label="Open navigation menu"
            >
                <CiMenuBurger className="w-6 h-6 text-gray-800" />
            </button>

            {/* Menu Drawer */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40"
                    onClick={() => setOpen(false)}
                />
            )}
            <nav
                className={`fixed top-0 left-0 h-full w-64 bg-white/70 z-50 shadow-lg transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
            >
                <ul className="flex flex-col px-6 pt-8 gap-8">
                    <li>
                        <button
                            onClick={handleSignInOrOut}
                            className=" text-lg font-semibold text-gray-800 hover:text-blue-600"
                        >
                            {session ? "Sign out" : "Sign in"}
                        </button>
                    </li>

                    { session &&
                      <li>
                        <Link
                            href="/favorite"
                            className="text-lg font-semibold text-gray-800 hover:text-blue-600"
                            onClick={() => setOpen(false)}
                        >
                            Favorite
                        </Link>
                    </li>}
                </ul>
            </nav>
        </>
    );
}
