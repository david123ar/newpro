"use client";
import React, { useEffect, useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import Image from "next/image";
import useAnime from "@/hooks/useAnime";
import Link from "next/link";
import "./navbar.css";
import { useRouter } from "next/navigation";

export default function Navbar(props) {
  const router = useRouter();
  const [searchForm, setSearchForm] = useState({ name: "" });
  const [screenWidth, setScreenWidth] = useState(null);
  const [floatSearchIsVisible, setFloatSearchIsVisible] = useState(false);
  const setSidebarIsOpen = props.setSidebarIsOpen;
  const pageIsScrolled = props.isScrolled;
  function handleSearchForm(event) {
    const { name, value } = event.target;
    setSearchForm((prev) => ({ ...prev, [name]: value }));
  }
  const hihi = searchForm?.name;
  const [data, setData] = useState([]);

  const { getSearch } = useAnime();
  let kat = null;
  const fetchLub = async () => {
    let dat = [];
    if (searchForm.name !== "") {
      dat = await getSearch(searchForm?.name);
      localStorage.removeItem("searchData");
    }
    kat = dat;
    console.log(dat);
    setData(dat);
    localStorage.setItem("searchData", JSON.stringify(dat));
  };

  useEffect(() => {
    fetchLub();
  }, [searchForm?.name]);

  const diljit = (id) => {
    setSearchForm({ name: "" });
    router.push(`/${id}`);
  };
  const viron = () => {
    setSearchForm({ name: "" });
    router.push(`/search/go?name=${searchForm?.name}`);
  };
  const lognn = () => {
    router.push(`/browse/go`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setSearchForm({ name: "" });
      hihi !== "" ? router.push(`/search/go?name=${searchForm?.name}`) : "";

      //window.location.replace('/watch');
      if (hihi !== "") {
        const { name, value } = e.target;
        setSearchForm((prev) => ({ ...prev, [name]: value }));
      } else {
        ("");
      }
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);

      function handleResize() {
        setScreenWidth(window.innerWidth);
      }

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return (
    <div>
      <>
        <nav
          className={`navigation-bar flex items-center ${
            pageIsScrolled ? "dark" : "transparent"
          } trans-03`}
        >
          <div className="menu-group flex items-center">
            <FaBars
              size={20}
              className="burger-icon trans-05"
              onClick={() => setSidebarIsOpen(true)}
            />
            <div className="logo-wrapper flex items-center">
              <Link href="/">
                <div style={{ width: "auto", height: "40px" }}>
                  <div className="logo0">
                    hen<div className="col-cls">pro</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="search-all">
            <Link className="search-wrapper" href={"/search/go"}>
              <input
                style={
                  pageIsScrolled
                    ? {
                        backgroundColor: "rgba(71, 71, 71, 0.5)",
                        color: "var(--theme)",
                      }
                    : {
                        backgroundColor: "rgba(138, 135, 135, 0.5)",
                        color: "rgba(255, 255, 255, 0.6)",
                      }
                }
                type="text"
                className="search-text f-poppins  trans-03"
                placeholder="Search anime..."
                name="name"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleKeyPress(e);
                  }
                }}
                value={searchForm?.name}
                onChange={(e) => handleSearchForm(e)}
              />

              {searchForm.name !== "" ? (
                <Link href={`/search/${searchForm?.name}`}>
                  <FaSearch
                    onClick={() => {
                      setSearchForm({ name: "" });
                    }}
                    className="search-icon search-icons trans-03"
                    size={20}
                    style={
                      pageIsScrolled
                        ? {
                            color: "var(--theme)",
                          }
                        : { color: "black" }
                    }
                  />
                </Link>
              ) : (
                <FaSearch
                  onClick={() => {
                    setSearchForm({ name: "" });
                  }}
                  className="search-icon search-icons trans-03"
                  size={20}
                  style={
                    pageIsScrolled
                      ? {
                          color: "var(--theme)",
                        }
                      : { color: "black" }
                  }
                />
              )}

              {/* <FaFilter className="filter-icon search-icons" size={20} color="grey" /> */}
            </Link>
          </div>
          <div className="righty">
            <div className="user-profile-nots flex items-center content-center trans-c-03">
              {screenWidth < 1300 && (
                <FaSearch
                  onClick={() => {
                    setFloatSearchIsVisible((prev) => !prev);
                  }}
                />
              )}
            </div>
            <div className="Lognn" onClick={lognn}>
              LogIn
            </div>
          </div>
        </nav>
        {floatSearchIsVisible && (
          <div>
            <Link className="floating-search-wrapper" href={"/search/go"}>
              <input
                type="text"
                className="search-text f-poppins"
                placeholder="Search anime..."
                name="name"
                value={searchForm?.name}
                onChange={(e) => handleSearchForm(e)}
                onKeyDown={(e) => handleKeyPress(e)}
              />
              <Link href={`/search?name=${searchForm?.name}`}>
                <FaSearch
                  onClick={() => {
                    setSearchForm({ name: "" });
                    setFloatSearchIsVisible(false);
                  }}
                  className="search-icon search-icons"
                  size={20}
                  color="black"
                />
              </Link>
            </Link>
          </div>
        )}
      </>
    </div>
  );
}
