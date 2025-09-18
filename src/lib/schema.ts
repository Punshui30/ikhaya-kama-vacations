import { SITE } from "./seo";

export function organizationSchema(){
  return {
    "@context":"https://schema.org",
    "@type":"Organization",
    name:SITE.name,
    url:SITE.baseUrl,
    logo:SITE.logo,
    sameAs:Object.values(SITE.social).filter(Boolean)
  };
}

export function websiteSchema(){
  return {
    "@context":"https://schema.org",
    "@type":"WebSite",
    name:SITE.name,
    url:SITE.baseUrl,
    potentialAction:{
      "@type":"SearchAction",
      target:`${SITE.baseUrl}/search?q={query}`,
      "query-input":"required name=query"
    }
  };
}

export function breadcrumbsSchema(items:{name:string;path:string}[]){
  return {
    "@context":"https://schema.org",
    "@type":"BreadcrumbList",
    "itemListElement":items.map((b,i)=>({
      "@type":"ListItem",
      position:i+1,
      name:b.name,
      item:`${SITE.baseUrl}${b.path}`
    }))
  };
}

export function articleSchema(opts:{title:string;description:string;url:string;image:string;date:string;author:string}){
  return {
    "@context":"https://schema.org",
    "@type":"Article",
    headline:opts.title,
    description:opts.description,
    mainEntityOfPage:opts.url,
    image:[opts.image],
    author:[{"@type":"Person",name:opts.author}],
    publisher:{"@type":"Organization",name:SITE.name,logo:{"@type":"ImageObject",url:SITE.logo}},
    datePublished:opts.date,
    dateModified:opts.date
  };
}







