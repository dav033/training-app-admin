import Drawer from "@/ui/Drawer";
import { Lexend } from "next/font/google";
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "700"], // Especifica los pesos que necesitas
  variable: "--font-lexend",
});
import "./globals.css";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={lexend.className}>
      <head>
        <script src="https://unpkg.com/react-scan/dist/auto.global.js"></script>
      </head>
      <body className="flex flex-row bg-gray-">
        <Drawer />
        <main className={`w-full p-4 ${lexend.className}`}>{children}</main>
      </body>
    </html>
  );
}
