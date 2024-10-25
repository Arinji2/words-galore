"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import revalidateCacheKeyAction from "@/dal/actions/revalidate-cache-key";
import { cn } from "@/lib/utils";
import { RotateCw } from "lucide-react";
import { useTransition } from "react";
import { Button } from "./ui/button";

export function DevRevalidateButton({ cacheKey }: { cacheKey: string }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    if (isPending) return;
    startTransition(async () => {
      await revalidateCacheKeyAction(cacheKey);
    });
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipContent>
          <p className="">{"Revalidate And Refresh"}</p>
        </TooltipContent>
        <TooltipTrigger asChild>
          <Button
            variant={"ghost"}
            className=" p-0 bg-transparent hover:bg-transparent  "
            disabled={isPending}
            onClick={handleToggle}
          >
            <RotateCw
              className={cn(
                "text-xl text-primary hover:rotate-45 transition-all ease-in-out duration-150 ",
                {
                  "animate-spin duration-500": isPending,
                }
              )}
              strokeWidth={3}
            />
          </Button>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  );
}
