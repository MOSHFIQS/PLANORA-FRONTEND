import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border border-transparent px-2.5 py-0.5 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-colors overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-indigo-600 text-white [a&]:hover:bg-indigo-700",
        secondary:
          "bg-slate-100 text-slate-800 [a&]:hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100",
        destructive:
          "bg-rose-100 text-rose-800 border-rose-200 [a&]:hover:bg-rose-200",
        outline:
          "border-slate-200 text-slate-700 bg-white [a&]:hover:bg-slate-50 dark:border-slate-800 dark:text-slate-200",
        ghost: "[a&]:hover:bg-slate-100 [a&]:hover:text-slate-900",
        link: "text-indigo-600 underline-offset-4 [a&]:hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
