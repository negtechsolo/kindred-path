import type { MetadataRoute } from "next";
import { articles } from "./articles";
import { guides } from "./content";
import { treatments, treatmentSlug } from "./data";
const base = "https://www.ifmkindredpathfertilitycentre.com";
export default function sitemap(): MetadataRoute.Sitemap { const paths=["","/about","/treatments","/team","/resources","/resources/articles","/contact","/book"]; return [...paths.map(path=>({url:`${base}${path}`,lastModified:new Date("2026-07-22")})),...treatments.map(t=>({url:`${base}/treatments/${treatmentSlug(t.title)}`,lastModified:new Date("2026-07-22")})),...guides.map(g=>({url:`${base}/resources/guides/${g.slug}`,lastModified:new Date("2026-07-22")})),...articles.map(a=>({url:`${base}/resources/articles/${a.slug}`,lastModified:new Date("2026-07-22")}))]; }
