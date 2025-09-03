// app/browse/BrowseClient.jsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsFire } from "react-icons/bs";
import { FaLeaf, FaRandom } from "react-icons/fa";
import { IoMdSearch, IoMdVideocam } from "react-icons/io";
import "./page.css";
import NavSidebar from "../NavSideBar/NavSideBar";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";
import { themeStyles, backgroundToTheme } from "@/styles/themeStyles"; // Adjust path if needed

export default function BrowseClient({
  data,
  user,
  publisher,
  referredPublisher,
  link,
  design,
}) {
  const designName = design?.split("/").pop()?.split(".")[0]; // "done" from "/done.jpg"
  const themeKey = backgroundToTheme[designName] || "redWhiteBlack";
  const theme = themeStyles[themeKey];
  const icons = [<BsFire />, <FaLeaf />, <FaRandom />, <IoMdSearch />];
  const links = ["/", "/browse/go", "/random/go", "/search/go"];

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
      <div className="comp-brow">
        <div
          className="bio-ad ad-bottom"
          style={{
            background: theme?.adBg,
            boxShadow: theme?.adShadow,
          }}
        >
          <iframe
            src={`/ad?theme=${design}`}
            title="Bottom Ad"
            scrolling="no"
            style={{ width: "100%", height: "90px", border: "none" }}
          />
          {user?.referredBy && (
            <iframe
              src={`/ad?user=${user?.referredBy}&theme=${design}`}
              title="Ref Ad"
              scrolling="no"
              style={{ width: "100%", height: "90px", border: "none" }}
            />
          )}
        </div>
        {/* Genres */}
        <div>
          <div className="heff">CATEGORIES TAGS</div>
          <div className="categis">
            {data.genre?.map((i) =>
              i.poster !== "https://i.imgur.com/jajIHZ7.jpg" ? (
                <Link
                  key={i.id}
                  className="imagi"
                  href={`/tags/genre?item=${i.id.replace("/genre/", "")}`}
                >
                  <img src={i.poster} alt="" />
                  <div className="belowJ"></div>
                  <div className="text-ovel-top">
                    <img src={i.firstPoster} alt="" />
                  </div>
                  <div className="text-ovel-sec">
                    {(i.title || i.titleOp)?.toUpperCase()}
                  </div>
                  <div className="text-ovel-thi">
                    {i.description || i.descriptionTwo}
                  </div>
                  <div className="text-ovel-bott">
                    <IoMdVideocam /> {i.videos || i.videosOpt}
                  </div>
                </Link>
              ) : null
            )}
          </div>

          {/* Mini Cards */}
          <div className="miniCards">
            {data.genre?.map((i) =>
              i.poster === "https://i.imgur.com/jajIHZ7.jpg" &&
              i.videosOpt !== "0" ? (
                <Link
                  key={i.id}
                  className="miniCard"
                  href={`/tags/genre?item=${i.id.replace("/genre/", "")}`}
                >
                  <div className="texy">
                    <div className="text-ovl-top">
                      <img src={i.firstPoster} alt="" />
                    </div>
                    <div className="titop">
                      {(i.title || i.titleOp)?.toUpperCase()}
                    </div>
                  </div>
                  <div className="vdo">
                    <IoMdVideocam /> {i.videos || i.videosOpt}
                  </div>
                </Link>
              ) : null
            )}
          </div>
        </div>

        <div
          className="bio-ad ad-bottom"
          style={{
            background: theme?.adBg,
            boxShadow: theme?.adShadow,
          }}
        >
          <iframe
            src={`/ad2?theme=${design}`}
            title="Bottom Ad"
            scrolling="no"
            style={{ width: "100%", height: "90px", border: "none" }}
          />
          {user?.referredBy && (
            <iframe
              src={`/ad?user=${user?.referredBy}&theme=${design}`}
              title="Ref Ad"
              scrolling="no"
              style={{ width: "100%", height: "90px", border: "none" }}
            />
          )}
        </div>

        {/* Studios */}
        <div>
          <div className="heff">ANIMATION STUDIOS BRANDS</div>
          <div className="fino">
            {data.studios?.map((i) => (
              <Link
                key={i.id}
                className="finalep"
                href={`/tags/brand?item=${i.id.replace("/brand/", "")}`}
              >
                <div className="finaltiti">{i.title.toUpperCase()}</div>
                <div className="finalvdo">{i.videos}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
