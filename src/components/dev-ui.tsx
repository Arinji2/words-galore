import { Sparkles } from "lucide-react";
import React, { Suspense } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { isDevMode } from "@/dal/dev-mode-utils";
import { SiGithub } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import { DevRevalidateButton } from "./dev-ui.client";

export function DevIndicator({
  children,
  info,
}: {
  children?: React.ReactNode;
  info: React.ReactElement;
}) {
  return (
    <Suspense fallback={null}>
      <DevInfo info={info}>
        <Sparkles
          className="text-xl text-primary  animate-pulse"
          strokeWidth={3}
        />
        {children}
      </DevInfo>
    </Suspense>
  );
}
export function DevGithubURL({ url }: { url: string }) {
  return (
    <Suspense fallback={null}>
      <Link href={url} target="_blank" rel="noreferrer">
        <DevInfo info={<span>Link To Github URL </span>}>
          <SiGithub className="text-xl text-primary" strokeWidth={3} />
        </DevInfo>
      </Link>
    </Suspense>
  );
}
export function DevRevalidateIndicator({ cacheKey }: { cacheKey: string }) {
  return (
    <Suspense fallback={null}>
      <DevRevalidate cacheKey={cacheKey}></DevRevalidate>
    </Suspense>
  );
}

async function DevInfo({
  children,
  info,
}: {
  children: React.ReactNode;
  info: React.ReactElement;
}) {
  const isEnabled = await isDevMode();

  return (
    <>
      {isEnabled && (
        <TooltipProvider>
          <Tooltip>
            <TooltipContent>
              <p className="">{info}</p>
            </TooltipContent>
            <TooltipTrigger>{children}</TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
}

async function DevRevalidate({ cacheKey }: { cacheKey: string }) {
  const isEnabled = await isDevMode();

  return <>{isEnabled && <DevRevalidateButton cacheKey={cacheKey} />}</>;
}
