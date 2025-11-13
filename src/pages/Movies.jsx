import { Link } from "react-router-dom";
import useTMDBAPI from "../hooks/useTMDBAPI";
import { useEffect, useState } from "react";
import ErrorUI from "../components/ErrorUI";
import LoadingUI from "../components/LoadingUI";
import { genarateSlug } from "../utilities/commomUtilis";

export default function Movies() {
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [endpoint, setEndPoint] = useState("popular");

    const { data, error, loading } = useTMDBAPI(`/movie/${endpoint}?page=${page}`);

    useEffect(() => {
        if (data) {
            setMovies(prev => [...prev, ...data]);
        }
    }, [data]);

    useEffect(() => {
        const savedY = sessionStorage.getItem("scrollY");
        const savedPage = sessionStorage.getItem("moviesPage");

        if (savedPage) setPage(parseInt(savedPage));
        if (savedY) {
            setTimeout(() => window.scrollTo(0, parseInt(savedY)), 100);
        }
    }, []);

    useEffect(() => { setPage(1); setMovies([]); }, [endpoint]);

    const movieCategories = [
        { label: "Now Playing", value: "now_playing" },
        { label: "Popular", value: "popular" },
        { label: "Top Rated", value: "top_rated" },
        { label: "Upcoming", value: "upcoming" },
    ];

    if (error || !movies)
        return <ErrorUI message="Unable to fetch movies. Try again later." />;

    return (<div className="dark:bg-gray-950 w-full dark:text-slate-200 min-h-svh">
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="flex justify-end items-center py-6">
                <select
                    className="px-4 py-2 text-red-600 bg-transparent border-none outline-none cursor-pointer"
                    value={endpoint}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value !== endpoint) {
                            setEndPoint(value);
                        }
                    }}
                >
                    {movieCategories.map((category) => (
                        <option key={category.value} value={category.value}>
                            {category.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {movies.map((movie) => (
                    <Link
                        key={movie.id}
                        to={`/explore-movies/${movie.id}/${genarateSlug(movie.title)}`}
                        onClick={() => {
                            sessionStorage.setItem("scrollY", window.scrollY);
                            sessionStorage.setItem("moviesPage", page);
                        }}
                        className="group"
                    >
                        <div className="overflow-hidden rounded-xl shadow-md">
                            <img
                                loading="lazy"
                                className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                        </div>
                        <h2 className="mt-2 text-base font-semibold group-hover:text-red-600 transition-colors duration-200">
                            {movie.title}
                        </h2>
                        <p className="text-sm text-gray-500">{movie.release_date}</p>
                    </Link>
                ))}
            </div>

            {movies.length > 0 && (
                <div className="mt-10 text-center">
                    {loading ? (
                        <LoadingUI />
                    ) : (
                        <span
                            onClick={() => setPage((prev) => prev + 1)}
                            className="text-blue-600 cursor-pointer underline transition-colors duration-300 uppercase hover:text-red-700"
                        >
                            Load More
                        </span>
                    )}
                </div>
            )}
        </div>
    </div>);
}
