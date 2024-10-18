import {
  useFetchAnilistFavoriteAnime,
  useFetchAnilistPopularAnime,
  useFetchAnilistPopularAnimeMovies,
  useFetchAnilistPopularUpcomingAnime,
  useFetchAnilistTrendingAnime,
} from "@/api/anilist-fetch";
import FeaturedHero from "./-FeaturedHero";
import { useDashboardStore } from "@/stores/dashboardStore";
import { useEffect } from "react";
import LoadingScreen from "../components/-LoadingScreen";
import { draw, random } from "radash";
import AnimeCategory from "./components/-AnimeCategory";

export default function Dashboard() {
  const {
    data: trendingAnimeLists,
    error: trendingError,
    isLoading: trendingLoading,
  } = useFetchAnilistTrendingAnime();

  const { selectedAnime, setSelectedAnime } = useDashboardStore();

  const {
    data: popularAnimeLists,
    isLoading: popularLoading,
    error: popularError,
  } = useFetchAnilistPopularAnime();

  const {
    data: favouriteAnimeLists,
    isLoading: favouriteLoading,
    error: favouriteError,
  } = useFetchAnilistFavoriteAnime();

  const {
    data: popularAnimeMovies,
    isLoading: popularMoviesLoading,
    error: popularMoviesError,
  } = useFetchAnilistPopularAnimeMovies();

  const {
    data: popularUpcomimgAnimes,
    isLoading: popularUpcomingLoading,
    error: popularUpcomingError,
  } = useFetchAnilistPopularUpcomingAnime();

  const randomAnime = [
    popularAnimeLists,
    favouriteAnimeLists,
    popularAnimeMovies,
    trendingAnimeLists,
  ];

  const fetchRandomAnime = draw(randomAnime)?.results;

  // const getRandomAnime = draw(fetchRandomAnime!);

  useEffect(() => {
    if (fetchRandomAnime) {
      setSelectedAnime(fetchRandomAnime[0]);
    }
  }, []);

  if (
    trendingLoading ||
    popularLoading ||
    favouriteLoading ||
    popularMoviesLoading ||
    popularUpcomingLoading
  ) {
    return <LoadingScreen />;
  }

  if (
    trendingError &&
    popularError &&
    favouriteError &&
    popularMoviesError &&
    popularUpcomingError
  ) {
    return (
      <div>
        <p>error</p>
      </div>
    );
  }

  return (
    <div className="w-full  flex flex-col justify-center items-center">
      {/* <FeaturedHero
        animelist={trendingAnimeLists!}
        anime={
          selectedAnime ??
          fetchRandomAnime![random(0, fetchRandomAnime!.length)]
        }
      /> */}
      <FeaturedHero
        animelist={trendingAnimeLists!}
        anime={
          selectedAnime ??
          trendingAnimeLists!.results[
            random(0, trendingAnimeLists!.results.length)
          ]
        }
      />

      <div className=" w-full lg:hidden">
        <AnimeCategory animeList={trendingAnimeLists} category="Trending Now" />
      </div>
      <AnimeCategory animeList={popularAnimeLists} category="Popular Now" />
      <AnimeCategory animeList={favouriteAnimeLists} category="Most Favorite" />
      <AnimeCategory animeList={popularAnimeMovies} category="Popular Movies" />
      <AnimeCategory
        animeList={popularUpcomimgAnimes}
        category="Upcoming Animes"
      />
    </div>
  );
}
