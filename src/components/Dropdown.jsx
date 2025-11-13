import { useState } from "react";

export default function Dropdown({ label, items }) {

    const [active, setActive] = useState(false);

    return (<div className="w-fit relative">
        <p onClick={() => (setActive(!active))} className="text-lg cursor-pointer">{label}</p>
        {active && (
            <div className="absolute bg-white border border-gray-300 rounded-lg shadow-md min-w-36">
                <ul>
                    {items.map((item, index) => (
                        <li key={index} className="p-2 hover:bg-gray-100">{item}</li>
                    ))}
                </ul>
            </div>
        )}
    </div>)
}
