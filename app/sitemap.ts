import { MetadataRoute } from "next";

const SITE_URL = "https://hojyokin-ai-delta.vercel.app";

const KEYWORD_SLUGS = [
  "hojokin-kobojigyo",
  "hojokin-it-dounyu",
  "hojokin-jigyou-saikouchiku",
  "hojokin-shinsei-kakikata",
  "hojokin-freelance",
  "hojokin-inshokuten",
  "josei-kin-ichiran-2026",
  "hojokin-sougyou",
  "hojokin-shinsa-point",
  "hojokin-consultant-hiyou",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const keywordEntries: MetadataRoute.Sitemap = KEYWORD_SLUGS.map((slug) => ({
    url: `${SITE_URL}/keywords/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/tool`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/blog/jgrants-hojyokin-ai`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/blog/monodukuri-hojyokin`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/blog/hojyokin-shinsei-tetsuzuki`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/blog/hojyokin-checklist`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...keywordEntries,
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/legal`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
