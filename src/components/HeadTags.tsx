import { Helmet } from 'react-helmet-async';
import { PageSEO, canonical, absUrl, SITE } from "../lib/seo";
import { organizationSchema, websiteSchema, breadcrumbsSchema } from "../lib/schema";

export default function HeadTags({ seo }: { seo: PageSEO }) {
  const can = canonical(seo);
  const og = seo.ogImage ? absUrl(seo.ogImage) : absUrl("/og/default.jpg");
  const twitterCard = seo.twitterCard || (seo.video ? "player" : "summary_large_image");
  
  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="robots" content={seo.noindex ? "noindex,nofollow" : "index,follow"} />
      <link rel="canonical" href={can} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={can} />
      <meta property="og:image" content={og} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={og} />
      {seo.video && (
        <>
          <meta property="og:video" content={absUrl(seo.video.src)} />
          <meta property="og:video:secure_url" content={absUrl(seo.video.src)} />
          <meta property="og:video:type" content={seo.video.type || "video/mp4"} />
          {seo.video.width && <meta property="og:video:width" content={String(seo.video.width)} />}
          {seo.video.height && <meta property="og:video:height" content={String(seo.video.height)} />}
        </>
      )}
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(organizationSchema())}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(websiteSchema())}} />
      {seo.breadcrumbs?.length ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbsSchema(seo.breadcrumbs!))}} />
      ) : null}
    </Helmet>
  );
}
