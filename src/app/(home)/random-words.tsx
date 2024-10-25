import {
  DevGithubURL,
  DevIndicator,
  DevRevalidateIndicator,
} from "@/components/dev-ui";
import CustomErrorBoundary from "@/components/error-boundary";
import { H2 } from "@/components/typography/h2";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getRandomIDs, getRandomWord } from "@/dal/getWords";
import { upperCaseTransform } from "@/lib/formatting";
import { ChevronRight } from "lucide-react";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import Link from "next/link";
import { Suspense } from "react";

export async function RandomWords({ isReal }: { isReal: boolean }) {
  return (
    <div className="w-full h-[200px] flex flex-col items-start justify-start gap-4">
      <div className="w-fit h-fit flex flex-col items-baseline justify-start gap-4">
        <H2 className="relative">{isReal ? "Real" : "Fake"} Words </H2>
        <div className="w-full h-full flex flex-row justify-start gap-4 items-baseline">
          <DevIndicator
            info={
              <span>
                This component has its{" "}
                <span className="font-bold">{`"Cache Profile"`}</span> set to{" "}
                {`"hours"`}
              </span>
            }
          />
          <DevRevalidateIndicator
            cacheKey={`random-words-${isReal ? "real" : "fake"}`}
          />
          <DevGithubURL url="https://github.com/arinji/words-galore/blob/main/src/pages/random-words.tsx" />
        </div>
      </div>

      <div className="w-full h-fit  flex row items-center justify-start gap-4">
        <Suspense fallback={<RandomWordsSkeleton />}>
          <CustomErrorBoundary fallback={<RandomWordsError isReal={isReal} />}>
            <RandomWordsDynamic isReal={isReal} />
          </CustomErrorBoundary>
        </Suspense>
        <Link href={`/${isReal ? "real" : "fake"}-words`}>
          <Button className="h-fit w-fit rounded-full aspect-square shrink-0 p-2 flex flex-col items-center justify-center">
            <ChevronRight className="w-[30px] h-[30px] ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
async function RandomWordsDynamic({ isReal }: { isReal: boolean }) {
  "use cache";
  const wordIds = await getRandomIDs({ count: 3, isReal: isReal });
  cacheLife("hours");
  cacheTag(`random-words-${isReal ? "real" : "fake"}`);
  return (
    <div className="w-full h-fit flex flex-row items-center justify-start gap-4 overflow-x-auto py-3">
      {wordIds.map((id) => (
        <Suspense key={id} fallback={<WordSkeletonCard />}>
          <WordCard id={id} isReal={isReal} />
        </Suspense>
      ))}
    </div>
  );
}

export function RandomWordsSkeleton() {
  return (
    <div className="w-full h-fit  flex row items-center justify-start gap-4">
      <div className="w-full h-fit flex flex-row items-center justify-start gap-4 overflow-x-auto py-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <WordSkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

export function RandomWordsError({ isReal }: { isReal: boolean }) {
  return (
    <Card className="w-full h-[200px] flex flex-col items-center justify-center gap-6 bg-red-800">
      <H2>Error In Getting {isReal ? "Real" : "Fake"} Words</H2>
    </Card>
  );
}
async function WordCard({ isReal, id }: { isReal: boolean; id: string }) {
  const data = await getRandomWord({ id, isReal });

  return (
    <Card className="w-full h-[100px]  rounded-sm min-w-[300px] gap-2 flex flex-col items-start justify-center">
      <CardHeader className="space-y-0 py-0">
        <CardTitle className="text-2xl font-bold line-clamp-1">
          {upperCaseTransform(data.word)}
        </CardTitle>
      </CardHeader>
      <CardContent className=" py-0">
        <div className="text-sm font-normal line-clamp-2 ">
          {upperCaseTransform(data.definition)}
        </div>
      </CardContent>
    </Card>
  );
}

function WordSkeletonCard() {
  return (
    <Card className="w-full h-[100px]  rounded-sm min-w-[300px] gap-2 flex flex-col items-start justify-center">
      <CardHeader className="space-y-0 py-0 w-full">
        <Skeleton className="w-[60%] h-[24px]" />
      </CardHeader>
      <CardContent className=" py-0 w-full">
        <div className="text-sm font-normal line-clamp-2 ">
          <Skeleton className="w-[80%] h-[24px]" />
        </div>
      </CardContent>
    </Card>
  );
}
