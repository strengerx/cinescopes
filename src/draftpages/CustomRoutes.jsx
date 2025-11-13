import Link, { Route, Routes } from "react-router-dom"
import Users from "./Users"
import User from "../components/User"
import Blogs from "./Blogs"
import WeatherApp from "./WeatherApp"

export default function CustomRoutes() {
    return (<>
        <div className='p-10 text-center text-2xl bg-amber-100 flex gap-6'>
            <Link to="/">Home</Link>
            <Link to="/users">Users</Link>
            <Link to="/blogs">Blogs</Link>
            <Link to="/weather">Weather</Link>
        </div>

        <Routes>
            <Route path="/" element={<h1>this is home component</h1>} />

            <Route path='/users' element={<Users />}>
                <Route path=":id" element={<User />} />
            </Route>

            <Route path="/blogs" element={<Blogs />} />
            <Route path="/weather" element={<WeatherApp />} />
            <Route path="*" element={<h1>this is 404 page</h1>} />
        </Routes>

        <h1 className='p-10 text-center text-2xl bg-amber-100'>this is footer</h1>
    </>)
}
