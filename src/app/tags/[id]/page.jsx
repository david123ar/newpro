// app/tags/[id]/page.jsx
import React from "react";
import TagsClient from "@/components/TagsClient/TagsClient";

export default async function Page({ params, searchParams }) {
  let data = { results: { data: [] } };
  let pageNum = parseInt(searchParams.page) || 1;

  try {
    const res = await fetch(
      `https://hent.shoko.fun/api/hen-cat?brand=${params.id}&item=${searchParams.item}&page=${pageNum}`,
      { cache: "no-store" }
    );
    data = await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  const pagination =
    pageNum === 1
      ? [1, 2, 3]
      : [pageNum - 1, pageNum, pageNum + 1];

  return (
    <TagsClient
      id={params.id}
      item={searchParams.item}
      page={pageNum}
      pagination={pagination}
      data={data.results.data}
    />
  );
}
