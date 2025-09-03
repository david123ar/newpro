"use client";
import React, { useEffect, useState } from "react";
import BouncingLoader from "../ui/bouncingloader/Bouncingloader";
import { Skeleton } from "../ui/Skeleton/Skeleton";
import Footer from "@/components/footer/Footer";
import NavSidebar from "@/components/NavSideBar/NavSideBar";
import Navbar from "@/components/Navbar/Navbar";
import "./page.css";

const loading = () => {
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
      <div className="compli">
        <div className="watc">
          <div>
            <div>
              <div className="relative inset-0 flex justify-center items-center bg-black bg-opacity-50 ifro">
                <BouncingLoader />
              </div>
            </div>
            <div>
              <div className="slab1 flex flex-col gap-3">
                <div className="titleD">
                  <Skeleton className="w-[200px] h-[20px] rounded-xl" />
                </div>
                <div className="viewD">
                  <Skeleton className="w-[70px] h-[20px] rounded-xl" />
                </div>
              </div>

              <div className="slab2">
                <div className="fourCon">
                  <div className="postCon">
                    <Skeleton className="w-[200px] h-[300px] rounded-none" />
                  </div>
                  <div className="fourA">
                    <div className="flex four1">
                      <div className="four11">
                        <div>
                          <div className="teamA">Brand</div>
                          <Skeleton className="w-[70px] h-[20px] rounded-xl" />
                        </div>
                      </div>
                      <div className="four12">
                        <Skeleton className="w-[70px] h-[20px] rounded-xl" />
                      </div>
                    </div>
                    <div className="four2">
                      <div className="teamA">Brand Uploads</div>
                      <Skeleton className="w-[70px] h-[20px] rounded-xl" />
                    </div>
                    <div className="flex four3">
                      <div className="four31">
                        <div>
                          <div className="teamA">Release Date</div>
                          <div className="restInfo">
                            <Skeleton className="w-[70px] h-[20px] rounded-xl" />
                          </div>
                        </div>
                      </div>
                      <div className="four32">
                        <div>
                          <div className="teamA">Upload Date</div>
                          <div className="restInfo">
                            <Skeleton className="w-[70px] h-[20px] rounded-xl" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="four4">
                      <div className="teamA">Alternate Title</div>
                      <div className="restInfo">
                        <Skeleton className="w-[70px] h-[20px] rounded-xl" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="descSlab flex flex-col gap-3">
                  {/* Tags row */}
                  <div className="tagG flex gap-2">
                    <Skeleton className="w-[70px] h-[20px] rounded-xl" />
                    <Skeleton className="w-[70px] h-[20px] rounded-xl" />
                    <Skeleton className="w-[70px] h-[20px] rounded-xl" />
                  </div>

                  {/* First line of description */}
                  <div className="desc1">
                    <Skeleton className="w-[200px] h-[10px] rounded-xl" />
                  </div>

                  {/* Paragraph-style lines */}
                  <div className="desc2 flex flex-col gap-1">
                    <Skeleton className="w-[200px] h-[10px] rounded-xl" />
                    <Skeleton className="w-[160px] h-[10px] rounded-xl" />
                    <Skeleton className="w-[100px] h-[10px] rounded-xl" />
                    <Skeleton className="w-[80px] h-[10px] rounded-xl" />
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <div>
            <div className="kalu">
              {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="alliu">
                  <div className="fixed-size-container">
                    <Skeleton className="w-[200px] h-[150px] rounded-none" />
                  </div>
                  <div className="iopu flex flex-col gap-2">
                    <div className="titleo">
                      <Skeleton className="w-[70px] h-[20px] rounded-xl" />
                    </div>
                    <div className="lopi">
                      <Skeleton className="w-[70px] h-[20px] rounded-xl" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default loading;
