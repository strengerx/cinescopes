import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { IoPlayOutline } from "react-icons/io5";
import ErrorUI from "../components/ErrorUI";
import DraftMDetailLoading from "../components/DraftMDetailLoading";
import RelatedMoviesSlider from "../components/RelatedMoviesSlider";
import useMovieDetails from "../hooks/useMovieDetails";

/* ------------------------------
   MAIN COMPONENT
------------------------------- */
export default function DraftMovieDetails() {
    const { movieid } = useParams();
    const {
        movie,
        directors,
        similar,
        trailer,
        cast,
        loading,
        error,
        watchProviders,
    } = useMovieDetails(movieid);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0 });
    }, [movieid]);

    if (loading || !movie) return <DraftMDetailLoading />;
    if (error || !movie.title) return <ErrorUI message="Movie not found." />;

    return (<div className="w-full bg-white dark:bg-gray-950 text-gray-900 dark:text-slate-200">
        <div className="max-w-6xl py-10 px-4 mx-auto flex flex-col gap-10">
            <BackLink />

            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10">
                <div className="md:sticky md:top-10 h-max">
                    <PosterImage src={movie.poster_path} alt={movie.title} />
                </div>

                <div className="flex flex-col gap-6">
                    <MovieHeader movie={movie} />
                    <MovieOverview overview={movie.overview} />

                    <MovieActions trailer={trailer} imdbId={movie.imdb_id} />

                    <MovieProviders providers={watchProviders} />
                    <MovieTags movie={movie} directors={directors} />
                </div>
            </div>

            {cast?.length > 0 && <MovieCast cast={cast} />}
            <RelatedMoviesSlider similar={similar} />
        </div>
    </div>);
}

/* ------------------------------
   REUSABLE SUBCOMPONENTS
------------------------------- */

function BackLink() {
    return (
        <Link
            to="/explore-movies"
            className="text-sm text-blue-600 hover:underline inline-block dark:text-blue-400"
        >
            ← Back to Movies
        </Link>
    );
}

function PosterImage({ src, alt }) {
    const imageUrl = src
        ? `https://image.tmdb.org/t/p/original${src}`
        : "https://via.placeholder.com/300x450?text=No+Image";

    return (
        <img
            className="w-full h-auto rounded-xl shadow-lg object-cover"
            src={imageUrl}
            alt={alt}
            loading="lazy"
        />
    );
}

function MovieHeader({ movie }) {
    return (
        <div>
            <h2 className="text-4xl font-bold dark:text-slate-100">{movie.title}</h2>
            {movie.tagline && (
                <p className="text-lg italic text-red-600 mt-1 dark:text-red-400">
                    &quot;{movie.tagline}&quot;
                </p>
            )}
            <p className="text-gray-600 dark:text-gray-400 mt-2">
                Released: {movie.release_date}
            </p>
        </div>
    );
}

function MovieOverview({ overview }) {
    return (
        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            {overview}
        </p>
    );
}

