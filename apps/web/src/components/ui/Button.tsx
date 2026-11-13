import { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "ghost" | "soft";
  size?: "sm" | "md";
  shape?: "rounded" | "pill";
};

const variantClasses = {
  primary: "bg-strong text-on-strong enabled:hover:opacity-85",
  ghost:
    "bg-transparent text-secondary enabled:hover:bg-hover enabled:hover:text-foreground",
  soft: "bg-selected text-secondary enabled:hover:bg-hover enabled:hover:text-foreground",
};

const sizeClasses = {
  sm: "min-h-[34px] px-3 py-1.5 text-xs leading-5",
  md: "min-h-11 px-3 py-2 text-sm leading-5",
};

export function Button({
  variant = "primary",
  size = "md",
  shape = "rounded",
  type = "button",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      data-corner={shape === "pill" ? "round" : undefined}
      className={[
        "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap",
        "m-0 border-0",
        shape === "pill" ? "rounded-full" : "rounded-control",
        "transition-colors",
        "enabled:cursor-pointer",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-focus",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
}
