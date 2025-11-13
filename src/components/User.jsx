import { useParams } from "react-router-dom"
import useJsonPlaceholdersAPI from "../hooks/useJsonPlaceholdersAPI";

export default function User() {

    const { id } = useParams();

    const { data: user, loading, error } = useJsonPlaceholdersAPI(`/users/${id}`);

    if (loading) {
        return <div className="text-center bg-amber-100 text-gray-800 text-2xl py-6">Loading...</div>
    }
    if (error) {
        return <div className="text-center bg-amber-100 text-red-800 text-2xl py-6">{error}</div>
    }

    if (!user) {
        return <div className="text-center bg-amber-100 text-red-800 text-2xl py-6">User not found</div>
    }

    return (<div className='p-10 bg-green-100'>
        <h1 className='text-2xl text-center bg-amber-100'>spesific user info</h1>
        <div className="flex flex-col gap-5 py-20 px-10 bg-amber-100">
            <div className="bg-amber-300 shadow-md rounded-lg p-5 flex-auto">
                <p className="text-xl font-bold">{user.name}</p>
                <p className="text-gray-800">{user.email}</p>
                <p className="text-gray-800">{user.phone}</p>
                <p className="text-gray-800">{user.website}</p>
            </div>
        </div>
    </div>)
}
