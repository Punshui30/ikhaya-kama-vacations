export type PageSEO = {
  title: string;
  description: string;
  path: string; // "/destinations/kenya"
  noindex?: boolean;
  ogImage?: string; // "/og/kenya.jpg"
  twitterCard?: "summary" | "summary_large_image" | "player";
  locale?: string;
  breadcrumbs?: { name: string; path: string }[];
  video?: { src: string; type?: string; width?: number; height?: number }; // optional OG video
};

export const SITE = {
  name: "Ikhaya KaMa Vacations",
  baseUrl: (import.meta as any).env?.VITE_SITE_URL || "https://example.com",
  defaultLocale: "en-US",
  logo: "/brand/logo.svg",
  social: {
    instagram: "",
    facebook: "",
    youtube: "",
    linkedin: ""
  }
};

export function absUrl(path: string) {
  return /^https?:\/\//i.test(path) ? path : `${SITE.baseUrl.replace(/\/$/,"")}${path}`;
}

export function canonical(seo: PageSEO) {
  return absUrl(seo.path);
}






