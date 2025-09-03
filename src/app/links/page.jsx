import React from "react";
import "./link.css";
import Link from "next/link";

const links = [
  {
    title: "Anime Title One",
    url: "https://henpro.shoko.fun/fuuki-iin-to-fuuzoku-katsudou-episode-2",
  },
  {
    title: "Anime Title Two",
    url: "https://henpro.shoko.fun/fuuki-iin-to-fuuzoku-katsudou-episode-2",
  },
  {
    title: "Anime Title Three",
    url: "https://henpro.shoko.fun/fuuki-iin-to-fuuzoku-katsudou-episode-2",
  },
  {
    title: "Anime Title Four",
    url: "https://henpro.shoko.fun/fuuki-iin-to-fuuzoku-katsudou-episode-2",
  },
  {
    title: "Anime Title Five",
    url: "https://henpro.shoko.fun/fuuki-iin-to-fuuzoku-katsudou-episode-2",
  },
  {
    title: "Anime Title Six",
    url: "https://henpro.shoko.fun/fuuki-iin-to-fuuzoku-katsudou-episode-2",
  },
  {
    title: "Anime Title Seven",
    url: "https://henpro.shoko.fun/fuuki-iin-to-fuuzoku-katsudou-episode-2",
  },
  {
    title: "Anime Title Eight",
    url: "https://henpro.shoko.fun/fuuki-iin-to-fuuzoku-katsudou-episode-2",
  },
  {
    title: "Anime Title Nine",
    url: "https://henpro.shoko.fun/fuuki-iin-to-fuuzoku-katsudou-episode-2",
  },
  {
    title: "Anime Title Ten",
    url: "https://henpro.shoko.fun/fuuki-iin-to-fuuzoku-katsudou-episode-2",
  },
];

const LinkPage = () => {
  return (
    <div
      className="container"
      role="main"
      aria-label="Link page with banner ad"
    >
      <div
        className="banner-ad"
        role="banner"
        tabIndex={0}
        aria-label="Advertisement banner"
      >
        <iframe
          src="/ad"
          title="Ad Banner"
          style={{
            width: "100%",
            height: "90px",
            border: "none",
            overflow: "hidden",
          }}
          scrolling="no"
        ></iframe>
      </div>

      <h1>Sauce Links</h1>

      <div className="scroll-area">
        <ul className="link-list">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                href={link.url}
                // target="_blank"
                // rel="noopener noreferrer"
                // aria-label={`Link to ${link.title}`}
              >
                {index + 1}. {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer-note">
        Powered by Henpro • <small>© 2025</small>
      </div>
    </div>
  );
};

export default LinkPage;
