import type { MetadataRoute } from "next";
// Client has not approved publication or final image/person rights review.
export default function robots():MetadataRoute.Robots{
 return {rules:{userAgent:"*",disallow:"/"},host:process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"};
}
