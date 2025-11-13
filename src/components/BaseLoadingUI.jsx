export default function BaseLoadingUI() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
            <div
                className="w-12 h-12 border-4 border-red-600 dark:border-red-500 border-t-transparent border-solid rounded-full animate-spin"
                aria-label="Loading spinner"
            />
        </div>
    );
}
