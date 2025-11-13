import { useEffect, useState } from "react";
const BASE_API_URL = import.meta.env.VITE_JSON_API;

export default function useJsonPlaceholdersAPI(endpoint) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); setError(null); setData(null);
            try {
                const response = await fetch(`${BASE_API_URL}${endpoint}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setData(data);
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
