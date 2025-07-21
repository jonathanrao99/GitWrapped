import { formatNumber } from "@/utils/calc";
import { Command } from "lucide-react";
import Image from "next/image";
import React from "react";

const Commit = ({
  commits,
  classname,
}: {
  commits: number;
  classname: string;
}) => {
  return (
    <div
      className={`${classname} flex items-center justify-center flex-col gap-2 sm:gap-3 relative rounded-2xl sm:rounded-3xl overflow-hidden bg-black/90 z-[90] group cursor-pointer`}
    >
      <Image
        src={`/assets/grad2.svg`}
        alt=""
        width={500}
        height={500}
        priority
        className="size-full object-cover absolute inset-0 -z-10 rounded-xl sm:rounded-2xl opacity-80 group-hover:opacity-100"
      />
      <div className="absolute top-2 sm:top-5 left-2 sm:left-5">
        <Command className="size-6 sm:size-8 md:size-10" />
        <p className="font-modernbold text-sm sm:text-lg md:text-xl pt-1">
          Total <br /> Commits
        </p>
      </div>
      <p
        className={`font-modernbold absolute bottom-2 sm:bottom-5 right-2 sm:right-5 max-lg:right-3 text-2xl sm:text-4xl md:text-5xl lg:text-7xl ${formatNumber(commits).toString().length >= 4 ? "max-lg:text-5xl" : "max-lg:text-6xl"}` }
      >
        {formatNumber(commits)}
      </p>
    </div>
  );
};

export default Commit;
