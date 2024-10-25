import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

export function H4({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassValue;
}) {
  return (
    <h4 className={cn(" text-xl font-semibold tracking-tight", className)}>
      {children}
    </h4>
  );
}
