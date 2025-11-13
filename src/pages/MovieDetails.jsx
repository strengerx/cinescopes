import { useParams, Link } from "react-router-dom";
import useTMDBAPI from "../hooks/useTMDBAPI";
import ErrorUI from "../components/ErrorUI";
import LoadingUI from "../components/LoadingUI";
import { useEffect, useState } from "react";

export default function MovieDetails() {
    const { movieid } = useParams();
    const [trailer, setTrailer] = useState({});
    const { data: movie, error, loading } = useTMDBAPI(`/movie/${movieid}`);

    const { data: videos } = useTMDBAPI(`/movie/${movieid}/videos`);

    useEffect(() => {
        if (videos) {
            setTrailer(videos.find(t => t.type === "Trailer" && t.site === "YouTube"));
        }
    }, [videos])

    if (error) return <ErrorUI message="Movie not found or network error." />;
    if (loading) return <LoadingUI />;

    return (
        <div className="max-w-6xl py-10 px-4 mx-auto flex flex-col gap-10 dark:bg-gray-950">
            <Link
                to="/movies"
                className="text-sm text-red-600 hover:underline inline-block"
            >
                ← Back to Movies
            </Link>

            {/* Main Layout */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 dark:bg-gray-950">
                <img
                    loading="lazy"
                    className="w-full h-auto rounded-xl shadow-lg object-cover"
                    src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                    alt={movie?.title}
                />

                <div className="flex flex-col gap-6">
                    <div>
                        <h2 className="text-4xl font-bold">{movie?.title}</h2>
                        {movie?.tagline && <p className="text-lg italic text-red-600 mt-1">&quot;{movie.tagline}&quot;</p>}
                        <p className="text-gray-600 mt-2">Released: {movie?.release_date}</p>
                    </div>

                    <p className="text-base text-gray-700">{movie?.overview}</p>
                    {trailer &&
                        <Link to={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" className="bg-red-500 px-3 py-1 rounded-full text-red-50">
                            Watch Trailer
                        </Link>}

                    {/* Tag Categories (same as before) */}
                    <div className="flex flex-col gap-4 text-sm">

                        {/* Genres */}
                        {movie?.genres?.length > 0 && (
                            <div>
                                <h3 className="text-slate-800 font-semibold mb-1">🎬 Genres</h3>
                                <div className="flex flex-wrap gap-2">
                                    {movie.genres.map(genre => (
                                        <span key={genre.id} className="bg-slate-200 px-3 py-1 rounded-full">{genre.name}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Language & Runtime */}
                        <div>
                            <h3 className="text-slate-800 font-semibold mb-1">🌐 Language & Runtime</h3>
                            <div className="flex flex-wrap gap-2">
                                {movie?.original_language && (
                                    <span className="bg-sky-200 px-3 py-1 rounded-full">
                                        Language: {movie.original_language.toUpperCase()}
                                    </span>
                                )}
                                {movie?.runtime && (
                                    <span className="bg-emerald-200 px-3 py-1 rounded-full">
                                        Runtime: {movie.runtime} mins
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Production & Countries */}
                        <div>
                            <h3 className="text-slate-800 font-semibold mb-1">🎥 Production & Countries</h3>
                            <div className="flex flex-wrap gap-2">
                                {movie?.production_companies?.slice(0, 4).map((c, i) => (
                                    <span key={i} className="bg-indigo-200 px-3 py-1 rounded-full">{c.name}</span>
                                ))}
                                {movie?.production_countries?.map((c, i) => (
                                    <span key={i} className="bg-pink-200 px-3 py-1 rounded-full">Country: {c.name}</span>
                                ))}
                            </div>
                        </div>

                        {/* Financials */}
                        {(movie?.budget || movie?.revenue) ? (
                            <div>
                                <h3 className="text-slate-800 font-semibold mb-1">💸 Financials</h3>
                                <div className="flex flex-wrap gap-2">
                                    {movie?.budget > 0 && (
                                        <span className="bg-red-200 px-3 py-1 rounded-full">
                                            Budget: ${movie.budget.toLocaleString()}
                                        </span>
                                    )}
                                    {movie?.revenue > 0 && (
                                        <span className="bg-green-200 px-3 py-1 rounded-full">
                                            Revenue: ${movie.revenue.toLocaleString()}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ) : "No financial data available"}
                    </div>
                </div>
            </div>

        </div>
    );
}
