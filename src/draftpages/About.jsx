import { useState } from "react";

function About() {

    const [count, setCount] = useState(0);

    return (<>
        <h1
            className="bg-yellow-300 text-red-600 p-3 text-center text-3xl uppercase">
            the number is: {count}
        </h1>

        <button
            onClick={() => { setCount(count - 1) }}
            className="border p-3 cursor-pointer bg-amber-300 text-red-500">desc</button>

        <button
            onClick={() => { setCount(count + 1) }}
            className="border p-3 cursor-pointer bg-amber-300 text-red-500">inc</button>

    </>)
}

export default About