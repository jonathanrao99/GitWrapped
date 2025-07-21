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
      icon: <Sun className="w-4 h-4 text-yellow-400" />,
      description: "6 AM - 12 PM"
    },
    { 
      period: "Afternoon", 
      percentage: 45, 
      icon: <Coffee className="w-4 h-4 text-orange-400" />,
      description: "12 PM - 6 PM"
    },
    { 
      period: "Evening", 
      percentage: 20, 
      icon: <Moon className="w-4 h-4 text-blue-400" />,
      description: "6 PM - 12 AM"
    },
  ];

  const totalContributions = userStats["Total Contibutions"] || 0;

  if (totalContributions === 0) return null;

  return (
    <div className={`${classname} flex items-center justify-center flex-col gap-3 relative rounded-3xl overflow-hidden bg-black/90 z-[90] group cursor-pointer`}>
      <Image
        src={`/assets/grad5.svg`}
        alt=""
        width={500}
        height={500}
        priority
        className="size-full object-cover absolute inset-0 -z-10 rounded-2xl opacity-80 group-hover:opacity-100"
      />
      <div className="absolute top-5 left-5">
        <Clock className="size-10" />
        <p className="font-modernbold text-xl pt-1">Peak Hours</p>
      </div>

      <div className="absolute top-1/2 left-5 right-5 transform -translate-y-1/2 space-y-3 mt-12">
        {timeData.map((time, index) => (
          <div key={time.period} className="space-y-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {time.icon}
                <span className="font-modernreg text-sm">{time.period}</span>
              </div>
              <span className="font-modernbold text-sm">{time.percentage}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-500"
                style={{ width: `${time.percentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-400">{time.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeAnalysis; 