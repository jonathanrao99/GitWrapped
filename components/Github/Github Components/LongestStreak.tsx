import React from "react";
import Image from "next/image";
import { Trophy } from "lucide-react";
import { formatNumber } from "@/utils/calc";

const LongestStreak = ({
  streak,
  start,
  end,
  classname,
}: {
  streak: number;
  start: string | null;
  end: string | null;
  classname?: string;
}) => {
  return (
    <div className={`${classname} flex items-center justify-center flex-col gap-2 md:gap-3 relative rounded-2xl md:rounded-3xl overflow-hidden bg-black/90 z-[90] group cursor-pointer`}>
        <Image
            src={`/assets/frame7.svg`}
            alt=""
            width={500}
            height={500}
            priority
            className="size-full object-cover absolute inset-0 -z-10 rounded-xl md:rounded-2xl group-hover:opacity-100 opacity-[0.88] cursor-pointer"
        />
        <p className="font-modernbold text-sm md:text-lg lg:text-xl">Longest Streak</p>
        <Trophy className="size-6 md:size-8 lg:size-10"/>
        <p className="font-modernbold text-3xl md:text-5xl lg:text-6xl xl:text-7xl">{formatNumber(streak)}</p>
        <p className="text-xs font-modernreg">{start} - {end}</p>
    </div>
  );
};

export default LongestStreak;