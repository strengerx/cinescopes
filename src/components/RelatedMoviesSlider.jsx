import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { genarateSlug } from "../utilities/commomUtilis";

export default function RelatedMoviesSlider({ similar = [] }) {
    if (!similar?.length) return null;

    return (
        <div className="mt-10 relative">
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
                🎬 Related Movies
            </h3>

            <button
                className="swiper-prev absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-sky-600 text-white rounded-full shadow hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 transition-all duration-300 cursor-pointer"
                aria-label="Previous"
            >
                &#8592;
            </button>
            <button
                className="swiper-next absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-sky-600 text-white rounded-full shadow hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 transition-all duration-300 cursor-pointer"
                aria-label="Next"
            >
                &#8594;
            </button>

            <Swiper
                modules={[Navigation]}
                navigation={{
                    nextEl: ".swiper-next",
                    prevEl: ".swiper-prev",
                }}
                spaceBetween={16}
                loop={true}
                grabCursor={true}
                breakpoints={{
                    320: { slidesPerView: 2 },
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 6 },
                }}
            >
                {similar.slice(0, 20).map((related) => (
                    <SwiperSlide key={related.id}>
                        <Link
                            to={`/explore-movies/${related.id}/${genarateSlug(related.title)}`}
                            className="group hover:opacity-80 transition-all block"
                        >
                            <img
                                className="w-full h-auto rounded-lg shadow object-cover"
                                src={`https://image.tmdb.org/t/p/w500${related.poster_path}`}
                                alt={related.title}
                            />
                            <p className="text-sm mt-2 text-center text-gray-700 dark:text-gray-300 font-medium group-hover:underline">
                                {related.title.length > 20
                                    ? related.title.slice(0, 20) + "…"
                                    : related.title}
                            </p>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
