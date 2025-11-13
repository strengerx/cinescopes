import { useContext } from "react"
import { InfoContext } from "../context/ContecxtProvider";

export default function ChildB() {

    const { number, decrement } = useContext(InfoContext);

    return (<div className="p-6 bg-green-200 dark:bg-gray-700 dark:text-gray-50">
        This Component is ChildB
        <h1 className="text-2xl font-bold">Count: {number}</h1>
        <button
            className="bg-red-500 text-white p-2 rounded"
            onClick={decrement}>Decrement</button>
    </div>)
}
