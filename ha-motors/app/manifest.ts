import type { MetadataRoute } from "next";
import { business } from "@/lib/business";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${business.name} | Mobile Bike Mechanic Bloemfontein`,
    short_name: business.name,
    description: "Mobile motorcycle, scooter and quad repairs in Bloemfontein, plus delivery scooter rental.",
    start_url: "/",
    display: "standalone",
    theme_color: "#16181B",
    background_color: "#FFFFFF",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
