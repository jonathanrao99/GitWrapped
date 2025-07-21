"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useSetRecoilState } from "recoil";
import {
  graphState,
  loadingState,
  usernameState,
  userStatsState,
} from "@/Recoil/State/atom";
import { useRouter } from "next/navigation";
import fetchUser from "@/actions/fetchUser";
import fetchGraph from "@/actions/fetchGraph";
import { toast } from "@/hooks/use-toast";
import { GitWrappedError } from "@/utils/errorHandler";

const githubInputSchema = z.object({
  username: z.string().min(2).max(50),
});

const GithubInput = () => {
  const setUsername = useSetRecoilState(usernameState);
  const setLoading = useSetRecoilState(loadingState);
  const setUserStats = useSetRecoilState(userStatsState);
  const setGraphState = useSetRecoilState(graphState);
  const router = useRouter();

  const form = useForm<z.infer<typeof githubInputSchema>>({
    resolver: zodResolver(githubInputSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof githubInputSchema>) {
    try {
      setLoading(true);
      toast({ title: "Generating", generating: true });    
      setUsername(values.username);
      
      // Update URL for sharing
      router.push(`/?user=${encodeURIComponent(values.username)}`);
      
      const { userStats } = await fetchUser(values.username);
      const graph = await fetchGraph(values.username);
      
      setUserStats(userStats);
      setGraphState(graph);
      
      if (graph.graph === "No contributions this year") {
        toast({
          title: "No contributions found",
          description: "This user has no contributions this year",
        });
      } else {
        toast({title: "Gitwrapped generated"});
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      
      let errorTitle = "Error";
      let errorMessage = "An error occurred while fetching data";
      
      if (error instanceof GitWrappedError) {
        errorTitle = error.message;
        errorMessage = error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="font-modernreg">
                <FormControl>
                  <Input 
                    placeholder="Eg. jonathanrao99" 
                    {...field} 
                    className="bg-zinc-800/20 backdrop-blur-xl backdrop-saturate-200 h-12 sm:h-14 text-base sm:text-lg pr-12 sm:pr-14" 
                  />
                </FormControl>
                <FormDescription className="text-white/90 font-modernmono text-xs sm:text-sm">Enter your Github username</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="absolute top-1 right-1 p-2 text-white h-10 w-10 sm:h-12 sm:w-12"
            type="submit"
          >
            <ArrowRight className="size-4 sm:size-5" />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default GithubInput;
