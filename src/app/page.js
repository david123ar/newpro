export const dynamic = "force-dynamic";

import React from "react";
import HomeClient from "@/components/HomeClient/HomeClient";
import { connectDB } from "@/lib/mongoClient";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Henpro";

export const metadata = {
  title: `Watch Free HD Hentai & Anime Videos - ${siteName}`,
  description: `Enjoy your unlimited hentai & anime collection. We are the definitive source for the best curated 720p / 1080p HD hentai videos, viewable by mobile phone and tablet, for free.`,
};

export default async function Page({ searchParams }) {
  const db = await connectDB();
  const username = searchParams?.ref || "testing";

  /** Get user */
  const userDoc = await db.collection("users").findOne({ username });
  const user = userDoc
    ? {
        id: userDoc._id.toString(),
        email: userDoc.email,
        username: userDoc.username,
        avatar: userDoc.avatar,
        bio: userDoc.bio || "",
        referredBy: userDoc.referredBy || null,
      }
    : null;

  /** Get publisher */
  const publisherDoc = await db.collection("publishers").findOne({ _id: username });
  const publisher = publisherDoc
    ? {
        id: publisherDoc._id,
        email: publisherDoc.email,
        username: publisherDoc.username || username,
        adUnit: publisherDoc.adUnit,
        joinedAt: publisherDoc.joinedAt,
      }
    : null;

  /** Referred publisher */
  let referredPublisher = null;
  if (user?.referredBy) {
    const referredDoc = await db.collection("publishers").findOne({ _id: user.referredBy });
    if (referredDoc) {
      referredPublisher = {
        id: referredDoc._id,
        username: referredDoc.username || user.referredBy,
        email: referredDoc.email,
        adUnit: referredDoc.adUnit,
        joinedAt: referredDoc.joinedAt,
      };
    }
  }

  /** Links and design */
  const linksDoc = await db.collection("links").findOne({ _id: username });
  const links = linksDoc?.links || [];
  const design = linksDoc?.design || "";

  /** Fetch homepage data */
  let json = { results: { data: { recent: [], trending: [], random: [] } } };
  try {
    const res = await fetch("https://hent.shoko.fun/api/hen-home", { cache: "no-store" });
    json = await res.json();
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }

  /** Prepare slides */
  const slides = (json.results.data.recent || []).map(i => ({
    id: i.id,
    title: i.title,
    views: i.views,
    image: i.poster,
  }));

  const slideo = (json.results.data.trending || []).map(i => ({
    id: i.id,
    title: i.title,
    views: i.views,
    image: i.poster,
  }));

  const slidel = (json.results.data.random || []).map(i => ({
    id: i.id,
    title: i.title,
    views: i.views,
    image: i.poster,
  }));

  return (
    <HomeClient
      slides={slides}
      slideo={slideo}
      slidel={slidel}
      user={user}
      publisher={publisher}
      referredPublisher={referredPublisher}
      links={links}
      design={design}
    />
  );
}
