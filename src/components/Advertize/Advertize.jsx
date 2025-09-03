"use client";
import React, { useEffect, useState } from "react";
import "./advertize.css";

export default function Advertize(props) {
  const [time, setTime] = useState(new Date());
  const [showAd, setShowAd] = useState(false);

  const adLinks = [
    "https://processestheycod.com/vfy17qhd0?key=e4d13b83c983a7320105c4944bea069c", // EVEN clicks (2, 4, 6...)
    "https://processestheycod.com/esvngvvqes?key=09b5fc0aaedbb9d883cf646a4d1104cb", // ODD clicks (1, 3, 5...)
  ];

  const ls = typeof window !== "undefined" ? localStorage : null;

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);

    if (!ls) return;

    const lastDisplay = ls.getItem("lastDisplay");
    const lastDate = ls.getItem("lastDate");
    const lastHour = ls.getItem("lastHour");

    const currentDate = time.getDate();
    const currentHour = time.getHours();

    const lastDisplayDate = new Date(lastDisplay);
    const secondsSinceLastDisplay = Math.floor((time - lastDisplayDate) / 1000);

    const shouldShowAd =
      secondsSinceLastDisplay >= 30 ||
      currentDate !== parseInt(lastDate) ||
      currentHour !== parseInt(lastHour);

    setShowAd(shouldShowAd);

    return () => clearInterval(interval);
  }, [time]);

  function handleAdClick() {
    if (!ls) return;

    const clickCount = parseInt(ls.getItem("adClickCount") || "0", 10);
    const nextClick = clickCount + 1;

    const linkToOpen = nextClick % 2 === 1 ? adLinks[1] : adLinks[0]; // odd: [1], even: [0]

    // Save next state
    ls.setItem("adClickCount", nextClick.toString());
    ls.setItem("lastDisplay", new Date().toISOString());
    ls.setItem("lastDate", time.getDate().toString());
    ls.setItem("lastHour", time.getHours().toString());
    ls.setItem("truth", "false");

    window.open(linkToOpen, "_blank");
    setShowAd(false);
  }

  return (
    <div
      className="Advertize"
      style={{ zIndex: showAd ? 100 : -1 }}
      onClick={handleAdClick}
    ></div>
  );
}
