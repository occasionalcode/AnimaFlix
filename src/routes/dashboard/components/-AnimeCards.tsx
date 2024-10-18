import { useDashboardStore } from "@/stores/dashboardStore";
import { Anime } from "@/types/anilist-types";

type AnimeCardsProps = {
  anime: Anime;
  category?: string;
};

export default function AnimeCards({ anime, category }: AnimeCardsProps) {
  const { setSelectedAnime } = useDashboardStore();
  return (
    <div
      className=" flex flex-col justify-between mobileS:aspect-[3/5]  h-52 xl:h-64 overflow-hidden text-center"
      onClick={
        category === "HeroTrending" ? () => setSelectedAnime(anime) : () => null
      }
    >
      <div className="relative rounded-xl overflow-hidden">
        <div className="absolute size-full"></div>

        <img
          src={anime.image}
          alt={anime.title.english ?? anime.title.romaji ?? anime.title.native}
        />
      </div>
      <div className="flex pt-2 text-sm lg:text-base text-white text-center items-end w-full ">
        <p className="line-clamp-1 text-wrap w-full text-center text-white">
          {anime.title.english ?? anime.title.romaji ?? anime.title.native}
        </p>
      </div>
    </div>
  );
}
