import { AnilistLists } from "@/types/anilist-types";
import AnimeCards from "./-AnimeCards";

import { Link } from "@tanstack/react-router";
import { ArrowBigDown } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carouselAnimeCategory";

type AnimeCategoryProps = {
  animeList: AnilistLists | undefined;
  category: string;
};

export default function AnimeCategory({
  animeList,
  category,
}: AnimeCategoryProps) {
  return (
    <section className="w-full bg-mainBackground  font-Montserrat py-5">
      <div className="flex flex-col px-5">
        <div className="flex flex-row items-center gap-2 mb-5">
          <div className="h-7 w-1 bg-white flex items-center rounded-3xl"></div>
          <p className="text-white text-base mobileL:text-lg xl:text-2xl font-semibold">
            {category}
          </p>
        </div>
        <div className="flex gap-7 flex-wrap">
          {/* {animeList?.results.map((anime) => {
            return <AnimeCards key={anime.id} anime={anime}></AnimeCards>;
          })} */}
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full "
          >
            <CarouselContent>
              {animeList?.results.map((anime) => {
                return (
                  <Link key={anime.id} to={`../anime-info/${anime.id}/`}>
                    <CarouselItem className="basis-1/3">
                      <AnimeCards anime={anime}></AnimeCards>
                    </CarouselItem>
                  </Link>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 h-full  bg-gradient-to-r from-black to-transparent bg-transparent border-none stroke-none rounded-none hover:bg-transparent" />
            <CarouselNext className="absolute right-0 h-full  bg-gradient-to-l from-black to-transparent bg-transparent border-none stroke-none rounded-none hover:bg-transparent" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
