import { getPosts } from "@/utils/utils";
import { baseURL, person } from "@/resources";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = getPosts(["src", "app", "posts"]);

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  // Generate RSS XML
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">

</rss>`;

  // Return the RSS XML with the appropriate content type
  return new NextResponse(rssXml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
