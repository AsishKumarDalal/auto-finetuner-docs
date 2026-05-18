import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://autofinetuner.dev'; // Replace with actual production domain when deployed
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/_next/', '/static/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
