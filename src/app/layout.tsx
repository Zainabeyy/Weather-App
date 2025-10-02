import type { Metadata } from "next";
import { DM_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { UnitsProvider } from "@/providers/UnitsContext";
import { SavedPlacesProvider } from "@/providers/savedPlaces";
import { DarkModeProviders } from "@/providers/DarkModeProviders";
import Navbar from "@/components/nav/Navbar";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather app",
  description: "A modern weather app to search locations, view detailed forecasts, compare cities, track UV index, use voice search, and install as a PWA.",
   keywords: [
    "Weather",
    "Forecast",
    "Weather Comparison",
    "PWA",
    "Next.js",
    "Tailwind",
  ],
  authors: [{ name: 'Zainab Azeem' },{name: 'Frontend Mentor'}],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        {/* Preload */}
        <link
          rel="preconnect"
          href="https://api.open-meteo.com"
          crossOrigin=""
        />
      </head>
      <body
        className={`${dmSans.variable} ${bricolageGrotesque.variable} antialiased`}
      >
        <DarkModeProviders>
          <UnitsProvider>
            <SavedPlacesProvider>
              <Navbar />
              {children}
            </SavedPlacesProvider>
          </UnitsProvider>
        </DarkModeProviders>
      </body>
    </html>
  );
}
