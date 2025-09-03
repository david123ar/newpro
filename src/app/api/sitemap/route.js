import { NextResponse } from "next/server";

const EXTERNAL_DATA_URL = "https://henpro.vercel.app";

// Fetch all IDs for dynamic URLs
async function fetchAllIds() {
  let allIds = [];

  for (let page = 1; page <= 135; page++) {
    const response = await fetch(
      `https://hent.shoko.fun/api/hen-all?page=${page}`
    );
    const data = await response.json();

    // Assuming the response contains an array of items with IDs
    const ids = data.results.data.all.map((item) => item.id);
    allIds = allIds.concat(ids);
  }

  return allIds;
}

// Fetch genre and studio URLs
async function fetchGenresAndStudios() {
  const response = await fetch(
    "https://hent.shoko.fun/api/hen-browse"
  );
  const data = await response.json();

  const genres = data.results.data.genre.map((genre) => genre.id);
  const studios = data.results.data.studios.map((studio) => studio.id);

  return { genres, studios };
}

export async function GET() {
  try {
    const allIds = await fetchAllIds();
    const { genres, studios } = await fetchGenresAndStudios();

    // Dynamic URLs for individual items
    const dynamicUrls = allIds
      .map(
        (id) => `
      <url>
        <loc>${EXTERNAL_DATA_URL}${id}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
    `
      )
      .join("");

    // Static URLs for browse, search, and random pages
    const staticUrls = `
      <url>
        <loc>${EXTERNAL_DATA_URL}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${EXTERNAL_DATA_URL}/search/go</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${EXTERNAL_DATA_URL}/browse/go</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${EXTERNAL_DATA_URL}/random/go</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
    `;

    // Genre URLs
    const genreUrls = genres
      .map(
        (genre) => `
      <url>
        <loc>${EXTERNAL_DATA_URL}/tags/genre?item=${genre}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
    `
      )
      .join("");

    // Studio URLs
    const studioUrls = studios
      .map(
        (studio) => `
      <url>
        <loc>${EXTERNAL_DATA_URL}/tags/brand?item=${studio}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
    `
      )
      .join("");

    // Combine all URLs
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${staticUrls}
        ${dynamicUrls}
        ${genreUrls}
        ${studioUrls}
      </urlset>
    `;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "text/xml",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
