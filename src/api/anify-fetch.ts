import { AnifyInfo } from "@/types/anify-types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//used to fetch anify anime infos
export function useFetchAnifyAnimeInfo(id: string) {
  return useQuery<AnifyInfo>({
    queryKey: ["animeInfo", id],
    queryFn: async () => {
      console.log("fetching counters");
      const { data: animeInfo } = await axios.get(
        `https://anify.eltik.cc/info/${id}?fields=[episodes,bannerImage,coverImage,title,rating,trailer,genres,description,type,id,totalEpisodes,year,status,format,characters]`
      );
      return animeInfo as AnifyInfo;
    },
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    refetchInterval: false,
  });
}

//used to fetch the list of Anify anime Episodes
export function useFetchAnifyEpisodesData(id: string) {
  return useQuery<AnifyInfo>({
    queryKey: ["anifyEpisodes", id],
    queryFn: async () => {
      console.log("fetching counters");
      const { data: anifyEpisodes } = await axios.get(
        `https://anify.eltik.cc/info/${id}?fields=[episodes]`
      );
      return anifyEpisodes as AnifyInfo;
    },
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
