import React from "react";
import "./page.css";
import { connectDB } from "@/lib/mongoClient";
import WatchPageClient from "@/components/WatchPageClient/WatchPageClient";

export async function generateMetadata({ params }) {
  function capitalizeWords(str) {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const paramsId = params.id;
  const formattedTitle = capitalizeWords(paramsId);

  return {
    title: `Watch ${formattedTitle} Hentai Video Streams Online in 720p , 1080p HD - henpro`,
    description: `Enjoy your unlimited hentai & anime
          collection. We are the definitive source for the best curated 720p /
          1080p HD hentai videos, viewable by mobile phone and tablet, for free.`,
  };
}

export default async function Page({ params }) {
  let imageURL = "";
  let data = {};
  let datal = [];
  const id = "/" + params.id + "/";

  try {
    const db = await connectDB();
    const collection = db.collection("hentai");

    const doc = await collection.findOne({ _id: id });
    if (doc) {
      data = doc;
      imageURL = doc.poster || "";
    }
  } catch (e) {
    console.error("Error fetching from MongoDB:", e);
  }

  // Fetch API data
  let apiData = [];
  try {
    const apiResponse = await fetch(`https://hent.shoko.fun/api/hen-random`, {
      cache: "no-store",
    });
    const newResponse = await apiResponse.json();
    apiData = newResponse.results.data;
  } catch (err) {
    console.error("Error fetching API:", err);
  }

  return <WatchPageClient data={data} datal={apiData} />;
}
