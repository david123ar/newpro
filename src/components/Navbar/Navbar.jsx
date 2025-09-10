"use client";
import React, { useEffect, useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./navbar.css";

export default function Navbar(props) {
  const router = useRouter();
  const [searchForm, setSearchForm] = useState({ name: "" }); // main
  const [floatSearchForm, setFloatSearchForm] = useState({ name: "" }); // floating
  const [screenWidth, setScreenWidth] = useState(null);
  const [floatSearchIsVisible, setFloatSearchIsVisible] = useState(false);

  const [suggestionsMain, setSuggestionsMain] = useState([]);
  const [loadingMain, setLoadingMain] = useState(false);

  const [suggestionsFloat, setSuggestionsFloat] = useState([]);
  const [loadingFloat, setLoadingFloat] = useState(false);

  const setSidebarIsOpen = props.setSidebarIsOpen;
  const pageIsScrolled = props.isScrolled;

  function handleSearchForm(event) {
    const { name, value } = event.target;
    setSearchForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleFloatSearchForm(event) {
    const { name, value } = event.target;
    setFloatSearchForm((prev) => ({ ...prev, [name]: value }));
  }

  // debounce + fetch for main search dropdown
  useEffect(() => {
    const q = searchForm.name?.trim();
    if (!q) {
      setSuggestionsMain([]);
      setLoadingMain(false);
      return;
    }

    let cancelled = false;
    const t = setTimeout(async () => {
      setLoadingMain(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(q)}&page=1`,
          { cache: "no-store" }
        );
        const json = await res.json();
        if (cancelled) return;
        const arr = json?.results?.data?.all || [];
        setSuggestionsMain(arr.slice(0, 5));
      } catch (err) {
        console.error("Main suggestions error:", err);
        if (!cancelled) setSuggestionsMain([]);
      } finally {
        if (!cancelled) setLoadingMain(false);
      }
    }, 300);

    return () => {
      clearTimeout(t);
      cancelled = true;
    };
  }, [searchForm.name]);

  // debounce + fetch for floating search dropdown
  useEffect(() => {
    const q = floatSearchForm.name?.trim();
    if (!q) {
      setSuggestionsFloat([]);
      setLoadingFloat(false);
      return;
    }

    let cancelled = false;
    const t = setTimeout(async () => {
      setLoadingFloat(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(q)}&page=1`,
          { cache: "no-store" }
        );
        const json = await res.json();
        if (cancelled) return;
        const arr = json?.results?.data?.all || [];
        setSuggestionsFloat(arr.slice(0, 5));
      } catch (err) {
        console.error("Float suggestions error:", err);
        if (!cancelled) setSuggestionsFloat([]);
      } finally {
        if (!cancelled) setLoadingFloat(false);
      }
    }, 300);

    return () => {
      clearTimeout(t);
      cancelled = true;
    };
  }, [floatSearchForm.name]);

  const handleKeyPressMain = (e) => {
    if (e.key === "Enter" && searchForm.name.trim() !== "") {
      router.push(
        `/search/go?name=${encodeURIComponent(searchForm.name.trim())}`
      );
      setSearchForm({ name: "" });
      setSuggestionsMain([]);
    }
  };

  const handleKeyPressFloat = (e) => {
    if (e.key === "Enter" && floatSearchForm.name.trim() !== "") {
      router.push(
        `/search?name=${encodeURIComponent(floatSearchForm.name.trim())}`
      );
      setFloatSearchForm({ name: "" });
      setSuggestionsFloat([]);
      setFloatSearchIsVisible(false);
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

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Henpro";

  return (
    <div>
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
                  {siteName.includes("pro") ? (
                    <>
                      hen<span className="col-cls">pro</span>
                    </>
                  ) : (
                    <>
                      hanime<span className="col-cls">tv</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* MAIN Search (desktop/tablet) */}
        <div className="search-all relative">
          <div className="search-wrapperi relative">
            <input
              style={
                pageIsScrolled
                  ? {
                      backgroundColor: "rgba(71, 71, 71, 0.5)",
                      color: "var(--theme)",
                    }
                  : {
                      backgroundColor: "rgba(138, 135, 135, 0.5)",
                      color: "rgba(255, 255, 255, 0.9)",
                    }
              }
              type="text"
              className="search-text f-poppins trans-03"
              placeholder="Search anime..."
              name="name"
              value={searchForm?.name}
              onChange={handleSearchForm}
              onKeyDown={handleKeyPressMain}
              aria-label="Search anime"
            />

            <FaSearch
              onClick={() => {
                if (searchForm.name.trim() !== "") {
                  router.push(
                    `/search/go?name=${encodeURIComponent(
                      searchForm.name.trim()
                    )}`
                  );
                  setSearchForm({ name: "" });
                  setSuggestionsMain([]);
                }
              }}
              className="search-icon search-icons trans-03"
              size={20}
              style={
                pageIsScrolled ? { color: "var(--theme)" } : { color: "black" }
              }
            />

            {/* Main dropdown */}
            {searchForm.name !== "" &&
              (loadingMain || suggestionsMain.length > 0) && (
                <div className="search-dropdown" role="listbox">
                  {loadingMain && (
                    <div className="p-2 small muted">Loading...</div>
                  )}

                  {!loadingMain &&
                    suggestionsMain.map((item, i) => (
                      <Link
                        key={i}
                        href={item.id}
                        className="search-item"
                        onClick={() => {
                          setSearchForm({ name: "" });
                          setSuggestionsMain([]);
                        }}
                      >
                        <Image
                          src={item.poster}
                          alt={item.title}
                          width={48}
                          height={48}
                          className="search-thumbnail"
                        />
                        <div className="search-text-wrap">
                          <div className="search-title">{item.title}</div>
                          <div className="search-views">{item.views}</div>
                        </div>
                      </Link>
                    ))}

                  <button
                    className="view-all-btn"
                    onClick={() => {
                      router.push(
                        `/search/go?name=${encodeURIComponent(searchForm.name)}`
                      );
                      setSearchForm({ name: "" });
                      setSuggestionsMain([]);
                    }}
                  >
                    View All Results →
                  </button>
                </div>
              )}
          </div>
        </div>

        <div className="righty">
          <div className="user-profile-nots flex items-center content-center trans-c-03">
            {/* float search icon for narrow screens */}
            {screenWidth < 1300 && (
              <FaSearch
                onClick={() => {
                  setFloatSearchIsVisible((prev) => !prev);
                }}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>

          <div className="Lognn" onClick={() => router.push(`/browse/go`)}>
            LogIn
          </div>
        </div>
      </nav>

      {/* FLOATING search overlay (mobile/small screens) */}
      {floatSearchIsVisible && (
        <div
          className="floating-search-overlay"
          role="dialog"
          aria-modal="true"
        >
          <div className="floating-search-box">
            <div className="floating-input-row">
              <div className="flt-in">
                <input
                  type="text"
                  name="name"
                  className="search-text f-poppins"
                  placeholder="Search anime..."
                  value={floatSearchForm?.name}
                  onChange={handleFloatSearchForm}
                  onKeyDown={handleKeyPressFloat}
                  autoFocus
                />
              </div>
              <button
                className="float-close-btn"
                onClick={() => {
                  setFloatSearchIsVisible(false);
                  setFloatSearchForm({ name: "" });
                  setSuggestionsFloat([]);
                }}
                aria-label="Close search"
              >
                ✕
              </button>
            </div>

            <div className="floating-search-results">
              {loadingFloat && (
                <div className="p-2 small muted">Loading...</div>
              )}

              {!loadingFloat &&
                suggestionsFloat.map((item, i) => (
                  <Link
                    key={i}
                    href={item.id}
                    className="search-item"
                    onClick={() => {
                      setFloatSearchIsVisible(false);
                      setFloatSearchForm({ name: "" });
                      setSuggestionsFloat([]);
                    }}
                  >
                    <Image
                      src={item.poster}
                      alt={item.title}
                      width={56}
                      height={56}
                      className="search-thumbnail"
                    />
                    <div className="search-text-wrap">
                      <div className="search-title">{item.title}</div>
                      <div className="search-views">{item.views}</div>
                    </div>
                  </Link>
                ))}

              <button
                className="view-all-btn"
                onClick={() => {
                  router.push(
                    `/search?name=${encodeURIComponent(floatSearchForm.name)}`
                  );
                  setFloatSearchForm({ name: "" });
                  setSuggestionsFloat([]);
                  setFloatSearchIsVisible(false);
                }}
              >
                View All Results →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
