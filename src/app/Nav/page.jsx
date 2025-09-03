"use client";
import React, { useState, useEffect } from "react";
import NavBar from "@/components/Navbar/Navbar";
import NavSidebar from "@/components/NavSideBar/NavSideBar";
import Advertize from "@/components/Advertize/Advertize";
import Footer from "@/components/footer/Footer";

export default function Nav({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

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
      {/* <Footer /> */}
    </div>
  );
}
