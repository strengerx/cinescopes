import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import BaseLoadingUI from "./components/BaseLoadingUI";
import { useTheme } from "./context/ContecxtProvider";
import { FiSun, FiMoon } from "react-icons/fi";

const Movies = lazy(() => import("./pages/Movies"));
const Welcome = lazy(() => import("./pages/Welcome"));
const DraftMovieDetails = lazy(() => import("./draftpages/DraftMovieDetails"));
const WeatherApp = lazy(() => import("./draftpages/WeatherApp"));

function App() {
	const { theme, toggleTheme } = useTheme();

	return (
		<div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white transition-colors duration-300">
			<button
				onClick={toggleTheme}
				className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition-colors duration-300
					bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700
					text-gray-800 dark:text-gray-100"
			>
				{theme === "dark" ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
				<span className="hidden sm:inline text-sm font-medium">
					{theme === "dark" ? "Light" : "Dark"}
				</span>
			</button>

			<Suspense fallback={<BaseLoadingUI />}>
				<Routes>
					<Route path="/" element={<Welcome />} />
					<Route path="/explore-movies" element={<Movies />} />
					<Route path="/explore-movies/:movieid/:movietitle" element={<DraftMovieDetails />} />
					<Route path="/weather" element={<WeatherApp />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</div>
	);
}

export default App;
