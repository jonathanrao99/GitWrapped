import React from "react";
import { Code2 } from "lucide-react";
import { UserStats } from "@/types";
import Image from "next/image";

interface LanguageData {
  language: string;
  percentage: number;
  color: string;
}

// Mock language data - in a real implementation, this would come from GitHub API
const getMockLanguages = (): LanguageData[] => {
  return [
    { language: "JavaScript", percentage: 45, color: "#f1e05a" },
    { language: "TypeScript", percentage: 30, color: "#2b7489" },
    { language: "Python", percentage: 15, color: "#3572A5" },
    { language: "CSS", percentage: 10, color: "#563d7c" },
  ];
};

const Languages = ({
  userStats,
  classname,
}: {
  userStats: UserStats;
  classname?: string;
}) => {
  const languages = getMockLanguages();
  const totalRepos = userStats.Repositories || 0;

  if (totalRepos === 0) return null;

  return (
    <div className={`${classname} flex items-center justify-center flex-col gap-3 relative rounded-3xl overflow-hidden bg-black/90 z-[90] group cursor-pointer`}>
      <Image
        src={`/assets/grad4.svg`}
        alt=""
        width={500}
        height={500}
        priority
        className="size-full object-cover absolute inset-0 -z-10 rounded-2xl opacity-80 group-hover:opacity-100"
      />
      <div className="absolute top-5 left-5">
        <Code2 className="size-10" />
        <p className="font-modernbold text-xl pt-1">Top Languages</p>
      </div>

      <div className="absolute top-1/2 left-5 right-5 transform -translate-y-1/2 space-y-3 mt-10">
        {languages.map((lang, index) => (
          <div key={lang.language} className="space-y-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: lang.color }}
                />
                <span className="font-modernreg text-sm">{lang.language}</span>
              </div>
              <span className="font-modernbold text-sm">{lang.percentage}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${lang.percentage}%`,
                  backgroundColor: lang.color
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Languages; 