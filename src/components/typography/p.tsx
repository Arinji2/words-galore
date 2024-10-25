import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

export function P({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassValue;
}) {
  return <p className={cn("leading-7", className)}>{children}</p>;
}
