import { useState } from "react";

export default function Accordian({ collection, title }) {

    const [activeIndex, setActiveIndex] = useState(null);

    return (<div className="w-1/2 mx-auto py-8 grid gap-5">
        <h1 className="text-2xl font-semibold">{title ? title : "Accordian"}</h1>
        {collection.map((item, index) => (
            <div key={item.id} className="border border-gray-300 rounded-lg">
                <div className={`${(index === activeIndex) && "border-b"} border-gray-300 p-4`}>
                    <h2
                        onClick={() => { setActiveIndex((index === activeIndex) ? null : index) }}
                        className="text-lg font-semibold cursor-pointer">
                        {item.title}
                    </h2>
                </div>
                {(activeIndex === index) && (
                    <div className="p-4">
                        <p className="text-gray-700">{item.body}</p>
                    </div>
                )}
            </div>
        ))}
    </div>)
}
