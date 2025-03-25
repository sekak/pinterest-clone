import React, { useState } from "react";
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { apiRequest } from "../../utils/apiRequest";
import { Link, useNavigate } from "react-router";
import useStore from "../../utils/authStore";
import Image from '../image/image';

export default function UserButton() {
    const { currentUser, removeCurrentUser } = useStore()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = async (type?: string) => {
        setAnchorEl(null);
        if (type === 'logout') {
            const res = await apiRequest.post('/users/auth/logout', {});
            removeCurrentUser();
            navigate('/auth/login')
        }
    };

    if (currentUser) {
        return (
            <div className="flex gap-2.5 items-center ml-5">
                <Tooltip title="Profile">
                    <Link to={`/profile/${currentUser.username}`}>
                        <Image media={'/general/noAvatar.png'} className="w-10 h-10 rounded-full cursor-pointer" />
                    </Link>
                </Tooltip>

                <Menu
                    id="simple-menu"
                    aria-labelledby="avatar-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseMenu}
                    keepMounted
                    anchorOrigin={{
                        vertical: 40,
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    PaperProps={{
                        style: {
                            minWidth: 20,
                        },
                    }}
                >
                    <Link to={`/profile/${currentUser.username}`}><MenuItem onClick={() => handleCloseMenu('profile')}>Profile</MenuItem></Link>
                    <MenuItem onClick={() => handleCloseMenu('account')}>My account</MenuItem>
                    <MenuItem onClick={() => handleCloseMenu('logout')}>Logout</MenuItem>
                </Menu>

                <KeyboardArrowDownIcon
                    className="w-4 h-4 rounded-full cursor-pointer"
                    onClick={handleOpenMenu}
                    aria-controls={open ? "simple-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                />
            </div>
        );
    }

    return (
        <div className="flex ml-2.5 gap-2.5">
            <Link
                to="/auth/login"
                className="cursor-pointer px-4 py-3 rounded-full font-bold transition-colors duration-200 bg-gray-200 hover:bg-gray-300">
                Log in
            </Link>
            <Link
                to="/auth/register"
                className="cursor-pointer px-4 py-3 rounded-full font-bold text-white transition-colors duration-200 bg-red-600 hover:bg-red-700">
                Sign up
            </Link>
        </div>
    );
}