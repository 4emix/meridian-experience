import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MERIDIAN — From Flat Line to Form",
  description:
    "Meridian Yapı — architecture, engineering and construction on the Aegean coast since 2006. Scroll the plan from 2D drawing into a 3D isometric model.",
};

export const viewport: Viewport = {
  themeColor: "#f5f2ea",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="grain antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
