import React from "react";
import { Clock, Sun, Moon, Coffee } from "lucide-react";
import { UserStats } from "@/types";
import Image from "next/image";

interface TimeData {
  period: string;
  percentage: number;
  icon: React.ReactNode;
  description: string;
}

const TimeAnalysis = ({
  userStats,
  classname,
}: {
  userStats: UserStats;
  classname?: string;
}) => {
  // Mock time analysis data - in real implementation, this would come from contribution analysis
  const timeData: TimeData[] = [
    { 
      period: "Morning", 
      percentage: 35, 
      icon: <Sun className="w-3 h-3 md:w-4 md:h-4 text-white" />,
      description: "6 AM - 12 PM"
    },
    { 
      period: "Afternoon", 
      percentage: 45, 
      icon: <Coffee className="w-3 h-3 md:w-4 md:h-4 text-white" />,
      description: "12 PM - 6 PM"
    },
    { 
      period: "Evening", 
      percentage: 20, 
      icon: <Moon className="w-3 h-3 md:w-4 md:h-4 text-white" />,
      description: "6 PM - 12 AM"
    },
  ];

  const totalContributions = userStats["Total Contibutions"] || 0;

  if (totalContributions === 0) return null;

  return (
    <div className={`${classname} flex items-center justify-center flex-col gap-2 md:gap-3 relative rounded-2xl md:rounded-3xl overflow-hidden bg-black/90 z-[90] group cursor-pointer`}>
      <Image
        src={`/assets/grad5.svg`}
        alt=""
        width={500}
        height={500}
        priority
        className="size-full object-cover absolute inset-0 -z-10 rounded-xl md:rounded-2xl opacity-80 group-hover:opacity-100"
      />
      <div className="absolute top-2 md:top-5 left-2 md:left-5">
        <Clock className="size-6 md:size-8 lg:size-10 text-white" />
        <p className="font-modernbold text-sm md:text-lg lg:text-xl pt-1 text-white">Peak Hours</p>
      </div>

      <div className="absolute top-1/2 left-2 md:left-5 right-2 md:right-5 transform -translate-y-1/2 space-y-2 md:space-y-3 mt-11">
        {timeData.map((time, index) => (
          <div key={time.period} className="space-y-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1 md:gap-2">
                {time.icon}
                <span className="font-modernreg text-xs md:text-sm text-white">{time.period}</span>
              </div>
              <span className="font-modernbold text-xs md:text-sm text-white">{time.percentage}%</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-1 md:h-2">
              <div
                className="h-1 md:h-2 rounded-full transition-all duration-300 bg-white"
                style={{ width: `${time.percentage}%` }}
              />
            </div>
            <p className="text-xs text-white">{time.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeAnalysis; 