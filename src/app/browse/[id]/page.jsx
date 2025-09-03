// app/browse/[id]/page.jsx
import React from "react";
import BrowseClient from "@/components/BrowseClient/BrowseClient";
import { connectDB } from "@/lib/mongoClient";

export const metadata = {
  title: "Browse Free Hentai Video Streams Online in 720p , 1080p HD - henpro",
  description: `Enjoy your unlimited hentai & anime collection. We are the definitive source for the best curated 720p / 1080p HD hentai videos, viewable by mobile phone and tablet, for free.`,
};

export default async function Page({ searchParams }) {
  const db = await connectDB();
  const searchParam = await searchParams;
  const username = searchParam?.ref || "testing";

  // Get user by username
  const userDoc = await db.collection("users").findOne({ username });

  const user = userDoc
    ? {
        id: userDoc._id?.toString() || "",
        email: userDoc.email || "",
        username: userDoc.username || username,
        avatar: userDoc.avatar || "",
        bio: userDoc.bio || "",
        referredBy: userDoc.referredBy || null,
      }
    : {
        id: "",
        email: "",
        username,
        avatar: "",
        bio: "",
        referredBy: null,
      };

  // Get publisher by username (since now _id = username in publishers)
  const publisherDoc = await db
    .collection("publishers")
    .findOne({ _id: username });

  const publisher = publisherDoc
    ? {
        id: publisherDoc._id || "",
        email: publisherDoc.email || "",
        username: publisherDoc.username || username,
        adUnit: publisherDoc.adUnit || "",
        joinedAt: publisherDoc.joinedAt || "",
      }
    : null;

  // Referred publisher (if exists)
  let referredPublisher = null;
  if (user?.referredBy) {
    const referredDoc = await db
      .collection("publishers")
      .findOne({ _id: user.referredBy });

    if (referredDoc) {
      referredPublisher = {
        id: referredDoc._id || "",
        username: referredDoc.username || user.referredBy,
        email: referredDoc.email || "",
        adUnit: referredDoc.adUnit || "",
        joinedAt: referredDoc.joinedAt || "",
      };
    }
  }

  // Get links and design
  const linksDoc = await db.collection("links").findOne({ _id: username });
  const links = linksDoc?.links || [];
  const design = linksDoc?.design || "";

  // Fetch browsing data
  let data = [];
  try {
    const res = await fetch("https://hent.shoko.fun/api/hen-browse", {
      cache: "no-store",
    });
    data = await res.json();
  } catch (error) {
    console.error("Error fetching browsing data:", error);
  }

  return (
    <BrowseClient
      data={data?.results?.data || []}
      user={user}
      publisher={publisher}
      referredPublisher={referredPublisher}
      links={links}
      design={design}
    />
  );
}
