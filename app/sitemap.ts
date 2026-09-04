import type { MetadataRoute } from "next";

const BASE_URL = "https://ailabelremove.vercel.app";

const ROUTES = [
  "",
  "/checker",
  "/cleaner",
  "/how-it-works",
  "/metadata-guide",
  "/exif-guide",
  "/xmp-guide",
  "/c2pa-guide",
  "/instagram-ai-label-guide",
  "/tiktok-ai-label-guide",
  "/facebook-ai-label-guide",
  "/pinterest-ai-label-guide",
  "/articles",
  "/articles/photo-privacy-checklist",
  "/articles/before-posting-social-media",
  "/articles/turn-off-gps-location",
  "/articles/sharenting-awareness",
  "/privacy",
  "/terms",
  "/disclaimer",
  "/contact",
  "/faq",
  "/about",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));
}
