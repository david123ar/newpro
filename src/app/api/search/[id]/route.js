import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  // Fetch the external API using the ID from the params
  const response = await fetch(`https://hent.shoko.fun/api/hen-all?page=1&search=${params.id}`, { cache: 'no-store' });

  // Parse the JSON data from the response
  const user = await response.json();

  // Return the JSON data in the response
  return NextResponse.json(user);
}

export const revalidate = 0;
