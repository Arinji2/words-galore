import { H1 } from "@/components/typography/h1";
import { P } from "@/components/typography/p";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
const VERSION = "15.0.2-canary.6";

export default function Home() {
  return (
    <div className="w-full h-fit py-10  min-h-[100svh]  flex flex-col items-center justify-center gap-6">
      <H1>WORDS GALORE</H1>
      <P className="text-foreground/70 text-center">
        A website testing <span className="text-primary">NextJS 15 Canary</span>
        , consisting of a lot of word utilites :D
      </P>
      <Link href={`https://github.com/vercel/next.js/releases/tag/v${VERSION}`}>
        <Card className="w-fit bg-primary/20 ">
          <CardHeader className="p-2">
            <CardTitle className="text-sm font-semibold">
              Site Version: {VERSION}
            </CardTitle>
          </CardHeader>
        </Card>
      </Link>

      <div className="w-[80%] h-fit grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-10">
        <Card className="flex flex-col gap-2 shrink-0">
          <CardHeader className="space-y-0 pb-0">
            <CardTitle className="text-sm font-normal">Fake Words</CardTitle>
          </CardHeader>
          <CardContent className=" py-0">
            <div className="text-2xl font-bold ">
              Browse through 1000s of fake words.
            </div>
          </CardContent>
          <CardFooter className="mt-4">
            <Button size="sm">Check out Fake Words!</Button>
          </CardFooter>
        </Card>
        <Card className="flex flex-col gap-2">
          <CardHeader className="space-y-0 pb-0">
            <CardTitle className="text-sm font-normal">Real Words</CardTitle>
          </CardHeader>
          <CardContent className=" py-0">
            <div className="text-2xl font-bold ">
              Browse through 1000s of real words.
            </div>
          </CardContent>
          <CardFooter className="mt-4">
            <Button size="sm">Check out Real Words!</Button>
          </CardFooter>
        </Card>
        <Card className="flex flex-col gap-2">
          <CardHeader className="space-y-0 pb-0">
            <CardTitle className="text-sm font-normal">Filter Words</CardTitle>
          </CardHeader>
          <CardContent className=" py-0">
            <div className="text-2xl font-bold ">
              Filter words based on multiple filters.
            </div>
          </CardContent>
          <CardFooter className="mt-4">
            <Button size="sm">Check out Words!</Button>
          </CardFooter>
        </Card>
        <Card className="flex flex-col gap-2">
          <CardHeader className="space-y-0 pb-0">
            <CardTitle className="text-sm font-normal">Analyze Words</CardTitle>
          </CardHeader>
          <CardContent className=" py-0">
            <div className="text-2xl font-bold ">
              Research and educate yourself on word usage.
            </div>
          </CardContent>
          <CardFooter className="mt-4">
            <Button size="sm">Analyze Words!</Button>
          </CardFooter>
        </Card>
        <Card className="flex flex-col  md:col-span-2 gap-2 relative overflow-hidden">
          <Image
            src={"/sense.png"}
            fill
            alt="sense"
            className="w-full h-full object-cover md:object-[50%_90%] object-bottom absolute top-0 left-0"
          />
          <div className="opacity-0 bg-card w-full h-full hover:opacity-100 flex flex-col items-start justify-end transition-all ease-in-out duration-500 z-10">
            <CardHeader className="space-y-0 pb-0">
              <CardTitle className="text-sm font-normal">Powered By</CardTitle>
            </CardHeader>
            <CardContent className=" py-0">
              <div className="text-2xl font-bold ">Sense Or Nonsense</div>
            </CardContent>
            <Link href="https://sense.arinji.com">
              <CardFooter className="mt-4">
                <Button size="sm">Expore More!</Button>
              </CardFooter>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
