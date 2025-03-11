import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import App from "../App.tsx";
import Main from "../../pages/Main/Main.tsx";
import Register from "../../pages/Register/Register.tsx";
import Login from "../../pages/Login/Login.tsx";
import Profile from "../../pages/Profile/Profile.tsx";
import ErrorPage from "../../pages/ErrorPage/ErrorPage.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />} errorElement={<ErrorPage />}>
            <Route index={true} element={<Main />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
        </Route>
    )
)

export default router;