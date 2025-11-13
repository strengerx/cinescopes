import { useState } from "react";

export default function Posts({ title, cities }) {
    const [isActive, setIsActive] = useState(0);

    return (<div className="p-6 flex flex-col gap-4 text-gray-800">
        <h1 className="bg-green-700 text-white font-semibold w-full text-center text-4xl uppercase">
            welcome to {title ? title : "city"}
        </h1>

        <ul className="flex flex-col gap-1.5">
            {cities.map((c, i) => (
                <li
                    onClick={() => {
                        setIsActive(i);
                    }}
                    className={`p-3 text-lg uppercase cursor-pointer ${isActive === i ? "bg-amber-600" : "bg-amber-300"
                        }`}
                    key={c}
                >
                    {c}
                </li>
            ))}
        </ul>
    </div>);
}
