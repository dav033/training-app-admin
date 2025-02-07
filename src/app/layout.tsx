import Drawer from "@/ui/Drawer";

import "./globals.css";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://unpkg.com/react-scan/dist/auto.global.js"></script>
      </head>
      <body className="flex flex-row">
        <Drawer />
        <main className = "w-full p-4">{children}</main>
      </body>
    </html>
  );
}
