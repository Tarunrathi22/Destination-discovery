import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CultureQuest - AI Cultural Travel Companion",
  description: "Discover hidden cultural gems, listen to immersive storytelling, and connect with authentic heritage experiences powered by Gen AI.",
  keywords: ["travel", "cultural tourism", "heritage preservation", "generative AI", "local experiences", "itinerary planner"],
  authors: [{ name: "CultureQuest Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col antialiased bg-sand-50 text-sand-900 selection:bg-primary-200 selection:text-primary-900">
        {children}
      </body>
    </html>
  );
}
