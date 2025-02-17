"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Drawer() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/routines", label: "📋 Rutinas" },
    { href: "/exercises", label: "🏋️ Ejercicios" },
    { href: "/trainings", label: "🧠 Entrenamientos" },
  ];

  return (
    <div className="fixed min-h-screen flex-col justify-start bg-[#121212] w-80 p-4  mr-64">
      <button className="text-gray-400 text-2xl self-end">☰</button>

      <ul className="mt-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium ${
                  isActive
                    ? "bg-gray-700 text-gray-200"
                    : "text-gray-400 hover:bg-gray-700 hover:text-gray-200"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
