"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChatCircleIcon,
  CirclesFourIcon,
  CompassIcon,
  CheckCircleIcon,
  BrainIcon,
  LinkIcon,
  MoonIcon,
  SunIcon
} from "@/components/ui/Icon";
import { IconButton } from "../ui/IconButton";
import { useState } from "react";

const navigation = [
  { href: "/", label: "对话", icon: ChatCircleIcon },
  { href: "/projects", label: "项目", icon: CirclesFourIcon },
  { href: "/directions", label: "发展方向", icon: CompassIcon },
  { href: "/review", label: "每周回看", icon: CheckCircleIcon },
  { href: "/memory", label: "记忆", icon: BrainIcon },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false)

  return (
    <div className="flex min-h-full flex-col">
      <nav className="flex shrink-0 flex-col" aria-label="主导航">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="
            group flex size-11 shrink-0 items-center justify-center
            rounded-nav text-secondary
            focus-visible:outline-2 focus-visible:outline-offset-[-2px]
            focus-visible:outline-focus
            "
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              title={item.label}
            >
              <span
                className={[
                  "flex size-9 items-center justify-center",
                  "rounded-nav transition-colors",
                  active
                    ? "bg-selected text-foreground"
                    : "group-hover:bg-hover group-hover:text-foreground",
                ].join(" ")}
              >
                <Icon
                  size={20}
                  weight={active ? "fill" : "regular"}
                  aria-hidden="true"
                ></Icon>
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto flex shrink-0 flex-col items-center gap-1 pt-3">
        <IconButton
          size="md"
          label="切换亮暗模式"
          title="切换亮暗模式"
          onClick={(event) => {
            const nextIsDark = !isDark

            const rect = event.currentTarget.getBoundingClientRect()
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            const radius = Math.hypot(
              Math.max(x, window.innerWidth - x),
              Math.max(y, window.innerHeight - y)
            )

            const changeTheme = () => {
              document.documentElement.classList.toggle("theme-dark", nextIsDark)
              setIsDark(nextIsDark)
            }

            if (document.startViewTransition) {
              const transition = document.startViewTransition(changeTheme)

              transition.ready.then(() => {
                document.documentElement.animate({
                  clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${radius}px at ${x}px ${y}px)`
                  ],
                },
                  {
                    duration: 400,
                    easing: "ease-in-out",
                    pseudoElement: "::view-transition-new(root)"
                  })
              })
            } else {
              changeTheme()
            }

          }}
        >
          {
            isDark ? <SunIcon aria-hidden="true" /> : <MoonIcon aria-hidden="true" />
          }
        </IconButton>

        <IconButton size="md" label="已连接的生活" title="已连接的生活">
          <LinkIcon aria-hidden="true" />
        </IconButton>

        <IconButton size="md" label="账户" title="账户">
          <span
            aria-hidden="true"
            data-corner="round"
            className="
          flex size-7 items-center justify-center
          rounded-full bg-selected text-[11px]
          "
          >
            我
          </span>
        </IconButton>
      </div>
    </div>
  );
}
