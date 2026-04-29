import * as React from "react";
import { cn } from "@/lib/utils";

export interface FooterLinkGroup {
  title: string;
  links: { label: string; href?: string }[];
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  platform?: "desktop" | "mobile";
  /** 로고 슬롯 */
  logo?: React.ReactNode;
  /** 소셜 아이콘 슬롯 목록 */
  socialIcons?: React.ReactNode[];
  /** 링크 컬럼 목록 */
  linkGroups?: FooterLinkGroup[];
}

const defaultLinkGroups: FooterLinkGroup[] = [
  {
    title: "Use cases",
    links: [
      { label: "UI design" },
      { label: "UX design" },
      { label: "Wireframing" },
      { label: "Diagramming" },
      { label: "Brainstorming" },
      { label: "Online whiteboard" },
      { label: "Team collaboration" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Design" },
      { label: "Prototyping" },
      { label: "Development features" },
      { label: "Design systems" },
      { label: "Collaboration features" },
      { label: "Design process" },
      { label: "FigJam" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog" },
      { label: "Best practices" },
      { label: "Colors" },
      { label: "Color wheel" },
      { label: "Support" },
      { label: "Developers" },
      { label: "Resource library" },
    ],
  },
];

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      className,
      platform = "desktop",
      logo,
      socialIcons,
      linkGroups = defaultLinkGroups,
      ...props
    },
    ref
  ) => {
    const isMobile = platform === "mobile";

    return (
      <footer
        ref={ref}
        className={cn(
          "bg-default-default border-t border-default-default flex overflow-hidden",
          isMobile
            ? "flex-col gap-1600 p-800 w-full"
            : "flex-wrap gap-400 pt-800 pb-4000 px-800 w-full",
          className
        )}
        {...props}
      >
        {/* 로고 + 소셜 */}
        <div
          className={cn(
            "flex shrink-0 min-w-[240px]",
            isMobile
              ? "items-center justify-between w-full"
              : "flex-col gap-600 items-start w-[262px]"
          )}
        >
          <div className="shrink-0">
            {logo ?? (
              <span className="text-xl font-bold text-brand-default">Logo</span>
            )}
          </div>
          {socialIcons && (
            <div className="flex items-center gap-400">
              {socialIcons.map((icon, i) => (
                <span key={i} className="shrink-0 cursor-pointer">
                  {icon}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 링크 컬럼 */}
        {linkGroups.map((group) => (
          <div
            key={group.title}
            className={cn(
              "flex flex-col gap-300 items-start shrink-0",
              isMobile ? "w-full gap-200" : "w-[262px]"
            )}
          >
            <div
              className={cn(
                "pb-400 w-full",
                isMobile && "pb-100"
              )}
            >
              <p className="font-semibold text-sm leading-[1.4] text-default-default whitespace-nowrap">
                {group.title}
              </p>
            </div>
            {group.links.map((link) => (
              <a
                key={link.label}
                href={link.href ?? "#"}
                className="text-sm leading-[1.4] text-default-default whitespace-nowrap hover:text-brand-default transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </footer>
    );
  }
);
Footer.displayName = "Footer";

export { Footer };
