import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
} from "@mui/material";

import {
    DashboardOutlined,
    MapsHomeWorkOutlined,
    AccountCircleOutlined,
    PeopleAltOutlined,
    ExpandMore,
    ExpandLess,
    ReceiptLongOutlined,
    SpaOutlined,
    AddCircleOutline,
    ViewListOutlined,
} from '@mui/icons-material';

const menuItems = [
    {
        name: 'Trang chủ',
        icon: <DashboardOutlined />,
        routeName: 'dashboard',
    },
    {
        name: 'Kho',
        icon: <MapsHomeWorkOutlined />,
        routeName: 'warehouses',
    },
    {
        name: 'Nhân sự',
        icon: <AccountCircleOutlined />,
        routeName: 'staffs',
    },
    {
        name: 'Khách hàng',
        icon: <PeopleAltOutlined />,
        routeName: 'customers',
    },
    {
        name: 'Lúa',
        icon: <SpaOutlined />,
        routeName: 'riceplants',
    },
    {
        name: 'Nhập - Xuất',
        icon: <ReceiptLongOutlined />,
        submenu: [
            { name: 'Nhập đơn', icon: <AddCircleOutline />, routeName: 'bills/add', },
            { name: 'Danh sách đơn nhập', icon: <ViewListOutlined />, routeName: 'bills-receive', },
            { name: 'Danh sách đơn xuất', icon: <ViewListOutlined />, routeName: 'bills-dispatch', },
        ]
    },
];

function Sidebar({ sidebarState, toggleSidebar }) {
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(sidebarState);
    const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null);

    useEffect(() => {
        setOpen(sidebarState);
    }, [sidebarState]);

    const handleSubmenuToggle = (index) => {
        setOpenSubmenuIndex(openSubmenuIndex === index ? null : index);
    };

    const handleRedirect = (item, routeName) => {
        if (!item.submenu) {
            navigate(routeName || 'page-not-found');
        }
        else return;
    };

    const SidebarComponent = (
        <Box sx={{ width: 300 }} role="presentation">
            <List>
                {
                    menuItems.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleRedirect(item, item.routeName)}
                        >
                            <ListItem disablePadding>
                                <ListItemButton onClick={item.submenu ? (() => handleSubmenuToggle(index)) : toggleSidebar}>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} />
                                    {item.submenu ? (openSubmenuIndex === index ? <ExpandLess /> : <ExpandMore />) : null}
                                </ListItemButton>
                            </ListItem>
                            {
                                item.submenu && openSubmenuIndex === index && (
                                    <List component="div" style={{ padding: 0, paddingLeft: 15 }}>
                                        {item.submenu.map((subItem, subIndex) => (
                                            <ListItem key={subIndex} disablePadding onClick={() => handleRedirect(subItem, subItem.routeName)}>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        {subItem.icon}
                                                    </ListItemIcon>
                                                    <ListItemText primary={subItem.name} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                )
                            }
                        </div>
                    ))
                }
            </List>
        </Box>
    );

    return (
        <div>
            <Drawer
                open={isOpen}
                onClose={toggleSidebar}
            >
                {SidebarComponent}
            </Drawer>
        </div>
    )
}

export default Sidebar;