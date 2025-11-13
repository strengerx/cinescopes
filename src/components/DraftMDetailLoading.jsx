export default function DraftMDetailLoading() {
    return (<div className="w-full dark:bg-slate-800 min-h-svh">
        <div className="max-w-6xl py-10 px-4 mx-auto flex flex-col gap-10 ">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10">
                <div className="w-full h-[500px] rounded-xl shadow-lg animate-pulse dark:bg-slate-700  bg-slate-200 "></div>

                <div className="flex gap-6 flex-col">
                    <div className="min-w-96 h-10 animate-pulse bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                    <div className="w-full h-5 animate-pulse bg-slate-200 dark:bg-slate-700 rounded"></div>
                    <div className="w-full h-20 animate-pulse bg-slate-200 dark:bg-slate-700 rounded"></div>

                    <div className="flex flex-wrap gap-3 mt-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-8 w-20 animate-pulse bg-slate-200 dark:bg-slate-700 rounded-full"
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>);
}
