import React from "react";
import { Users, GitBranch, Heart } from "lucide-react";
import { UserStats } from "@/types";

const Collaboration = ({
  userStats,
  classname,
}: {
  userStats: UserStats;
  classname?: string;
}) => {
  const contributedTo = userStats["Contributed To"] || 0;
  const pullRequests = userStats["Pull Requests"] || 0;
  const followers = userStats.Followers || 0;
  
  // Calculate collaboration score
  const collaborationScore = Math.min(
    Math.round((contributedTo * 10 + pullRequests * 5 + followers * 2) / 10),
    100
  );

  const getCollaborationLevel = (score: number) => {
    if (score >= 80) return { level: "Team Player", color: "text-green-400", icon: "🏆" };
    if (score >= 60) return { level: "Collaborator", color: "text-blue-400", icon: "🤝" };
    if (score >= 40) return { level: "Contributor", color: "text-yellow-400", icon: "⭐" };
    return { level: "Solo Coder", color: "text-gray-400", icon: "💻" };
  };

  const { level, color, icon } = getCollaborationLevel(collaborationScore);

  return (
    <div className={`${classname} flex items-center justify-center flex-col gap-3 relative rounded-3xl overflow-hidden p-3 z-[90] bg-black/90 group cursor-pointer`}>
      <div className="flex items-center gap-2">
        <Users className="size-8 text-green-400" />
        <div className="text-center">
          <p className="font-modernbold text-lg">Collaboration</p>
        </div>
      </div>

      <div className="text-center">
        <div className="text-4xl mb-2">{icon}</div>
        <p className={`font-modernbold text-lg ${color}`}>{level}</p>
        <p className="text-2xl font-modernbold">{collaborationScore}/100</p>
      </div>

      <div className="w-full space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-blue-400" />
            <span className="font-modernreg text-sm">Contributed to</span>
          </div>
          <span className="font-modernbold text-sm">{contributedTo} repos</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-400" />
            <span className="font-modernreg text-sm">Pull Requests</span>
          </div>
          <span className="font-modernbold text-sm">{pullRequests} PRs</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-400" />
            <span className="font-modernreg text-sm">Followers</span>
          </div>
          <span className="font-modernbold text-sm">{followers} people</span>
        </div>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all duration-300 bg-gradient-to-r from-green-500 to-blue-500"
          style={{ width: `${collaborationScore}%` }}
        />
      </div>
    </div>
  );
};

export default Collaboration; 