import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "组件库 · 广莫",
};

const buttonExamples = [
  {
    variant: "primary",
    label: "主要",
    action: "保存",
  },

  {
    variant: "soft",
    label: "次级",
    action: "预览",
  },
  { variant: "ghost", label: "文本", action: "取消" },
] as const;
export default function ComponentsPage() {
  return (
    <div lang="zh-CN" className="mx-auto max-w-content">
      <h1 className="m-0 text-page-heading max-sm:text-page-heading-mobile">
        组件库
      </h1>

      <section
        aria-labelledby="buttons-heading"
        className="grid gap-example-gap border-t border-line py-group-inset md:grid-cols-4"
      >
        <h2 id="buttons-heading" className="text-gallery-category">
          按钮
        </h2>

        <div className="grid min-w-0 gap-example-gap md:col-span-3">
          {buttonExamples.map(({ variant, label, action }) => (
            <div
              key={variant}
              className="flex flex-wrap items-center gap-example-gap"
            >
              <span className="text-secondary">{label}</span>
              <Button variant={variant}>{action}</Button>
              <Button variant={variant} disabled>
                {action}
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
