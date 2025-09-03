// app/tags/[id]/TagsClient.jsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";
import "./page.css";
import Navbar from "../Navbar/Navbar";
import NavSidebar from "../NavSideBar/NavSideBar";
import Footer from "../footer/Footer";

export default function TagsClient({ id, item, page, pagination, data }) {
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
      <div className="page-container">
        {/* Top Pagination */}
        <div className="pagination">
          <div className="pagination-items">
            {pagination.map((i) => (
              <Link
                key={i}
                className={`pagination-item ${page === i ? "aligo" : "pgino"}`}
                href={`/tags/${id}?item=${item.replace("/", "")}&page=${i}`}
              >
                {i}
              </Link>
            ))}
          </div>
          <Link
            className="pagination-next"
            href={`/tags/${id}?item=${item.replace("/", "")}&page=${page + 1}`}
          >
            <FaAngleRight />
          </Link>
        </div>

        {/* Anime Cards */}
        <div className="animol">
          {data.map((i) => (
            <Link key={i.id} className="anime-card" href={i.id}>
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

        {/* Bottom Pagination */}
        <div className="pagination">
          <div className="pagination-items">
            {pagination.map((i) => (
              <Link
                key={i}
                className={`pagination-item ${page === i ? "aligo" : "pgino"}`}
                href={`/tags/${id}?item=${item.replace("/", "")}&page=${i}`}
              >
                {i}
              </Link>
            ))}
          </div>
          <Link
            className="pagination-next"
            href={`/tags/${id}?item=${item.replace("/", "")}&page=${page + 1}`}
          >
            <FaAngleRight />
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
