import { NextResponse } from "next/server";

export async function GET(req) {
  // Fetch the external API
  const response = await fetch('https://hent.shoko.fun/api/hen-random', { cache: 'no-store' });
  
  // Parse the JSON data from the response
  const user = await response.json();

  // Return the JSON data in the response
  return NextResponse.json(user);
}

export const revalidate = 0;
