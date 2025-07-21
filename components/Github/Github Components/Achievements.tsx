import React from "react";
import { Medal } from "lucide-react";
import { calculateAchievements, getAchievementRarityColor, getAchievementRarityBg } from "@/utils/achievements";
import { UserStats } from "@/types";
import Image from "next/image";
import { formatNumber } from "@/utils/calc";

const Achievements = ({
  userStats,
  classname,
}: {
  userStats: UserStats;
  classname?: string;
}) => {
  const achievements = calculateAchievements(userStats);
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  if (achievements.length === 0) return null;

  return (
    <div className={`${classname} flex items-center justify-center flex-col gap-3 relative rounded-3xl overflow-hidden bg-black/90 z-[90] group cursor-pointer`}>
      <Image
        src={`/assets/1.webp`}
        alt=""
        width={500}
        height={500}
        priority
        className="size-full object-cover absolute inset-0 -z-10 rounded-2xl opacity-80 group-hover:opacity-100"
      />
      <div className="absolute top-5 left-5">
        <Medal className="size-10" />
        <p className="font-modernbold text-xl pt-1">Achievements</p>
      </div>
      
      <p className={`font-modernbold absolute bottom-5 right-5 max-lg:right-3 ${formatNumber(unlockedCount).toString().length >= 4 ? "max-lg:text-5xl" : "max-lg:text-6xl"} text-7xl`}>
        {formatNumber(unlockedCount)}
      </p>
    </div>
  );
};

export default Achievements; 