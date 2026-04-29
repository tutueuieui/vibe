"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * Figma 정확 스펙 (node 44:5238)
 * ─────────────────────────────────────────
 * Desktop  : w-full, px/py=32px(space-800), gap=24px(space-600), border-b 1px
 * Mobile Default: px/py=24px(space-600), border-b 1px, 로고 + 햄버거
 * Mobile Open   : flex-col, gap=64px(space-1600), px=24px py=32px, 세로 네비 + 버튼
 *
 * Nav Pill     : p=8px(space-200), rounded=8px(radius-200)
 *                active → bg-background-brand-tertiary(#f5f5f5)
 * Sign in btn  : bg-neutral-tertiary, border-neutral-secondary, p=8px, rounded=8px
 * Register btn : bg-brand-default(#2c2c2c), border-brand-default, p=8px, text-brand-on-brand(#f5f5f5)
 */

export interface NavLink {
  label: string;
  href?: string;
  active?: boolean;
}

export interface HeaderProps {
  className?: string;
  logo?: React.ReactNode;
  navLinks?: NavLink[];
  onSignIn?: () => void;
  onRegister?: () => void;
  signInLabel?: string;
  registerLabel?: string;
}

const DEFAULT_LINKS: NavLink[] = [
  { label: "Products" },
  { label: "Solutions", active: true },
  { label: "Community" },
  { label: "Resources" },
  { label: "Pricing" },
  { label: "Contact" },
  { label: "Link" },
];

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  (
    {
      className,
      logo,
      navLinks = DEFAULT_LINKS,
      onSignIn,
      onRegister,
      signInLabel = "Sign in",
      registerLabel = "Register",
    },
    ref
  ) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    /** 네비게이션 알약 아이템 */
    const NavPill = ({ link }: { link: NavLink }) => (
      <a
        href={link.href ?? "#"}
        className={cn(
          // 피그마: p=8px(space-200), rounded=8px(radius-200)
          "flex items-center justify-center px-200 py-200 rounded-200 shrink-0",
          "text-base font-normal leading-none whitespace-nowrap transition-colors",
          // active → bg-background-brand-tertiary(#f5f5f5)
          link.active
            ? "bg-background-brand-secondary text-text-brand-on-brand-secondary"
            : "text-text-default-default hover:bg-background-default-secondary"
        )}
      >
        {link.label}
      </a>
    );

    /** Auth 버튼 영역 */
    const AuthButtons = ({ fullWidth = false }: { fullWidth?: boolean }) => (
      <div
        className={cn(
          "flex gap-300 items-center shrink-0",
          fullWidth ? "w-full" : "w-[178px]"
        )}
      >
        {/* Sign in
            피그마: bg-neutral-tertiary, border-neutral-secondary, p=8px, rounded=8px */}
        <button
          onClick={onSignIn}
          className={cn(
            "flex flex-1 items-center justify-center gap-200 min-w-0",
            "px-200 py-200 rounded-200 border border-solid overflow-hidden",
            "text-base font-normal leading-none whitespace-nowrap transition-colors",
            "bg-background-neutral-tertiary border-border-neutral-secondary text-text-default-default",
            "hover:bg-background-neutral-secondary"
          )}
        >
          {signInLabel}
        </button>

        {/* Register
            피그마: bg-brand-default(#2c2c2c), border-brand-default, p=8px, text-brand-on-brand(#f5f5f5) */}
        <button
          onClick={onRegister}
          className={cn(
            "flex flex-1 items-center justify-center gap-200 min-w-0",
            "px-200 py-200 rounded-200 border border-solid overflow-hidden",
            "text-base font-normal leading-none whitespace-nowrap transition-colors",
            "bg-background-brand-default border-border-brand-default text-text-brand-on-brand",
            "hover:bg-background-brand-hover"
          )}
        >
          {registerLabel}
        </button>
      </div>
    );

    return (
      <header ref={ref} className={cn("bg-background-default-default w-full", className)}>

        {/* ── Desktop: 피그마 px/py=32px, gap=24px, border-b ── */}
        <div className="hidden md:flex items-center gap-600 px-800 py-800 border-b border-solid border-border-default-default">
          {/* Logo */}
          <div className="shrink-0">
            {logo ?? (
              <div className="h-[35px] w-[40px] bg-text-default-default rounded-sm opacity-80" />
            )}
          </div>

          {/* Nav Pills */}
          <nav className="flex flex-1 flex-wrap gap-200 items-center justify-end min-w-0">
            {navLinks.map((link) => (
              <NavPill key={link.label} link={link} />
            ))}
          </nav>

          {/* Auth */}
          <AuthButtons />
        </div>

        {/* ── Mobile Default: px/py=24px, border-b, 로고 + 햄버거 ── */}
        <div className="flex md:hidden items-center justify-between px-600 py-600 border-b border-solid border-border-default-default">
          <div className="shrink-0">
            {logo ?? (
              <div className="h-[35px] w-[40px] bg-text-default-default rounded-sm opacity-80" />
            )}
          </div>

          {/* 햄버거 아이콘 버튼
              피그마: p=8px, rounded=32px(pill) */}
          <button
            aria-label="메뉴 열기"
            onClick={() => setMobileOpen(true)}
            className="flex items-center justify-center p-200 rounded-[32px] text-text-default-default"
          >
            <Menu className="size-5" />
          </button>
        </div>

        {/* ── Mobile Open: flex-col, gap=64px, px=24px py=32px ── */}
        {mobileOpen && (
          <div className="flex md:hidden flex-col gap-1600 px-600 py-800 bg-background-default-default min-h-screen">
            {/* 상단: 로고 + X 닫기 버튼 */}
            <div className="flex items-center justify-between w-full">
              <div className="shrink-0">
                {logo ?? (
                  <div className="h-[35px] w-[40px] bg-text-default-default rounded-sm opacity-80" />
                )}
              </div>
              <button
                aria-label="메뉴 닫기"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center p-300 rounded-[32px] size-10 text-text-default-default"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* 세로 네비: 각 항목 w-full, active → bg-brand-tertiary */}
            <nav className="flex flex-col gap-200 items-end w-full">
              {navLinks
                .filter((l) => l.label !== "Link")  // 모바일에서는 Link 숨김
                .map((link) => (
                  <a
                    key={link.label}
                    href={link.href ?? "#"}
                    className={cn(
                      "flex items-center justify-center w-full px-200 py-200 rounded-200",
                      "text-base font-normal leading-none whitespace-nowrap transition-colors",
                      link.active
                        ? "bg-background-brand-secondary text-text-default-default"
                        : "text-text-default-default hover:bg-background-default-secondary"
                    )}
                  >
                    {link.label}
                  </a>
                ))}
            </nav>

            {/* Auth 버튼 (w-full) */}
            <AuthButtons fullWidth />
          </div>
        )}
      </header>
    );
  }
);
Header.displayName = "Header";

export { Header };
