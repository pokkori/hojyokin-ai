import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://hojyokin-ai-delta.vercel.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://hojyokin-ai-delta.vercel.app/tool",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    { url: "https://hojyokin-ai-delta.vercel.app/blog", lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: "https://hojyokin-ai-delta.vercel.app/blog/jgrants-hojyokin-ai", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://hojyokin-ai-delta.vercel.app/blog/monodukuri-hojyokin", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://hojyokin-ai-delta.vercel.app/blog/hojyokin-shinsei-tetsuzuki", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://hojyokin-ai-delta.vercel.app/blog/hojyokin-checklist", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    {
      url: "https://hojyokin-ai-delta.vercel.app/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://hojyokin-ai-delta.vercel.app/legal",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: "https://hojyokin-ai-delta.vercel.app/terms",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: "https://hojyokin-ai-delta.vercel.app/privacy",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
