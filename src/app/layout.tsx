import Drawer from "@/components/ui/Drawer";
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
      {/* <head>
        <script src="https://unpkg.com/react-scan/dist/auto.global.js"></script>
      </head> */}
      <body className="relative flex flex-row h-screen ">
        <Drawer />
        <main className={`w-full ml-80 p-4 ${lexend.className}`}>{children}</main>
      </body>
    </html>
  );
}
