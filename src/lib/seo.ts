export const SITE_URL = "https://sculpted-world-showcase.lovable.app";

export function pageHead({ title, description, path, image, imageAlt, type = "website" }: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: string;
}) {
  const url = new URL(path, SITE_URL).href;
  const imageUrl = image ? new URL(image, SITE_URL).href : undefined;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:site_name", content: "Wisnu Kesuma" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      ...(imageUrl ? [
        { property: "og:image", content: imageUrl },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:type", content: "image/jpeg" },
        { property: "og:image:alt", content: imageAlt ?? title },
        { name: "twitter:image", content: imageUrl },
        { name: "twitter:image:alt", content: imageAlt ?? title },
      ] : []),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}