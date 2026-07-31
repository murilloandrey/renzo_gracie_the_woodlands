import { useEffect } from "react";

import { SITE_URL } from "@/config/site";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
};

function setMeta(
  selector: string,
  attr: "name" | "property",
  key: string,
  content: string,
) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

export function Seo({
  title,
  description,
  path = "/",
  image = "/social-card.png",
  noindex = false,
  structuredData,
}: SeoProps) {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${path === "/" ? "" : path}`;
    const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

    document.title = title;

    // Canonical. Without this, Vercel preview URLs and any ?utm_ variant can be
    // indexed as separate duplicate pages competing with the real one.
    setCanonical(canonicalUrl);

    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta(
      'meta[property="og:description"]',
      "property",
      "og:description",
      description,
    );
    setMeta('meta[property="og:type"]', "property", "og:type", "website");
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMeta('meta[property="og:image"]', "property", "og:image", imageUrl);
    setMeta(
      'meta[property="og:site_name"]',
      "property",
      "og:site_name",
      "Renzo Gracie The Woodlands",
    );
    setMeta('meta[property="og:locale"]', "property", "og:locale", "en_US");
    setMeta(
      'meta[name="twitter:card"]',
      "name",
      "twitter:card",
      "summary_large_image",
    );
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description",
      description,
    );
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", imageUrl);

    const robots = document.head.querySelector<HTMLMetaElement>(
      'meta[name="robots"]',
    );
    if (noindex) {
      setMeta('meta[name="robots"]', "name", "robots", "noindex, nofollow");
    } else {
      robots?.remove();
    }

    const existingJsonLd = document.getElementById("local-business-json-ld");
    existingJsonLd?.remove();
    if (structuredData) {
      const script = document.createElement("script");
      script.id = "local-business-json-ld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [description, image, noindex, path, structuredData, title]);

  return null;
}
