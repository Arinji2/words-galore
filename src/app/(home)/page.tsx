import CustomErrorBoundary from "@/components/error-boundary";
import { Suspense } from "react";
import Hero from "./hero";
import {
  RandomWords,
  RandomWordsError,
  RandomWordsSkeleton,
} from "./random-words";

export default function Home() {
  return (
    <div className="w-full h-fit py-10  flex flex-col items-center justify-start gap-20">
      <Hero />

      <Suspense fallback={<RandomWordsSkeleton isReal={true} />}>
        <CustomErrorBoundary fallback={<RandomWordsError isReal={true} />}>
          <RandomWords isReal={true} />
        </CustomErrorBoundary>
      </Suspense>
      <Suspense fallback={<RandomWordsSkeleton isReal={false} />}>
        <CustomErrorBoundary fallback={<RandomWordsError isReal={false} />}>
          <RandomWords isReal={false} />
        </CustomErrorBoundary>
      </Suspense>
    </div>
  );
}
