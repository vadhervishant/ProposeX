// Author: Monil Hitesh Andharia (B00884813)

import React from "react";
import { Route, Routes } from 'react-router-dom';
import Login from "../components/user/Login";
import Registration from "../components/user/Registration";
import Logout from "../components/user/Logout";
import ForgotPassword from "../components/user/ForgotPassword";
import LandingPage from "../components/common/LandingPage";
import UserDashboard from "../components/user/UserDashboard";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={< LandingPage />} />
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/Register" element={<Registration />}></Route>
            <Route path="/ForgotPassword" element={<ForgotPassword />}></Route>
            <Route path="/Logout" element={<Logout />}></Route>
            <Route path="/UserDashboard" element={<UserDashboard />} />
            


        </Routes>
    );
};

export default AppRoutes;