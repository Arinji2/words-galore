import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

export function H3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassValue;
}) {
  return (
    <h3 className={cn(" text-2xl font-semibold tracking-tight", className)}>
      {children}
    </h3>
  );
}
