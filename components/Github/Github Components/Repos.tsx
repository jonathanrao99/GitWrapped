import { formatNumber } from "@/utils/calc";
import { BookMarked } from "lucide-react";
import Image from "next/image";
import React from "react";

const Repos = ({ repos, classname }: { repos: number; classname: string }) => {
  return (
    <div
      className={`${classname} flex items-center justify-center flex-col gap-2 sm:gap-3 relative rounded-2xl sm:rounded-3xl overflow-hidden bg-black/90 z-[90] group cursor-pointer`}
    >
      <Image
        src={`/assets/grad1.jpg`}
        alt=""
        width={500}
        height={500}
        priority
        className="size-full object-cover absolute inset-0 -z-10 rounded-xl sm:rounded-2xl opacity-70 group-hover:opacity-100"
      />
      <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
        <BookMarked className="size-6 sm:size-8 md:size-10" />
        <p className="font-modernbold text-sm sm:text-lg lg:text-xl pt-1">Repos<span className="max-sm:hidden">itories</span></p>
      </div>
      <p className={`font-modernbold absolute bottom-2 sm:bottom-5 right-2 sm:right-3 text-2xl sm:text-4xl md:text-6xl lg:text-7xl ${formatNumber(repos).toString().length >= 4 ? "max-sm:right-1": ""} `}>
        {formatNumber(repos)}
      </p>
    </div>
  );
};

export default Repos;