/* TRAILER + IMDb */
function MovieActions({ trailer, imdbId }) {
    return (
        <div className="flex gap-4 flex-wrap text-sm">
            {trailer && (
                <a
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-all flex items-center gap-2"
                >
                    <IoPlayOutline /> Watch Trailer
                </a>
            )}
            {imdbId && (
                <a
                    href={`https://www.imdb.com/title/${imdbId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-400 text-sm font-semibold underline"
                >
                    🎬 IMDb
                </a>
            )}
        </div>
    );
}

/* PROVIDERS (STREAM, BUY, RENT) */
function MovieProviders({ providers = {} }) {
    const providerSections = useMemo(
        () => [
            { key: "flatrate", emoji: "📺", label: "Streaming" },
            { key: "buy", emoji: "💰", label: "Buy" },
            { key: "rent", emoji: "🎬", label: "Rent" },
        ],
        []
    );

    return (
        <div className="flex flex-col gap-4 text-slate-800 dark:text-gray-300">
            {providerSections.map(({ key, emoji, label }) => {
                const list = providers && providers[key];
                if (!list?.length) return null;

                return (
                    <TagGroup key={key} title={`${emoji} ${label}`}>
                        {list.map((p, i) => (
                            <Tag key={`${key}-${i}`} color="bg-slate-200 dark:bg-slate-800">
                                {p.provider_name}
                            </Tag>
                        ))}
                    </TagGroup>
                );
            })}
        </div>
    );
}

/* TAG GROUPS (Genres, Language, Director, etc.) */
function MovieTags({ movie, directors }) {
    return (
        <div className="flex flex-col gap-4 text-sm">
            {movie.genres?.length > 0 && (
                <TagGroup title="🎬 Genres">
                    {movie.genres.map((g) => (
                        <Tag key={g.id}>{g.name}</Tag>
                    ))}
                </TagGroup>
            )}

            <TagGroup title="🌐 Language & Runtime">
                {movie.original_language && (
                    <Tag color="bg-sky-200 dark:bg-sky-800">
                        Language: {movie.original_language.toUpperCase()}
                    </Tag>
                )}
                {movie.runtime && (
                    <Tag color="bg-emerald-200 dark:bg-emerald-700">
                        Runtime: {movie.runtime} mins
                    </Tag>
                )}
            </TagGroup>

            <TagGroup title="🎯 Director & Rating">
                {directors?.length > 0 && (
                    <Tag color="bg-purple-200 dark:bg-purple-800">
                        Director: {directors.map((d) => d.name).join(", ")}
                    </Tag>
                )}
                {movie.vote_average && (
                    <Tag color="bg-yellow-200 dark:bg-yellow-700">
                        Rating: {movie.vote_average} / 10
                    </Tag>
                )}
            </TagGroup>

            <TagGroup title="🎥 Production & Countries">
                {movie.production_companies?.slice(0, 4).map((c, i) => (
                    <Tag key={`prod-${i}`} color="bg-indigo-200 dark:bg-indigo-700">
                        {c.name}
                    </Tag>
                ))}
                {movie.production_countries?.map((c, i) => (
                    <Tag key={`country-${i}`} color="bg-pink-200 dark:bg-pink-700">
                        Country: {c.name}
                    </Tag>
                ))}
            </TagGroup>

            {movie.budget || movie.revenue ? (
                <TagGroup title="💸 Financials">
                    {movie.budget > 0 && (
                        <Tag color="bg-red-200 dark:bg-red-700">
                            Budget: ${movie.budget.toLocaleString()}
                        </Tag>
                    )}
                    {movie.revenue > 0 && (
                        <Tag color="bg-green-200 dark:bg-green-700">
                            Revenue: ${movie.revenue.toLocaleString()}
                        </Tag>
                    )}
                </TagGroup>
            ) : (
                <p className="text-gray-600 dark:text-gray-500">
                    No financial data available
                </p>
            )}
        </div>
    );
}

/* CAST SECTION */
function MovieCast({ cast }) {
    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-gray-300 mb-4">
                🎭 Cast
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {cast.slice(0, 12).map((actor) => (
                    <div
                        key={actor.id}
                        className="flex flex-col items-center bg-slate-200 dark:bg-slate-800 rounded-full p-3 shadow-sm hover:shadow-md transition-all"
                    >
                        <img
                            src={
                                actor.profile_path
                                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                    : "https://via.placeholder.com/150x225?text=No+Image"
                            }
                            alt={actor.name}
                            className="w-16 h-24 object-cover rounded-full mb-2 shadow"
                        />
                        <p className="text-sm font-semibold text-center dark:text-white">
                            {actor.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                            as {actor.character}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* GENERIC UI HELPERS */
function TagGroup({ title, children }) {
    return (
        <div>
            <h3 className="font-semibold mb-1 text-slate-800 dark:text-gray-400">
                {title}
            </h3>
            <div className="flex flex-wrap gap-2">{children}</div>
        </div>
    );
}

function Tag({ children, color = "bg-slate-200 dark:bg-slate-800" }) {
    return (
        <span className={`${color} px-3 py-1 rounded-full text-sm`}>
            {children}
        </span>
    );
}
