import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carouselFeatured";
import { AnilistLists } from "@/types/anilist-types";
import HeroAnimeCards from "./-HeroAnimeCards";

type HeroCarouselProps = {
  animelist: AnilistLists;
};

export default function HeroCarousel({ animelist }: HeroCarouselProps) {
  //   const { selectedItemID, setSelectedItemID } = useDashboardStore();
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-1/2 z-40 lg:w-full "
    >
      <div className="flex flex-col ">
        <div className="flex flex-row justify-left gap-5 items-end">
          <CarouselPrevious className="w-16" />
          <CarouselNext className="w-16" />
        </div>
        <p className="my-4">Trending now</p>
        <CarouselContent className="-ml-7 relative ">
          {animelist.results.map((anime) => {
            return (
              <CarouselItem key={anime.id} className="pl-7 basis-1/7 ">
                <HeroAnimeCards category="HeroTrending" anime={anime} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </div>
    </Carousel>
  );
}
