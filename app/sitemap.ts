import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config/site'

// One-page bilingue : deux URLs, liées par hreflang.
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    fr: siteConfig.url,
    en: `${siteConfig.url}/en`,
  }
  return [
    { url: siteConfig.url, lastModified: new Date(), alternates: { languages } },
    { url: `${siteConfig.url}/en`, lastModified: new Date(), alternates: { languages } },
  ]
}
