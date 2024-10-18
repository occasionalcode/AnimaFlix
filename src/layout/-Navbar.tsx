export default function Navbar() {
  return (
    <div className="absolute top-5 px-3 z-50">
      <div className="hidden md:flex md:flex-col">
        <p className=" font-Montserrat font-bold text-3xl text-white">
          <span className="text-red-500 font-semibold">ANIMA</span>
          <span className="text-white font-light">FLIX</span>
        </p>
        <p className="text-white font-light text-xs">
          Movie, Anime, Manga in ONE site
        </p>
      </div>
      <div className=" md:hidden md:flex-col">
        <p className=" font-Montserrat font-bold text-3xl text-white">
          <span className="text-red-500 font-semibold">AN</span>
          <span className="text-white font-light">FL</span>
        </p>
      </div>
    </div>
  );
}
