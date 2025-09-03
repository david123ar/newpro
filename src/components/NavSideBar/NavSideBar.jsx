import React from "react";
import { FaChevronLeft, FaComments, FaRandom } from "react-icons/fa";
import Link from "next/link";
import "./navSideBar.css";
import { IoMdHome } from "react-icons/io";
import { RiBubbleChartFill } from "react-icons/ri";
import { MdOutlineSearch } from "react-icons/md";
export default function NavSidebar(props) {
  return (
    <div
      className="navigation-sidebar f-poppins"
      style={{ zIndex: props.sidebarIsOpen ? 100 : -1 }}
      onClick={() => props.setSidebarIsOpen(false)}
    >
      <div
        className="navigation-list flex"
        style={{
          transform: props.sidebarIsOpen
            ? "translateX(250px)"
            : "translateX(-250px)",
        }}
      >
        <div className="button-group flex flex-col">
          <div
            className="flex items-center content-center close-menu"
            style={{ width: "60%" }}
            onClick={() => props.setSidebarIsOpen()}
          >
            <FaChevronLeft size={12} />
            Close Menu
          </div>
        </div>

        <div className="navigation-link-list">
          <ul>
            <li>
              <Link href="/" className="homop">
                <div className="icono">
                  <IoMdHome />
                </div>
                Home
              </Link>
            </li>
            <li>
              <Link href="/random/go" className="homop">
                <div className="icono">
                  <FaRandom />
                </div>
                Random
              </Link>
            </li>
            <li>
              <Link href="/search/go" className="homop">
                <div className="icono">
                  <MdOutlineSearch />
                </div>
                Search
              </Link>
            </li>
            <li>
              <Link href="/browse/go" className="homop">
                <div className="icono">
                  <RiBubbleChartFill />
                </div>
                Browse
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
