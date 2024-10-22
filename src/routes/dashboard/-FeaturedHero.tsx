import { AnilistLists, Anime } from "@/types/anilist-types";
import HeroCarousel from "./components/-HeroCarousel";
import { Link } from "@tanstack/react-router";
import { Angry, Calendar, Laugh, Meh, Smile, Wind } from "lucide-react";
import { HtmlHTMLAttributes, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AnimeRating from "../components/-AnimeRating";

type FeaturedHeroProps = {
  anime: Anime;
  animelist: AnilistLists;
};

export default function FeaturedHero({ anime, animelist }: FeaturedHeroProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    // Check if the paragraph's height exceeds 20px
    if (
      paragraphRef.current &&
      paragraphRef.current.getBoundingClientRect().height > 20
    ) {
      setIsOverflowing(true);
    }
  }, []);

  return (
    <div className=" relative w-full min-h-96 pt-72 px-3 sm:pr-8 md:pr-14  lg:pt-32 z-20  py-1 pb-5 text-white">
      {/* container for the information */}
      <>
        <div className="lg:grid lg:grid-cols-3 lg:justify-between w-full">
          <div className="relative lg:col-span-2 z-30 w-full h-full flex flex-col justify-end items-start gap-1  ">
            {/* Title */}
            <h2 className=" font-bold line-clamp-3 text-wrap text-2xl mobileL:text-4xl text-start ">{`${anime.title.english ?? anime.title.romaji ?? anime.title.native}`}</h2>

            {/* Container for sub infos */}
            <div className="flex flex-col gap-1">
              {/* Status */}
              <div className="flex items-start justify-start w-full font-bold gap-3 pt-2">
                <div className="flex flex-col gap-1">
                  <p
                    className={`text-xs mobileL:text-sm ${`${anime.status}` === "Ongoing" && " text-orange-400"} ${`${anime.status}` === "Completed" && " text-white"}`}
                  >
                    {`${anime.status}`}
                  </p>
                  <div className="h-[1px] -mt-1 w-full bg-white "></div>
                </div>
                <div className=" mobileS:hidden lg:flex justify-start items-start pt-0.5 gap-2">
                  {/* Year */}
                  <div className="flex items-center justify-start gap-1 text-xs mobileL:text-sm text-gray-400 font-semibold">
                    <Calendar size={15} />
                    <p>{anime.releaseDate}</p>
                  </div>

                  {/* Rating */}
                  <div className="lg:flex text-xs mobileL:text-sm gap-1 text-gray-400 font-semibold  ">
                    {anime.rating! >= 80 ? (
                      <Laugh size={15} className="" />
                    ) : anime.rating! >= 70 && anime.rating! < 80 ? (
                      <Smile size={15} />
                    ) : anime.rating! > 60 && anime.rating! < 70 ? (
                      <Meh size={15} />
                    ) : anime.rating! <= 0 ? (
                      <Wind size={15} />
                    ) : (
                      <Angry size={15} className="" />
                    )}
                    <p>{`${anime.rating}%`}</p>
                  </div>
                </div>
              </div>

              {/* description */}
              <motion.div
                initial={{ height: "2.5rem" }}
                animate={{
                  height: isExpanded ? `auto` : `2.5rem`,
                }}
                transition={{
                  duration: 0.2,
                }}
                className={`hidden sm:flex ${isExpanded ? `overflow-visible` : `overflow-hidden`}`}
              >
                <p
                  ref={paragraphRef}
                  className="hidden sm:flex lg:line-clamp-4 text-base"
                >
                  {anime.description.replace(/<[^>]*>/g, "")}
                </p>
              </motion.div>
              {isOverflowing && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={`text-red-300 hidden sm:flex `}
                >
                  {!isExpanded ? <p>See more...</p> : <p>See less</p>}
                </button>
              )}

              {/* genre */}
              <div className="mobileS:hidden lg:flex flex-row justify-start w-full items-start mobileS:gap-2 flex-wrap pt-5 pb-1">
                {anime.genres.map((genre) => {
                  return (
                    <div
                      key={genre}
                      className={`text-white border-2 border-red-700   rounded-3xl px-3 py-1 flex-wrap  `}
                    >
                      <p className={`text-sm `}>{genre}</p>
                    </div>
                  );
                })}
              </div>

              {/* rating and year */}
              <div className="flex justify-start items-center pt-2 gap-2 lg:hidden">
                {/* Year */}
                <div className="flex items-center justify-start gap-1 text-xs mobileL:text-sm text-gray-400 font-semibold">
                  <Calendar size={15} />
                  <p>{anime.releaseDate}</p>
                </div>

                {/* Rating */}
                <AnimeRating anime={anime.rating} />
                {/* <div className="flex text-xs gap-1 text-gray-400 font-semibold ">
                  {anime.rating! >= 80 ? (
                    <Laugh size={15} className="" />
                  ) : anime.rating! >= 70 && anime.rating! < 80 ? (
                    <Smile size={15} />
                  ) : anime.rating! > 60 && anime.rating! < 70 ? (
                    <Meh size={15} />
                  ) : anime.rating! <= 0 ? (
                    <Wind size={15} />
                  ) : (
                    <Angry size={15} className="" />
                  )}
                  <p>{`${anime.rating}%`}</p>
                </div> */}
              </div>
            </div>

            {/* buttons */}
            <div className="flex flex-row justify-start w-full gap-5 pt-2">
              <Link
                className="bg-white border-2 px-7 rounded-sm text-black text-xs lg:text-sm py-2"
                to={`../anime-info/${anime.id}`}
              >
                More Info
              </Link>
              <button className="bg-red-700 text-white px-7 py-2 rounded-sm text-xs lg:text-sm">
                Watch Now
              </button>
            </div>

            {/* Carousel */}
            <div className="hidden lg:flex w-full pt-8  ">
              <HeroCarousel animelist={animelist} />
            </div>
          </div>
          <div className="mobileS:hidden lg:flex justify-center items-start full h-full  z-50">
            <Link
              className="aspect-[2/3]  object-cover rounded-2xl h-72"
              to={`../anime-info/${anime.id}`}
            >
              <img
                className="rounded-xl"
                src={anime.image}
                alt={
                  anime.title.english ??
                  anime.title.romaji ??
                  anime.title.native
                }
              />
            </Link>
          </div>
        </div>
      </>

      {/* container for the bg image */}
      <>
        <div className="h-full w-dvw left-1/2 ml-[-50vw]  overflow-hidden absolute inset-0 ">
          <div className="h-full w-full   absolute top-0 bg-gradient-to-tr from-mainBackground/100 from-[percentage:0%_35%]  via-mainBackground/60    to-transparent z-10 "></div>
          <img
            className="size-full z-[-1]  object-cover object-center blur-sm"
            src={anime.cover ?? anime.image}
            alt=""
          />
        </div>
      </>
    </div>
  );
}
