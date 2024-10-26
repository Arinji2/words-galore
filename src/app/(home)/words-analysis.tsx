import { DevGithubURL, DevIndicator } from "@/components/dev-ui";
import CustomErrorBoundary from "@/components/error-boundary";
import { H2 } from "@/components/typography/h2";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GITHUB_URLS } from "@/CONSTANTS/github-urls";
import { getRandomIDs, getRandomWord } from "@/dal/getWords";
import { getWordAnalysis } from "@/dal/wordsAnalysis";
import { upperCaseTransform } from "@/lib/formatting";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export async function WordsAnalysis() {
  return (
    <div className="w-full h-[200px] flex flex-col items-start justify-start gap-4">
      <div className="w-fit h-fit flex flex-col items-baseline justify-start gap-4">
        <H2 className="relative">Words Analysis </H2>
        <div className="w-full h-full flex flex-row justify-start gap-4 items-baseline">
          <DevIndicator info={<span>This component is purely dynamic</span>} />

          <DevGithubURL url={GITHUB_URLS.homepage.words_analysis} />
        </div>
      </div>

      <div className="w-full min-h-[250px]  flex row items-center justify-start gap-4">
        <Suspense fallback={<RandomWordsSkeleton />}>
          <CustomErrorBoundary fallback={<WordAnalysisError />}>
            <WordsAnalysisDynamic />
          </CustomErrorBoundary>
        </Suspense>
        <Link href={`/analysis-words`}>
          <Button className="h-fit w-fit rounded-full aspect-square shrink-0 p-2 flex flex-col items-center justify-center">
            <ChevronRight className="w-[30px] h-[30px] ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
async function WordsAnalysisDynamic() {
  const wordIds = await getRandomIDs({ count: 3, isReal: true, level: 1 });

  return (
    <div className="w-full h-full flex flex-row items-start justify-start gap-4 overflow-x-auto py-3">
      {wordIds.map((id) => (
        <Suspense key={id} fallback={<WordSkeletonCard />}>
          <WordCard id={id} />
        </Suspense>
      ))}
    </div>
  );
}

export function RandomWordsSkeleton() {
  return (
    <div className="w-full h-full flex flex-row items-start justify-start gap-4 overflow-x-auto py-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <WordSkeletonCard key={i} />
      ))}
    </div>
  );
}

export function WordAnalysisError() {
  return (
    <Card className="w-full h-[200px] flex flex-col items-center justify-center gap-6 bg-red-800">
      <H2>Error In Getting Words Analysis</H2>
    </Card>
  );
}
async function WordCard({ id }: { id: string }) {
  "use cache";

  const data = await getRandomWord({ id, isReal: true });
  const analysis = await getWordAnalysis({ word: data.word });
  const hasAnalyzed = !("success" in analysis);
  console.log(hasAnalyzed);

  return (
    <Card className="w-full h-fit rounded-sm min-w-[300px] gap-4 flex flex-col items-start justify-start py-4">
      <CardHeader className="space-y-0 py-0">
        <CardTitle className="text-2xl font-bold line-clamp-1">
          {upperCaseTransform(data.word)}
        </CardTitle>
      </CardHeader>
      <CardContent className=" py-0 flex flex-col items-start justify-start gap-2">
        <div className="w-fit h-fit flex flex-col items-start justify-start text-xs text-white/60 ">
          Definition:{" "}
          <p className="text-sm text-white w-full text-left line-clamp-2">
            {upperCaseTransform(
              hasAnalyzed
                ? analysis.meanings[0].definitions[0]?.definition ??
                    data.definition
                : data.definition
            )}
          </p>
        </div>

        {hasAnalyzed && (
          <div className="w-fit h-fit flex flex-col items-start justify-start text-xs text-white/60 ">
            Part of Speech:{" "}
            <p className="text-sm text-white w-full text-left line-clamp-2">
              {upperCaseTransform(analysis.meanings[0].partOfSpeech)}
            </p>
          </div>
        )}

        {hasAnalyzed && analysis.phonetic && (
          <div className="w-fit h-fit flex flex-col items-start justify-start text-xs text-white/60 ">
            Phonetics:{" "}
            <p className="text-sm text-white w-full text-left line-clamp-1">
              {upperCaseTransform(analysis.phonetic)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function WordSkeletonCard() {
  return (
    <Card className="w-full h-full  rounded-sm min-w-[300px] gap-4 flex flex-col items-start justify-center">
      <CardHeader className="space-y-0 py-0 w-full">
        <Skeleton className="w-[60%] h-[24px]" />
      </CardHeader>
      <CardContent className=" py-0 flex flex-col items-start justify-start gap-2 w-full">
        <div className="gap-2 flex flex-col items-start justify-start w-full">
          <Skeleton className="w-[20%] h-[12px]" />
          <Skeleton className="w-[80%] h-[24px]" />
        </div>
        <div className="gap-2 flex flex-col items-start justify-start w-full">
          <Skeleton className="w-[20%] h-[12px]" />
          <Skeleton className="w-[80%] h-[24px]" />
        </div>
        <div className="gap-2 flex flex-col items-start justify-start w-full">
          <Skeleton className="w-[20%] h-[12px]" />
          <Skeleton className="w-[80%] h-[24px]" />
        </div>
      </CardContent>
    </Card>
  );
}
