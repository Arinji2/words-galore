"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { setDevMode } from "@/dal/dev-mode-utils";

import { TooltipContent } from "@radix-ui/react-tooltip";
import { Loader2 } from "lucide-react";

import { useState, useTransition } from "react";

export default function DevMode({
  initialIsEnabled = false,
}: {
  initialIsEnabled?: boolean;
}) {
  const [isEnabled, setIsEnabled] = useState(initialIsEnabled);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      const newState = !isEnabled;
      setIsEnabled(newState);
      await setDevMode(newState);
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="w-fit bg-primary/20 mt-1">
            <CardHeader className="p-2">
              <CardTitle className="text-sm font-semibold">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={isEnabled}
                    id="dev-mode"
                    onCheckedChange={handleToggle}
                    disabled={isPending}
                  />

                  <TooltipContent>
                    <p className="pb-1">
                      Enables dev utilites to understand NextJS 15 caching{" "}
                    </p>
                  </TooltipContent>
                  <Label
                    className="w-[71px] h-[20px]  flex flex-col items-center justify-center"
                    htmlFor="dev-mode"
                  >
                    {isPending ? (
                      <Loader2 className="animate-spin text-lg" />
                    ) : (
                      "Dev Mode"
                    )}
                  </Label>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  );
}
