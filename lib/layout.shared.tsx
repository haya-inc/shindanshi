import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "shindanshi",
      url: "/",
    },
    links: [
      {
        text: "Home",
        url: "/",
      },
      {
        text: "Docs",
        url: "/docs",
      },
    ],
  };
}
