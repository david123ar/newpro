import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import Script from "next/script";
import Nav from "./Nav/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Watch Free Hentai Video Streams Online in 720p , 1080p HD - hanimetv",
  description: `Enjoy your unlimited hentai & anime
          collection. We are the definitive source for the best curated 720p /
          1080p HD hentai videos, viewable by mobile phone and tablet, for free.`,
  verification: {
    google: "x0aiWAODNGU-1UA2FXyORfyme9uWJir7mIMu8AMmLm4",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics Script */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-64QSGGL3N5"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-64QSGGL3N5');
          `,
          }}
        />
        {/* container required by the ad script */}
        <div id="container-917495758f35e40004f3af3fe8c04eb8"></div>

        {/* load external ad script via Next.js Script component */}
        <Script
          id="adsterra-917495758f35e40004f3af3fe8c04eb8"
          src="//decencytopmost.com/917495758f35e40004f3af3fe8c04eb8/invoke.js"
          strategy="afterInteractive"
          data-cfasync="false"
          async={true}
        />
      </head>
      <body className={inter.className}>
        <Nav>{children}</Nav>
      </body>
    </html>
  );
}
