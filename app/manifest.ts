import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GET HYPED | Creative Content & Social Strategy Agency",
    short_name: "GET HYPED",
    description:
      "High-energy, high-impact social strategy and content formats that get your brand noticed.",
    start_url: "/",
    display: "standalone",
    background_color: "#FBF7EF",
    theme_color: "#FBF7EF",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  }
}
