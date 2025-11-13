import { useEffect, useState } from "react";
import useTMDBAPI from "./useTMDBAPI";

export default function useMovieDetails(movieId) {
    const [country, setCountry] = useState("US");

    // Get locale from browser
    useEffect(() => {
        const locale = navigator?.language?.split("-")[1];
        if (locale && locale !== country) setCountry(locale);
    }, [country]);

    // Fetch all endpoints
    const {
        data: movie,
        error: movieError,
        loading: movieLoading
    } = useTMDBAPI(`/movie/${movieId}`);

    const {
        data: credits,
        error: creditsError,
        loading: creditsLoading
    } = useTMDBAPI(`/movie/${movieId}/credits`);

    const {
        data: similar,
        error: similarError,
        loading: similarLoading
    } = useTMDBAPI(`/movie/${movieId}/similar`);

    const {
        data: videos,
        error: videosError,
        loading: videosLoading
    } = useTMDBAPI(`/movie/${movieId}/videos`);

    const {
        data: providersRaw,
        error: providersError,
        loading: providersLoading
    } = useTMDBAPI(`/movie/${movieId}/watch/providers`);

    // Derived trailer
    const trailer = videos?.find(v => v.type === "Trailer" && v.site === "YouTube");

    // Derived directors
    const directors = credits?.crew?.filter(person => person.job === "Director") || [];

    // Derived cast
    const cast = credits?.cast || [];

    // Derived watch providers
    const watchProviders = providersRaw?.[country] || null;

    // Global loading and error flags
    const loading =
        movieLoading || creditsLoading || similarLoading || videosLoading || providersLoading;

    const error =
        movieError || creditsError || similarError || videosError || providersError;

    return {
        movie,
        directors,
        cast,
        similar,
        trailer,
        watchProviders,
        loading,
        error,
        country
    };
}
