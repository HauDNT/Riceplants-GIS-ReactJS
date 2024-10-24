import React, { useState } from "react";
import { useNavigate, Outlet } from 'react-router-dom';
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function Home() {
    const [openSidebar, setOpenSidebar] = useState(false);

    const toggleSidebar = () => {
        setOpenSidebar(!openSidebar);
    };

    return (
        <div>
            <Sidebar sidebarState={openSidebar} toggleSidebar={toggleSidebar}/>
            <Navbar toggleSidebar={toggleSidebar} />
            <Outlet />
        </div>
    )
}

export default Home;