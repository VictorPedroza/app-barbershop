import { Routes, Route } from "react-router-dom";

import { Home } from "./Home/Home";

export const AppRoutes = () => {
    return(
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </main>
    )
}