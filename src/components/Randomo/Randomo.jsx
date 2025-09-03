"use client";
import React, { useEffect, useState } from "react";
import "./randomo.css";
import Link from "next/link";
import Navbar from "../Navbar/Navbar";
import NavSidebar from "../NavSideBar/NavSideBar";
import Footer from "../footer/Footer";

const Randomo = (props) => {
  const oop = () => {
    window.location.reload();
  };
  const [isScrolled, setIsScrolled] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <Navbar
        isScrolled={isScrolled}
        sidebarIsOpen={sidebarIsOpen}
        setSidebarIsOpen={setSidebarIsOpen}
      />
      <NavSidebar
        sidebarIsOpen={sidebarIsOpen}
        setSidebarIsOpen={setSidebarIsOpen}
      />
      <div className="pagito">
        <div className="randio">
          {" "}
          <div className="inrandi" onClick={() => oop()}>
            Randomize
          </div>
        </div>
        <div className="animol">
          {props.data.results.data.map((i) => (
            <Link className="anime-card" key={i.id} href={i.id}>
              <div className="poster-wrapper">
                <img src={i.poster} alt={i.title} className="poster" />
                <div className="gradient-overlay"></div>
              </div>
              <div className="below-poster">
                <h3 className="title">{i.title}</h3>
                <p className="views">{i.views} views</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="randio">
          <div className="inrandi" onClick={() => oop()}>
            Randomize
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Randomo;
