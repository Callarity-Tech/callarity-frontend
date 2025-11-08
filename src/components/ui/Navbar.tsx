import React, { use } from "react";
import { motion } from "framer-motion";
import paperTexture from "../../assets/paper-texture.webp";
import { Link, useLocation } from "react-router";
import { useEffect } from "react";

type NavItem = {
  id: string;
  label: string;
  href?: string;
  type?: "button" | "link";
};

const navItems: NavItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "docs", label: "Docs", href: "#docs" },
  { id: "pricing", label: "Pricing", href: "#pricing" },
  { id: "login", label: "Login", href: "/login", type: "button" },
  { id: "register", label: "Register", href: "/register", type: "button" },
];

const Navbar: React.FC = () => {
 const location = useLocation();
  const [active, setActive] = React.useState<string>("home");
  const [hovered, setHovered] = React.useState<string | null>(null);

 useEffect(() => {
   // match active nav item based on current URL
   const current = navItems.find((item) => item.href === location.pathname);
   if (current) setActive(current?.id || "home");
 }, [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 pointer-events-none">
      <div className="max-w-5xl mx-auto px-4">
        <nav
          className="relative pointer-events-auto mx-auto w-fit rounded-3xl px-4 py-2 backdrop-blur-md bg-white/10 dark:bg-white/8 border border-white/10 dark:border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.07)] before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:opacity-70 after:absolute after:inset-x-0 after:top-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/40 after:to-transparent after:opacity-70 overflow-hidden"
          aria-label="Glassy dock navigation"
        >
          <img
            src={paperTexture}
            className="absolute inset-0 object-cover w-full h-full opacity-40"
          />

          {/* Subtle glowing white background layer */}
          <div className="absolute inset-0 bg-white/5 blur-2xl rounded-3xl" />

          <ul className="relative flex items-center gap-2 z-10">
            {/* Animated sliding background */}
            <motion.div
              layoutId="hover-bg"
              className="absolute top-0 bottom-0 rounded-2xl bg-gradient-to-br from-red-500/80 to-red-700/80 shadow-[0_0_15px_rgba(255,0,0,0.4)]"
              initial={{
    x: document.getElementById(active)?.offsetLeft || 0,
    width: document.getElementById(active)?.offsetWidth || 0,
  }}
              animate={{
                x: hovered
                  ? document.getElementById(hovered)?.offsetLeft || 0
                  : document.getElementById(active)?.offsetLeft || 0,
                width: hovered
                  ? document.getElementById(hovered)?.offsetWidth || 0
                  : document.getElementById(active)?.offsetWidth || 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{ zIndex: 0 }}
            />

            {navItems.map((item) => {
              const isActive = item.id === active;
              const isButton = item.type === "button";

              return (
                <li key={item.id} id={item.id} className="relative z-10">
                  <Link
                    onClick={() => {
                    
                      setActive(item.id);
                     
                    }}
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                    to={item.href || "#"}
                    className={`flex items-center justify-center z-1 px-4 py-2 rounded-2xl  text-sm transition-all duration-200 relative overflow-hidden ${
                      isButton
                        ? "border border-red-500/70  font-semibold hover:bg-red-600/30 text-red-100 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent before:opacity-70"
                        : isActive
                        ? "text-white"
                        : "text-gray-300 hover:text-white"
                    }`}
                   
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;