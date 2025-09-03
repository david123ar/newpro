"use client";
import React, { useEffect, useState } from "react";
import "./advertize.css";

export default function Advertize() {
  const [time, setTime] = useState(new Date());
  const [showAd, setShowAd] = useState(false);

  // ✅ Single ad link
  const adLink =
    "https://decencytopmost.com/ukqgqrv4n?key=acf2a1b713094b78ec1cc21761e9b149";

  const ls = typeof window !== "undefined" ? localStorage : null;

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);

    if (!ls) return;

    const lastDisplay = ls.getItem("lastDisplay");
    const lastDate = ls.getItem("lastDate");
    const lastHour = ls.getItem("lastHour");

    const currentDate = time.getDate();
    const currentHour = time.getHours();

    const lastDisplayDate = lastDisplay ? new Date(lastDisplay) : null;
    const secondsSinceLastDisplay = lastDisplayDate
      ? Math.floor((time - lastDisplayDate) / 1000)
      : Infinity;

    const shouldShowAd =
      secondsSinceLastDisplay >= 30 ||
      currentDate !== parseInt(lastDate) ||
      currentHour !== parseInt(lastHour);

    setShowAd(shouldShowAd);

    return () => clearInterval(interval);
  }, [time]);

  function handleAdClick() {
    if (!ls) return;

    // track clicks if needed
    const clickCount = parseInt(ls.getItem("adClickCount") || "0", 10) + 1;

    ls.setItem("adClickCount", clickCount.toString());
    ls.setItem("lastDisplay", new Date().toISOString());
    ls.setItem("lastDate", time.getDate().toString());
    ls.setItem("lastHour", time.getHours().toString());
    ls.setItem("truth", "false");

    // ✅ Always open same link
    window.open(adLink, "_blank");
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
