import type { MetadataRoute } from "next";

const BASE_URL = "https://ailabelremove.com";

const ROUTES = [
  "",
  "/checker",
  "/cleaner",
  "/how-it-works",
  "/metadata-guide",
  "/exif-guide",
  "/xmp-guide",
  "/c2pa-guide",
  "/privacy",
  "/faq",
  "/about",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));
}
