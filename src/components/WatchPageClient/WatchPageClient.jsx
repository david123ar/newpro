"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import NavSidebar from "@/components/NavSideBar/NavSideBar";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import "./watch.css";
import { usePathname } from "next/navigation";

export default function WatchPageClient({ data, datal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [showAd, setShowAd] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Show ad every time page changes
    setShowAd(true);
  }, [pathname]);

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
      {showAd && (
        <div style={overlayStyle}>
          <div style={adWrapperStyle}>
            {/* Close Button */}
            <button onClick={() => setShowAd(false)} style={closeButtonStyle}>
              ✕ Close
            </button>

            {/* Support Text */}
            <div style={supportTextStyle}>
              This ad supports <strong>Henpro</strong>
            </div>

            {/* Ad Script 1 */}
            <script
              async
              data-cfasync="false"
              src="//processestheycod.com/0a9b41bf6540401a759c03802d78f347/invoke.js"
            ></script>
            <div id="container-0a9b41bf6540401a759c03802d78f347" />

            {/* Ad Script 2 */}
            <script
              async
              data-cfasync="false"
              src="//processestheycod.com/33a497c32aa8ecfffc3d4653d57e37f4/invoke.js"
            ></script>
            <div id="container-33a497c32aa8ecfffc3d4653d57e37f4" />
          </div>
        </div>
      )}

      {/* Main Page */}
      <Navbar
        isScrolled={isScrolled}
        sidebarIsOpen={sidebarIsOpen}
        setSidebarIsOpen={setSidebarIsOpen}
      />
      <NavSidebar
        sidebarIsOpen={sidebarIsOpen}
        setSidebarIsOpen={setSidebarIsOpen}
      />

      <div className="compli">
        <div className="watc">
          <div>
            <iframe
              src={data?.url}
              frameBorder="0"
              className="ifro"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>

            <div className="prisod">
              <div className="slab1">
                <div className="titleD">{data?.title}</div>
                <div className="viewD">{data?.views}</div>
              </div>

              <div className="slab2">
                <div className="fourCon">
                  <div className="postCon">
                    <img src={data?.poster} alt="" className="posterD" />
                  </div>
                  <div className="fourA">
                    {/* More Info */}
                    <div className="flex four1">
                      <div className="four11">
                        <div>
                          <div className="teamA">Brand</div>
                          <div className="brando">{data?.info?.brand}</div>
                        </div>
                      </div>
                      <div className="four12">
                        {data?.cencored && (
                          <div className="cencored">{data.cencored}</div>
                        )}
                      </div>
                    </div>
                    <div className="four2">
                      <div className="teamA">Brand Uploads</div>
                      <div className="restInfo">{data?.info?.brandUploads}</div>
                    </div>
                    <div className="flex four3">
                      <div className="four31">
                        <div>
                          <div className="teamA">Release Date</div>
                          <div className="restInfo">
                            {data?.info?.releasedDate}
                          </div>
                        </div>
                      </div>
                      <div className="four32">
                        <div>
                          <div className="teamA">Upload Date</div>
                          <div className="restInfo">
                            {data?.info?.uploadDate}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="four4">
                      <div className="teamA">Alternate Title</div>
                      <div className="restInfo">
                        {data?.info?.alternateTitle}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="descSlab">
                  <div className="tagG">
                    {data?.moreInfo?.tags?.map((tag, idx) => (
                      <Link
                        key={idx}
                        className="tags"
                        href={`/tags/genre?item=${tag
                          .replace(" ", "-")
                          .toLowerCase()}`}
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                  <div className="desc1">{data?.moreInfo?.descripOne}</div>
                  {data?.moreInfo?.descripOne !==
                    data?.moreInfo?.descripTwo && (
                    <div className="desc2">{data.moreInfo.descripTwo}</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="kalu">
            {datal.map((i) => (
              <Link key={i.id} className="alliu" href={i.id}>
                <div className="fixed-size-container">
                  <img
                    src={i.banner}
                    alt={i.title}
                    className="fixed-size-img"
                  />
                </div>
                <div className="iopu">
                  <div className="titleo">{i.title}</div>
                  <div className="lopi">{i.views}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "#000",
  zIndex: 9999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "20px",
  overflowY: "auto", // 👈 add scroll here
};

const adWrapperStyle = {
  maxWidth: "800px",
  width: "90%",
  background: "#111",
  borderRadius: "12px",
  padding: "20px",
  position: "relative",
  textAlign: "center",
  // ❌ remove maxHeight & overflowY
};

const closeButtonStyle = {
  position: "absolute",
  top: "-20px",
  left: "50%",
  transform: "translateX(-50%)",
  padding: "6px 16px",
  fontSize: "16px",
  background: "#fff",
  color: "#000",
  border: "none",
  borderRadius: "999px",
  cursor: "pointer",
};

const supportTextStyle = {
  marginBottom: "15px",
  color: "#ccc",
  fontSize: "14px",
};
