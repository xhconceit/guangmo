import { useLayoutEffect, useRef, type ComponentPropsWithoutRef } from "react";


type TextareaProps = ComponentPropsWithoutRef<"textarea"> & {
  autoResize?: boolean
}

export function Textarea({
  className,
  rows = 1,
  value,
  autoResize = false,
  ...props
}: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useLayoutEffect(() => {
    const element = textareaRef.current
    if (!element || !autoResize) return

    function resize() {
      if (!element) return


      // 先重置，删除内容时才能缩回去。
      element.style.height = "auto";

      const height = Math.min(
        160,
        Math.max(52, element.scrollHeight),
      );

      element.style.height = `${height}px`;
    }


    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      element.style.height = "";
    };
  }, [value, autoResize])

  return (
    <textarea
      {...props}
      ref={textareaRef}
      value={value}
      rows={rows}
      className={[
        "m-0 block w-full min-w-0 min-h-[52px]",
        "rounded-[20px] border-0 px-3 py-2",
        "bg-[var(--panel)] text-foreground",
        "text-sm leading-5 placeholder:text-muted",
        autoResize
          ? "max-h-[160px] resize-none overflow-y-auto"
          : "resize-y",
        "focus:outline-none focus:shadow-none",
        "disabled:cursor-not-allowed disabled:opacity-50", className
      ].filter(Boolean).join(" ")}
    >
    </textarea>
  )
}
