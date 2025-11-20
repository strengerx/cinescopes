import { useState, useEffect, useRef } from 'react';

const BASE_API_URL = import.meta.env.VITE_TMDB_BASE_URI;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
    }
};

export default function useTMDBAPI(endpoint) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const currentEndpointRef = useRef(endpoint);

    useEffect(() => {
        if (!endpoint) { setLoading(false); setError(null); setData(null); return; }

        currentEndpointRef.current = endpoint;

        const controller = new AbortController();
        const { signal } = controller;

        const fetchData = async () => {
            setLoading(true); setError(null); setData(null);

            try {
                const response = await fetch(`${BASE_API_URL}${endpoint}`, { ...options, signal });

                if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }

                const result = await response.json();

                if (currentEndpointRef.current === endpoint) {
                    setData(result?.results || result);
                    setError(null);
                }
            } catch (err) {
                if (err.name === 'AbortError') return;

                if (currentEndpointRef.current === endpoint) {
                    setError(err.message);
                    setData(null);
                }
            } finally {
                if (currentEndpointRef.current === endpoint) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => { controller.abort(); }
    }, [endpoint]);

    return { data, loading, error };
}
