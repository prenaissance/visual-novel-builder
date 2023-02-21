import { useCallback, useLayoutEffect, useState } from "react";
import Image from "next/image";
import useNovel from "../novel/useNovel";
import Button from "../components/Button";

export default function Web() {
  const { panel, novel } = useNovel();
  const [bgImage, setBgImage] = useState(panel.data?.bgImageUrl);
  useLayoutEffect(() => {
    if (panel.data?.bgImageUrl) {
      setBgImage(panel.data.bgImageUrl);
    }
  }, [panel.data?.bgImageUrl]);

  const handleClick = useCallback(() => {
    if (panel.tag === "immediate") {
      novel.transition(panel.next);
    }
  }, [panel, novel]);

  const handleChoose = useCallback(
    (choice: string) => () => {
      novel.transition(choice);
    },
    [novel]
  );

  return (
    <main className="h-screen flex flex-col bg-slate-400 p-8">
      <h1 className="text-2xl text-center font-sans font-semibold tracking-widest text-white">
        Literally me
      </h1>
      <div
        className="flex-1 relative shadow-2xl rounded-sm overflow-hidden"
        onClick={handleClick}
      >
        <Image
          sizes="100vw"
          fill
          className="absolute inset-0 w-full h-full object-cover "
          alt="novel background"
          src={bgImage ?? ""}
        />
        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-b from-transparent to-black/75 z-10" />
        <div className="absolute flex flex-col items-center p-2 bottom-0 w-full px-16 z-20">
          <div>
            <h2 className="text-4xl text-white">{panel.data?.author}</h2>
            <p className="text-xl text-white">{panel.data?.text}</p>
          </div>
          <div className="flex gap-2 justify-center">
            {panel.tag === "branch" &&
              panel.choices.map(({ text, next }) => (
                <Button key={next} onClick={handleChoose(next)}>
                  {text}
                </Button>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}

