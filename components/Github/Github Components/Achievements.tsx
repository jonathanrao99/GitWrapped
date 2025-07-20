import React from "react";
import { Trophy } from "lucide-react";
import { calculateAchievements, getAchievementRarityColor, getAchievementRarityBg } from "@/utils/achievements";
import { UserStats } from "@/types";

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

  const displayedAchievements = achievements.slice(0, 3);

  return (
    <div className={`${classname} flex items-center justify-center flex-col gap-3 relative rounded-3xl overflow-hidden p-3 z-[90] bg-black/90 group cursor-pointer`}>
      <div className="flex items-center gap-2">
        <Trophy className="size-8 text-yellow-400" />
        <div className="text-center">
          <p className="font-modernbold text-lg">Achievements</p>
          <p className="text-sm text-gray-400">{unlockedCount}/{achievements.length} Unlocked</p>
        </div>
      </div>

      <div className="w-full space-y-2">
        {displayedAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`flex items-center gap-3 p-2 rounded-lg border ${getAchievementRarityBg(achievement.rarity)} ${getAchievementRarityColor(achievement.rarity)}`}
          >
            <span className="text-2xl">{achievement.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="font-modernbold text-sm truncate">{achievement.title}</p>
              <p className="text-xs text-gray-400 truncate">{achievement.description}</p>
              {achievement.progress && achievement.maxProgress && (
                <div className="mt-1">
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <div
                      className="bg-current h-1 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min((achievement.progress / achievement.maxProgress) * 100, 100)}%`
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {achievement.progress}/{achievement.maxProgress}
                  </p>
                </div>
              )}
            </div>
            <div className="text-xs font-modernbold capitalize">
              {achievement.rarity}
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default Achievements; 