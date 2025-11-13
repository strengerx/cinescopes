import { useState, useEffect } from "react";
import Accordian from "./Accordian";

export default function FetchData() {
    const [collection, setCollection] = useState(null); // state - null
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/posts"
                );
                const data = await response.json();
                setCollection(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    if (loading) {
        return (
            <p className="py-20 text-xl text-green-800 text-center">Loading...</p>
        );
    }

    return (<>
        {collection && collection?.length > 0 ? (
            <Accordian title={"POSTS"} collection={collection} />
        ) : (
            <p className="py-20 text-xl text-green-800 text-center">
                no posts found!
            </p>
        )}
    </>);
}
