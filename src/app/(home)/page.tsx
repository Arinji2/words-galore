import Hero from "./hero";
import { RandomWords } from "./random-words";

export default function Home() {
  return (
    <div className="w-full h-fit py-10  flex flex-col items-center justify-start gap-20">
      <Hero />

      <RandomWords isReal={true} />
      <RandomWords isReal={false} />
    </div>
  );
}
