import { useState, useEffect } from 'react';
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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); setError(null); setData(null);
            try {
                const response = await fetch(`${BASE_API_URL}${endpoint}`, options);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setData(data?.results || data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [endpoint]);

    return ({ data, loading, error })
}
