import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import useTMDBAPI from "../hooks/useTMDBAPI";
import ErrorUI from "../components/ErrorUI";
import LoadingUI from "../components/LoadingUI";
import { genarateSlug } from "../utilities/commomUtilis";

const MOVIES_PAGE_KEY = "moviesPage";
const SCROLL_Y_KEY = "scrollY";

const movieCategories = [
    { label: "Now Playing", value: "now_playing" },
    { label: "Popular", value: "popular" },
    { label: "Top Rated", value: "top_rated" },
    { label: "Upcoming", value: "upcoming" },
];

export default function Movies() {
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [endpoint, setEndPoint] = useState("popular");

    const [restored, setRestored] = useState(false);
    const isRestoring = useRef(true); // prevents double fetch

    const { data, error, loading } = useTMDBAPI(
        restored ? `/movie/${endpoint}?page=${page}` : null // ⛔ don't fetch before restoring
    );

    // Restore from sessionStorage once
    useEffect(() => {
        const savedY = sessionStorage.getItem(SCROLL_Y_KEY);
        const savedPage = sessionStorage.getItem(MOVIES_PAGE_KEY);

        if (savedPage) setPage(parseInt(savedPage));
        setTimeout(() => {
            if (savedY) window.scrollTo(0, parseInt(savedY));
            isRestoring.current = false;
            setRestored(true);
        }, 100);
    }, []);

    // Update movie list only after restored and data available
    useEffect(() => {
        if (data && !isRestoring.current) {
            setMovies((prev) => {
                // prevent duplicate movie IDs
                const existingIds = new Set(prev.map((m) => m.id));
                const newMovies = data.filter((m) => !existingIds.has(m.id));
                return [...prev, ...newMovies];
            });
        }
    }, [data]);

    // Reset when endpoint changes
    useEffect(() => {
        if (!isRestoring.current) {
            setMovies([]);
            setPage(1);
        }
    }, [endpoint]);

    if (error) return <ErrorUI message="Unable to fetch movies. Try again later." />;
    if (!movies.length && loading) return <LoadingUI />;

    return (
        <div className="dark:bg-gray-950 w-full dark:text-slate-200 min-h-svh">
            <div className="max-w-6xl mx-auto px-4 py-10">
                {/* Category Selector */}
                <div className="flex justify-end items-center py-6">
                    <select
                        className="px-4 py-2 text-red-600 bg-transparent border-none outline-none cursor-pointer"
                        value={endpoint}
                        onChange={(e) => setEndPoint(e.target.value)}
                    >
                        {movieCategories.map(({ label, value }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Movie Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {movies.map((movie) => (
                        <Link
                            key={movie.id}
                            to={`/explore-movies/${movie.id}/${genarateSlug(movie.title)}`}
                            onClick={() => {
                                sessionStorage.setItem(SCROLL_Y_KEY, window.scrollY);
                                sessionStorage.setItem(MOVIES_PAGE_KEY, page);
                            }}
                            className="group"
                        >
                            <div className="overflow-hidden rounded-xl shadow-md">
                                <img
                                    loading="lazy"
                                    className="w-full aspect-2/3 object-cover group-hover:scale-105 transition-transform duration-300"
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

                {/* Pagination */}
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
        </div>
    );
}
