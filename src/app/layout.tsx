import type { Metadata, Viewport } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://vmart-siwan.example.com"),
  title: {
    default: "V-Mart Siwan — Style in Motion",
    template: "%s · V-Mart Siwan",
  },
  description:
    "SIWAN, MEET YOUR NEXT LOOK. Everyday fashion. Standout style. The official V-Mart Siwan (Bihar) store — shop Men, Women, Kids & Infants with cinematic style.",
  keywords: [
    "V-Mart Siwan",
    "V-Mart Siwan Bihar",
    "fashion Siwan",
    "Babunia More Siwan",
    "online shopping Siwan",
  ],
  openGraph: {
    title: "V-Mart Siwan — Style in Motion",
    description: "SIWAN, MEET YOUR NEXT LOOK. Everyday fashion. Standout style.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#08080b",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Inter:wght@300..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-dvh bg-[#08080b] text-zinc-100 antialiased">
        <a
          href="#top"
          className="sr-only z-[200] rounded-full bg-vmart-red px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <StoreProvider>
          <Providers>{children}</Providers>
        </StoreProvider>
      </body>
    </html>
  );
}
