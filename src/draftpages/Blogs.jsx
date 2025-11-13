import useJsonPlaceholdersAPI from "../hooks/useJsonPlaceholdersAPI"

export default function Blogs() {

    const { data: blogs, loading, error } = useJsonPlaceholdersAPI("/posts");

    if (loading) {
        return <div className="text-center bg-amber-100 text-gray-800 text-2xl py-6">Loading...</div>
    }
    if (error) {
        return <div className="text-center bg-amber-100 text-red-800 text-2xl py-6">{error}</div>
    }

    return (<>
        {blogs && (<>
            <h2 className="text-xl text-gray-800 bg-amber-100">blogs</h2>
            <div className="flex flex-wrap gap-5 py-20 px-10 bg-amber-100">

                {blogs.map((blog) => (
                    <div key={blog.id} className="bg-amber-300 shadow-md rounded-lg p-5 flex-auto">
                        <p className="text-xl font-bold">{blog.title}</p>
                    </div>
                ))}
            </div>
        </>)}
    </>)
}
