import { ComponentPropsWithoutRef } from "react";


type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "ghost";
}

const variantClasses = {
  primary: "bg-string text-on-strong enabled:hover:opacity-85",
  ghost: "bg-transparent text-secondary enabled:hover:bg-hover enabled:hover:text-foreground"
}

export function Button({
  variant = "primary",
  type = "button",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={[
        "inline-flex min-h-11 items-center justify-center gap-2",
        "m-0 rounded-control border-0 px-3 py-2 text-sm",
        "transition-colors",
        "enabled:cursor-pointer",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-focus",
        variantClasses[variant],
        className
      ].filter(Boolean).join(" ")}
    >{children}</button>
  )
}
