import { Link, Outlet } from "react-router-dom";
import useJsonPlaceholdersAPI from "../hooks/useJsonPlaceholdersAPI";

export default function Users() {

    const { data: users, loading, error } = useJsonPlaceholdersAPI("/users");

    if (loading) {
        return <div className="text-center bg-amber-100 text-gray-800 text-2xl py-6">Loading...</div>
    }
    if (error) {
        return <div className="text-center bg-amber-100 text-red-800 text-2xl py-6">{error}</div>
    }

    return (<>
        {users && (<>
            <h2 className="text-xl text-gray-800 bg-amber-100">users</h2>
            <div className="flex flex-wrap gap-5 py-20 px-10 bg-amber-100">

                {users.map((user) => (
                    <Link to={`/users/${user.id}`} key={user.id} className="bg-amber-300 shadow-md rounded-lg p-5 flex-auto">
                        <p className="text-xl font-bold">{user.name}</p>
                    </Link>
                ))}
            </div>
        </>)}

        <Outlet />
    </>)
}
