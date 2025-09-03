"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import NavSidebar from "../NavSideBar/NavSideBar";
import Footer from "../footer/Footer";

const Search = (props) => {
  let data = [];
  if (localStorage.getItem("searchData")) {
    data = JSON.parse(localStorage.getItem("searchData"));
  } else {
    data = props.data;
  }
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
        <div className="pagination">
          <div className="pagination-items">
            {props.pagin.map((i) => (
              <Link
                className={`pagination-item ${
                  props.page
                    ? parseInt(props.page) === i
                      ? "aligo"
                      : "pgino"
                    : i === 1
                    ? "aligo"
                    : "pgino"
                }`}
                key={i}
                href={`/search/go?page=${i}`}
              >
                {i}
              </Link>
            ))}
          </div>
          <Link
            className="pagination-next"
            href={`/search/go?page=${
              props.page ? parseInt(props.page) + 1 : 2
            }`}
          >
            <FaAngleRight />
          </Link>
        </div>
        <div className="animol">
          {props.data.results.data.all.map((i) => (
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
        <div className="pagination">
          <div className="pagination-items">
            {props.pagin.map((i) => (
              <Link
                className={`pagination-item ${
                  props.page
                    ? parseInt(props.page) === i
                      ? "aligo"
                      : "pgino"
                    : i === 1
                    ? "aligo"
                    : "pgino"
                }`}
                key={i}
                href={`/search/go?page=${i}`}
              >
                {i}
              </Link>
            ))}
          </div>
          <Link
            className="pagination-next"
            href={`/search/go?page=${
              props.page ? parseInt(props.page) + 1 : 2
            }`}
          >
            <FaAngleRight />
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Search;
