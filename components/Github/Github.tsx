"use client";

import React, { useEffect, useRef, useState } from "react";
import Followers from "./Github Components/Followers";
import LongestStreak from "./Github Components/LongestStreak";
import Stars from "./Github Components/Stars";
import CurrentStreak from "./Github Components/CurrentStreak";
import Repos from "./Github Components/Repos";
import Commit from "./Github Components/Commits";
import PRs from "./Github Components/PRs";
import Issues from "./Github Components/Issues";
import ContributedTo from "./Github Components/ContributedTo";
import Achievements from "./Github Components/Achievements";
import Languages from "./Github Components/Languages";
import TimeAnalysis from "./Github Components/TimeAnalysis";
import ShareButtons from "../ui/share-buttons";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  backgroundState,
  graphState,
  loadingState,
  usernameState,
  userStatsState,
} from "@/Recoil/State/atom";
import { UserStats } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { toPng } from "html-to-image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

const Github = () => {
  const userStats = useRecoilValue(userStatsState) as UserStats;
  const graph = useRecoilValue(graphState);
  const loading = useRecoilValue(loadingState);
  const username = useRecoilValue(usernameState);
  const [background, setBackground] = useRecoilState(backgroundState);
  const [selectedImage, setSelectedImage] = useState<string>("/assets/grad1.jpg");


  const githubRef = useRef<HTMLDivElement | null>(null);

  const handleDownloadImage = async () => {
    toast({ title: "Starting Download...", generating: true });

    const node = document.getElementById("github-ss") as HTMLElement;
    if (!node) return toast({ title: "Failed to find element." });

    toPng(node, { quality: 0.89 })
      .then(async (dataUrl) => {
        const base64Data = dataUrl.split(",")[1];
        toast({ title: "Downloading...", generating: true });
        const response = await fetch("/api/change-background", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            foregroundPath: base64Data,
            backgroundPath: background,
          }),
        });
        toast({ title: "Downloading...", generating: true });
        if (response.ok) {
          const data = await response.blob();
          const link = document.createElement("a");
          const url = URL.createObjectURL(data);
          toast({ title: "Downloading...", generating: true });
          link.href = url;
          link.download = `${username || "user"}.png`;
          link.click();
          URL.revokeObjectURL(url);
          toast({ title: "Bento Downloaded Successfully" });
        } else {
          toast({ title: "Error: Slow Internet" });
        }
      })
      .catch((error) => {
        console.error(error);
        toast({ title: "Error occurred while downloading." });
      });
  };

  useEffect(() => {
    if (!loading && githubRef.current) {
      githubRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);

  // Get background image URL for live UI
  const getBackgroundImageUrl = () => {
    // Map background state to actual image URLs
    const backgroundMap: Record<string, string> = {
      "assets/frame2.png": "/assets/frame2.png",
      "assets/bg3.png": "/assets/bg3.png", 
      "assets/bg4.png": "/assets/bg4.png",
      "assets/grad1.jpg": "/assets/grad1.jpg",
    };
    
    return backgroundMap[background] || "/assets/grad1.jpg";
  };

  return (
    <div className="fixed inset-0 z-20">
      {/* Background Image for Live UI */}
      <div className="fixed inset-0 z-0">
        <Image
          src={getBackgroundImageUrl()}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {!loading && (
        <div className="absolute top-8 px-10 z-30 right-0 max-sm:right-[4.2rem] max-sm:top-2 flex gap-4">
          <ShareButtons 
            username={username} 
            userStats={userStats} 
            className="max-sm:hidden"
          />
          <Select
            onValueChange={(value) => {
              const imageMap: Record<string, string> = {
                apple: "assets/frame2.png",
                banana: "assets/bg3.png",
                blueberry: "assets/bg4.png",
                grapes: "assets/grad1.jpg",
              };
              const selectedBackground = imageMap[value];
              setSelectedImage(`/${selectedBackground}`);
              setBackground(selectedBackground);
            }}
          >
            <SelectTrigger className="p-2 relative rounded-full overflow-hidden">
              <Image
                src={selectedImage} // Dynamically show the selected image
                alt="Selected"
                width={100}
                height={100}
                className="size-7 rounded-full object-cover"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">
                  <Image
                    src={`/assets/frame2.svg`}
                    alt=""
                    width={100}
                    height={100}
                    className="size-7 rounded-full object-cover"
                  />
                </SelectItem>
                <SelectItem value="banana">
                  {" "}
                  <Image
                    src={`/assets/frame7.svg`}
                    alt=""
                    width={100}
                    height={100}
                    className="size-7 rounded-full object-cover"
                  />
                </SelectItem>
                <SelectItem value="blueberry">
                  {" "}
                  <Image
                    src={`/assets/frame9.svg`}
                    alt=""
                    width={100}
                    height={100}
                    className="size-7 rounded-full object-cover"
                  />
                </SelectItem>
                <SelectItem value="grapes">
                  {" "}
                  <Image
                    src={`/assets/grad1.jpg`}
                    alt=""
                    width={100}
                    height={100}
                    className="size-7 rounded-full object-cover"
                  />
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
      
      <div id="github-ss" ref={githubRef} className="relative top-[-10px] w-full h-full flex items-start justify-start flex-col bg-transparent overflow-y-auto">
        {!loading && (
          <div className="text-white z-10 w-full lg:w-[100%] max-w-[1500px] mx-auto flex items-start justify-start flex-col p-3 relative pt-[3.5rem]">
            <div className="flex items-center justify-center gap-4 sm:px-10 px-3 mb-2">
              <div className="">
                <Image
                  src={userStats.AvatarUrl || "/assets/user.svg"}
                  alt="User Avatar"
                  width={100}
                  height={100}
                  className="rounded-full size-12 md:size-12 -translate-y-1 object-cover"
                />
              </div>
              <h1 className="font-modernbold leading-tight text-2xl md:text-3xl max-w-2xl py-1">
                {userStats.Repositories ? username : "User not found"}{" "}
                {userStats.Repositories && "'s Github."}
              </h1>
            </div>
            
            {/* Grid Section */}
            <div className="grid grid-cols-6 grid-rows-8 md:grid-cols-10 md:grid-rows-4 gap-2 md:gap-3 w-full max-w-[1500px] mx-auto md:h-[600px] h-[800px] max-sm:min-h-[100vh] overflow-y-auto">
              <LongestStreak
                streak={userStats["Longest Streak"] || 0}
                start={userStats["Longest Streak Start"] || ""}
                end={userStats["Longest Streak End"] || ""}
                classname="p-2 md:p-3 col-start-1 col-span-2 row-start-1 row-span-3 md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-3 overflow-hidden min-w-0 min-h-0"
              />
              <CurrentStreak
                streak={userStats["Current Streak"] || 0}
                start={userStats["Current Streak Start"] || ""}
                end={userStats["Current Streak End"] || ""}
                classname="p-2 md:p-3 col-start-3 col-span-2 row-start-1 row-span-2 md:col-start-3 md:col-span-2 md:row-start-1 md:row-span-2 overflow-hidden min-w-0 min-h-0"
              />
              <Followers
                followers={userStats.Followers || 0}
                classname="p-2 md:p-3 col-start-5 col-span-2 row-start-1 row-span-1 md:col-start-5 md:col-span-2 md:row-start-1 md:row-span-1 overflow-hidden min-w-0 min-h-0"
              />
              <Repos
                repos={userStats.Repositories || 0}
                classname="p-2 md:p-3 col-start-1 col-span-2 row-start-4 row-span-1 md:col-start-7 md:col-span-4 md:row-start-4 md:row-span-1 overflow-hidden min-w-0 min-h-0"
              />
              <Commit
                commits={userStats["Total Contibutions"] || 0}
                classname="p-2 md:p-3 col-start-3 col-span-2 row-start-3 row-span-2 md:col-start-5 md:col-span-2 md:row-start-2 md:row-span-2 overflow-hidden min-w-0 min-h-0"
              />
              <PRs
                pr={userStats["Pull Requests"] || 0}
                classname="p-2 md:p-3 col-start-5 col-span-1 row-start-2 row-span-1 md:col-start-7 md:col-span-1 md:row-start-1 md:row-span-3 overflow-hidden min-w-0 min-h-0"
              />
              <Issues
                issues={userStats.Issues || 0}
                classname="p-2 md:p-3 col-start-6 col-span-1 row-start-2 row-span-1 md:col-start-8 md:col-span-1 md:row-start-1 md:row-span-2 overflow-hidden min-w-0 min-h-0"
              />
              <Stars
                stars={userStats["Star Earned"] || 0}
                classname="p-2 md:p-3 col-start-1 col-span-2 row-start-5 row-span-1 md:col-start-1 md:col-span-2 md:row-start-4 md:row-span-1 overflow-hidden min-w-0 min-h-0"
              />
              <ContributedTo
                contros={userStats["Contributed To"] || 0}
                classname="p-2 md:p-3 col-start-3 col-span-2 row-start-5 row-span-1 md:col-start-5 md:col-span-2 md:row-start-4 md:row-span-1 overflow-hidden min-w-0 min-h-0"
              />
              <Achievements
                userStats={userStats}
                classname="p-2 md:p-3 col-start-5 col-span-2 row-start-5 row-span-1 md:col-start-8 md:col-span-3 md:row-start-3 md:row-span-1 hidden md:block overflow-hidden min-w-0 min-h-0"
              />
              <Languages
                userStats={userStats}
                classname="p-2 md:p-3 col-start-1 col-span-3 row-start-6 row-span-2 md:col-start-3 md:col-span-2 md:row-start-3 md:row-span-2 hidden md:block overflow-hidden min-w-0 min-h-0"
              />
              <TimeAnalysis
                userStats={userStats}
                classname="p-2 md:p-3 col-start-4 col-span-3 row-start-6 row-span-2 md:col-start-9 md:col-span-2 md:row-start-1 md:row-span-2 hidden md:block overflow-hidden min-w-0 min-h-0"
              />
            </div>
            
            {/* Contribution Graph Section */}
            <div className="max-sm:px-5 mt-4 md:mt-2 w-full max-w-2xl flex mx-auto">
              <h1 className="max-w-2xl w-full font-modernbold text-xl md:text-2xl mb-2">
                Contribution Graph:
              </h1>
            </div>
            <div className="px-3 md:px-5 rounded-2xl w-full mx-auto flex flex-col relative overflow-auto">
              <div className="relative max-w-2xl mx-auto">
                <div
                  className="bg-zinc-800/20 backdrop-blur-2xl border border-zinc-200/10 backdrop-saturate-200 p-2 md:p-3 rounded-2xl mx-auto overflow-auto max-w-2xl opacity-95 hover:opacity-100 z-[9999] cursor-pointer"
                  dangerouslySetInnerHTML={{
                    __html: graph.graph,
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
              {!loading && (
          <>
            <Button
              onClick={handleDownloadImage}
              className="border-zinc-200/20 bg-zinc-800/20 rounded-full py-6 absolute bottom-4 right-4 group z-20"
            >
              <ArrowDown size={18} />
              <p className="font-modernreg text-zinc-400 max-xl:border border-zinc-200/20 max-xl:bg-primary/90 max-xl:p-1 max-xl:text-white/90 px-2 max-xl:px-3 max-xl:rounded-lg bottom-10 right-1 max-xl:absolute lg:flex max-lg:translate-y-2 max-xl:opacity-0 max-xl:group-hover:opacity-100 max-xl:group-hover:translate-y-0 duration-150 lg:group-hover:text-white/80">
                Download Bento
              </p>
            </Button>
            <div className="absolute bottom-4 left-4 z-20 md:hidden">
              <ShareButtons 
                username={username} 
                userStats={userStats} 
                className="flex-col gap-1"
              />
            </div>
          </>
        )}
    </div>
  );
};

export default Github;
