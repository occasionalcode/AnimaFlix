import { Angry, Laugh, Meh, Smile, Wind } from "lucide-react";

type AnimeRatingProps = {
  anime: number | undefined;
};

export default function AnimeRating({ anime }: AnimeRatingProps) {
  return (
    <div className="flex text-xs gap-1 text-gray-400 font-semibold ">
      {anime! >= 80 ? (
        <Laugh size={15} className="" />
      ) : anime! >= 70 && anime! < 80 ? (
        <Smile size={15} />
      ) : anime! > 60 && anime! < 70 ? (
        <Meh size={15} />
      ) : anime! <= 0 ? (
        <Wind size={15} />
      ) : (
        <Angry size={15} className="" />
      )}
      <p>{`${anime}%`}</p>
    </div>
  );
}
