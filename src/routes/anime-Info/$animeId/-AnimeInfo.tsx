import { useFetchAnifyAnimeInfo } from "@/api/anify-fetch";
import { useFetchAnilistQuickInfo } from "@/api/anilist-fetch";
import AnimeRating from "@/routes/components/-AnimeRating";
import ErrorScreen from "@/routes/components/-ErrorScreen";
import LoadingScreen from "@/routes/components/-LoadingScreen";

type AnimeInfoProps = {
  id: string;
};

export default function AnimeInfo({ id }: AnimeInfoProps) {
  const {
    data: anifyLists,
    isLoading: anifyLoading,
    error: anifyError,
  } = useFetchAnifyAnimeInfo(id);
  const { data: anilistList, isLoading, error } = useFetchAnilistQuickInfo(id);

  if (anifyLoading && isLoading) {
    return <LoadingScreen />;
  }

  if (anifyError && error) {
    return <ErrorScreen />;
  }

  if (anifyLists || anilistList) {
    // const anifyRating = anifyLists!.rating.anilist * 10;
    const anifyRating = anifyLists?.rating.anilist
      ? anifyLists?.rating.anilist * 10
      : anifyLists?.rating.kitsu
        ? anifyLists?.rating.kitsu * 10
        : 0;
    const anilistRating = anilistList?.rating;

    const rating = anifyRating || anilistRating;

    // console.log(anifyRating);

    return (
      <div className="relative w-full h-full bg-red-50 text-white">
        <div className="absolute z-20 flex flex-col w-full justify-center items-center pt-20 px-5">
          <div className=" aspect-[2/4] h-64 size-40 flex justify-center">
            <img
              className="rounded-xl object-cover"
              src={anilistList?.image}
              alt={
                anilistList?.title.english ??
                anilistList?.title.romaji ??
                anilistList?.title.native
              }
            />
          </div>
          <p>
            <h2 className="font-bold text-2xl text-center">{`${anilistList?.title.english ?? anifyLists?.title.english ?? anilistList?.title.romaji ?? anifyLists?.title.romaji ?? anilistList?.title.native ?? anifyLists?.title.native}`}</h2>
          </p>
          <div className="flex flex-row h-full gap-4">
            <AnimeRating anime={rating} />
            <p className="text-xs">{`${anifyLists?.status ?? anilistList?.status}`}</p>
          </div>
        </div>

        <div className="relative aspect-[3/4] h-[30rem] w-full">
          <div className="h-full w-full   absolute top-0 bg-gradient-to-t from-mainBackground/100 from-[percentage:0%_35%]  via-mainBackground/60    to-transparent z-10 "></div>
          <img
            className="size-full object-cover object-center"
            src={anilistList?.cover}
            alt={anilistList?.title.english}
          />
        </div>
      </div>
    );
  }
}
