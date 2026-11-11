import { ComponentPropsWithoutRef, ReactNode } from "react";

type IconButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "children" | "aria-label"
> & {
  label: string;
  size?: "sm" | "md";
  children: ReactNode;
};

const sizeClasses = {
  sm: "size-[34px] [&_svg]:size-[18px]",
  md: "size-11 [&_svg]:size-5",
};

export function IconButton({
  label,
  children,
  type = "button",
  size = "md",
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      type={type}
      aria-label={label}
      className={[
        "inline-flex shrink-0 items-center justify-center",
        "[&_svg]:shrink-0",
        "m-0 border-0 p-0 rounded-control",
        "bg-transparent text-secondary",
        "transition-colors",
        "enabled:cursor-pointer enabled:hover:bg-hover",
        "enabled:hover:text-foreground",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-focus",
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
