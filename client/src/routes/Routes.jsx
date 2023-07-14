import React from "react";
import { Route, Routes } from 'react-router-dom';
import Login from "../components/user/Login";
import Registration from "../components/user/Registration";
import Logout from "../components/user/Logout";
import ForgotPassword from "../components/user/ForgotPassword";
import LandingPage from "../components/common/LandingPage";
import UserDashboard from "../components/user/UserDashboard";
import AboutUs from "../components/misc/AboutUs";
import ContactUs from "../components/misc/ContactUs";
import Dashboard from "../components/dashboard";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={< LandingPage />} />
            <Route path="/dashboard" element={< Dashboard />} />

            <Route path="/Login" element={<Login />}></Route>
            <Route path="/Register" element={<Registration />}></Route>
            <Route path="/ForgotPassword" element={<ForgotPassword />}></Route>
            <Route path="/Logout" element={<Logout />}></Route>
            <Route path="/UserDashboard" element={<UserDashboard />} />
            <Route path="/About" element={<AboutUs/>} />
            <Route path="/Contact" element={<ContactUs/>} />
        </Routes>
    );
};

export default AppRoutes;