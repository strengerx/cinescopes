export default function LoadingUI() {
    return (
        <div className="max-w-6xl py-6 mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-3">
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="animate-pulse space-y-3">
                    <div className="bg-slate-200 dark:bg-slate-800 h-72 w-full rounded-lg" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
                </div>
            ))}
        </div>
    );
}
