import { useEffect, useMemo, useState } from "react";
import { CgArrowLongRight } from "react-icons/cg";
import { Link } from "react-router-dom";
import useTMDBAPI from "../hooks/useTMDBAPI";

export default function Welcome() {
    const { data: trending } = useTMDBAPI("/trending/movie/day");
    const [current, setCurrent] = useState(0);
    const topMovie = trending?.[0];

    const backdrops = useMemo(() => {
        return trending
            ?.filter(movie => movie.backdrop_path)
            ?.slice(0, 10)
            ?.map(movie => `https://image.tmdb.org/t/p/original${movie.backdrop_path}`) || []
    }, [trending]);

    useEffect(() => {
        if (backdrops && backdrops?.length === 0) return;
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % backdrops?.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [backdrops]);

    return (
        <div className="relative w-full h-svh flex justify-center items-center flex-col gap-6 px-4 text-center overflow-hidden">
            {/* Looping Background Images */}
            {backdrops && backdrops.map((url, index) => (
                <img
                    key={index}
                    src={url}
                    alt={`Backdrop ${index}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'}`}
                />
            ))}

            {/* Blur Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

            {topMovie && (
                <div className="absolute bottom-4 right-4 bg-black/60 text-white rounded-xl px-4 py-2 flex flex-col gap-1 backdrop-blur-md shadow-md">
                    <span className="text-sm font-semibold tracking-wide uppercase text-slate-300">Trending Now</span>
                    <span className="text-lg font-bold">
                        {topMovie.title} ({topMovie.release_date?.split("-")[0]})
                    </span>
                    <span className="inline-block bg-yellow-400 text-black font-semibold px-2 py-0.5 text-xs rounded-md w-fit">
                        TMDB {topMovie.vote_average?.toFixed(1)} ★
                    </span>
                </div>
            )}

            {/* Foreground Content */}
            <div className="relative z-10">
                <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white drop-shadow-lg">
                    Welcome to <span className="text-red-500">CineScope</span>
                </h1>
                <p className="text-lg text-slate-200 mt-4 max-w-xl mx-auto drop-shadow-sm">
                    Dive into a world of cinema with our simple movie app powered by the TMDB API.
                    Discover trending films, search by genre, and stay updated.
                </p>
                <Link
                    to="/explore-movies"
                    className="inline-flex items-center gap-2 text-red-300 hover:text-white transition-all group text-lg font-medium hover:scale-105 mt-6"
                >
                    <span className="group-hover:underline">Explore Movies</span>
                    <CgArrowLongRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
            </div>
        </div>
    );
}
