import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import useTMDBAPI from "../hooks/useTMDBAPI";
import ErrorUI from "../components/ErrorUI";
import LoadingUI from "../components/LoadingUI";

export default function MovieDetails() {
    const { movieid } = useParams();
    const { data: movie, error, loading } = useTMDBAPI(`/movie/${movieid}`);
    const { data: videos } = useTMDBAPI(`/movie/${movieid}/videos`);

    const trailer = useMemo(() => (
        videos?.find(t => t.type === "Trailer" && t.site === "YouTube")
    ), [videos]);

    if (error) return <ErrorUI message="Movie not found or network error." />;
    if (loading) return <LoadingUI />;

    if (!movie) return null;

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col gap-10 dark:bg-gray-950">
            <Link to="/movies" className="text-sm text-red-600 hover:underline">
                ← Back to Movies
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10">
                <div className="md:sticky md:top-10 h-max">
                    <img
                        loading="lazy"
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-auto rounded-xl shadow-lg object-cover"
                    />
                </div>

                <div className="flex flex-col gap-6">
                    <MovieHeader movie={movie} />
                    <MovieOverview overview={movie.overview} />

                    {trailer && (
                        <Link
                            to={`https://www.youtube.com/watch?v=${trailer.key}`}
                            target="_blank"
                            className="bg-red-500 hover:bg-red-600 transition-colors px-3 py-1 rounded-full text-white w-max"
                        >
                            ▶ Watch Trailer
                        </Link>
                    )}

                    <MovieTags movie={movie} />
                    <MovieFinancials movie={movie} />
                </div>
            </div>
        </div>
    );
}

/* ------------------------------
   Subcomponents for readability
------------------------------- */

function MovieHeader({ movie }) {
    return (
        <div>
            <h2 className="text-4xl font-bold">{movie.title}</h2>
            {movie.tagline && (
                <p className="text-lg italic text-red-600 mt-1">
                    &quot;{movie.tagline}&quot;
                </p>
            )}
            <p className="text-gray-600 mt-2">Released: {movie.release_date}</p>
        </div>
    );
}

function MovieOverview({ overview }) {
    return <p className="text-base text-gray-700 leading-relaxed">{overview}</p>;
}

function MovieTags({ movie }) {
    return (
        <div className="flex flex-col gap-4 text-sm">
            {movie.genres?.length > 0 && (
                <TagGroup title="🎬 Genres">
                    {movie.genres.map(genre => (
                        <Tag key={genre.id}>{genre.name}</Tag>
                    ))}
                </TagGroup>
            )}

            <TagGroup title="🌐 Language & Runtime">
                {movie.original_language && (
                    <Tag color="bg-sky-200">
                        Language: {movie.original_language.toUpperCase()}
                    </Tag>
                )}
                {movie.runtime && (
                    <Tag color="bg-emerald-200">Runtime: {movie.runtime} mins</Tag>
                )}
            </TagGroup>

            <TagGroup title="🎥 Production & Countries">
                {movie.production_companies?.slice(0, 4).map((c, i) => (
                    <Tag key={`company-${i}`} color="bg-indigo-200">{c.name}</Tag>
                ))}
                {movie.production_countries?.map((c, i) => (
                    <Tag key={`country-${i}`} color="bg-pink-200">
                        Country: {c.name}
                    </Tag>
                ))}
            </TagGroup>
        </div>
    );
}

function MovieFinancials({ movie }) {
    const hasFinancials = movie.budget > 0 || movie.revenue > 0;
    if (!hasFinancials) return <p>No financial data available</p>;

    return (
        <TagGroup title="💸 Financials">
            {movie.budget > 0 && (
                <Tag color="bg-red-200">
                    Budget: ${movie.budget.toLocaleString()}
                </Tag>
            )}
            {movie.revenue > 0 && (
                <Tag color="bg-green-200">
                    Revenue: ${movie.revenue.toLocaleString()}
                </Tag>
            )}
        </TagGroup>
    );
}

/* ------------------------------
   Reusable small components
------------------------------- */

function TagGroup({ title, children }) {
    return (
        <div>
            <h3 className="text-slate-800 font-semibold mb-1">{title}</h3>
            <div className="flex flex-wrap gap-2">{children}</div>
        </div>
    );
}

function Tag({ children, color = "bg-slate-200" }) {
    return (
        <span className={`${color} px-3 py-1 rounded-full text-sm`}>
            {children}
        </span>
    );
}
