import { Link } from "react-router-dom";

export default function ErrorUI({ message = "Something went wrong!" }) {
    return (
        <div className="w-full h-svh flex justify-center items-center flex-col gap-4 text-center">
            <h2 className="text-2xl font-semibold text-red-600">⚠️ Error</h2>
            <p className="text-slate-600">{message}</p>
            <Link
                to="/explore-movies"
                className="text-sm text-blue-600 underline hover:text-blue-800 transition"
            >
                ← Back to Movies
            </Link>
        </div>
    );
}
