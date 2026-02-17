import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import Link from "next/link";

export function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>

      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white/70 rounded-full shadow-lg"
        onClick={() => setOpen(!open)}
        aria-label="Open navigation menu"
      >
        <CiMenuBurger className="w-6 h-6 text-gray-800" />
      </button>

      {/* Menu Drawer */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)} />
      )}
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-white/70 z-50 shadow-lg transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col p-6 gap-4">
          <Link href="/login" className="text-lg font-semibold text-gray-800 hover:text-blue-600" onClick={() => setOpen(false)}>
            Sign in
          </Link>
          <Link href="/favorite" className="text-lg font-semibold text-gray-800 hover:text-blue-600" onClick={() => setOpen(false)}>
            Favorite
          </Link>
        </div>
      </nav>
    </>
  );
}
