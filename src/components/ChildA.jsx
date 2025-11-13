import { useContext } from "react";
import ChildB from "./ChildB";
import { InfoContext } from "../context/ContecxtProvider";

export default function ChildA() {

    const { number, increment } = useContext(InfoContext);

    return (<div
        className="p-10 bg-amber-300 dark:bg-gray-800 dark:text-gray-50">
        This Component is ChildA
        <h1 className="text-2xl font-bold">Count: {number}</h1>
        <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={increment}>Increment</button>

        <ChildB />
    </div>)
}
