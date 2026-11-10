import { ComponentPropsWithoutRef, ReactNode } from "react";


type IconButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "children" | "aria-label"
> & {
  label: string;
  children: ReactNode;
};


export function IconButton({
  label,
  children,
  type = "button",
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      type={type}
      aria-label={label}
      className={[
        "inline-flex size-[34px] shrink-0 items-center justify-center",
        "[&_svg]:size-[18px] [&_svg]:shrink-0",
        "m-0 border-0 p-0 rounded-control",
        "bg-transparent text-secondary",
        "transition-colors",
        "enabled:cursor-pointer enabled:hover:bg-hover",
        "enabled:hover:text-foreground",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-focus",
        className
      ].filter(Boolean).join(" ")}
    >
      {children}
    </button>
  )
}
