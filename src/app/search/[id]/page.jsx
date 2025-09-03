import React from "react";
import "./page.css";
import Search from "@/components/Search/Search";

export default async function page({searchParams }) {
  let data = [];
  try {
    const res = await fetch(
      `https://hent.shoko.fun/api/hen-all?search=${
        searchParams.name ? searchParams.name : ""
      }&page=${searchParams.page ? searchParams.page : "1"}`,
      {
        cache: "no-store",
      }
    );
    data = await res.json();
  } catch (error) {
    console.error("Error fetching document:", error);
  }
  let pagin = [];
  if (parseInt(searchParams.page) === 1) {
    pagin = [1, 2, 3];
  }
  if (!searchParams.page) {
    pagin = [1, 2, 3];
  }
  if (parseInt(searchParams.page) > 1) {
    pagin = [
      parseInt(searchParams.page) - 1,
      parseInt(searchParams.page),
      parseInt(searchParams.page) + 1,
    ];
  }
  return (
    <>
      <Search pagin={pagin} data={data} page={searchParams.page} name={searchParams.name}/>
    </>
  );
}
