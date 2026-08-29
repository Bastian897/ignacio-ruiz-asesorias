import type { MetadataRoute } from "next";

const baseUrl = "https://ignacio-ruiz-asesorias.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${baseUrl}/` },
    { url: `${baseUrl}/terminos` },
    { url: `${baseUrl}/guia-7-senales` },
  ];
}
