"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

import NavBar from "@/components/Navbar/Navbar";
import NavSidebar from "@/components/NavSideBar/NavSideBar";
import Advertize from "@/components/Advertize/Advertize";
import Footer from "@/components/footer/Footer";

export default function Nav({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const scrollPosition =
          window.scrollY || document.documentElement.scrollTop;
        if (scrollPosition > 0 && isScrolled === false) {
          setIsScrolled(true);
        } else if (scrollPosition === 0) {
          setIsScrolled(false);
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isScrolled]);

  return (
    <div className="app-container f-poppins">
      {/* <NavBar
        isScrolled={isScrolled}
        sidebarIsOpen={sidebarIsOpen}
        setSidebarIsOpen={setSidebarIsOpen}
      />
      <NavSidebar
        sidebarIsOpen={sidebarIsOpen}
        setSidebarIsOpen={setSidebarIsOpen}
      /> */}

      <Advertize />
      {children}

      {/* Only show script if not on /ad or /ad2 */}
      {/* {pathname !== "/ad" && pathname !== "/ad2" && (
        <Script
          src="//decencytopmost.com/ea/1c/79/ea1c798183baca79e1812cf43c17e87e.js"
          strategy="afterInteractive"
        />
      )} */}

      {/* <Footer /> */}
    </div>
  );
}
