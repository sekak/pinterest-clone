import React, { useState } from "react";
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function UserButton() {
    const isUserLoggedIn = true;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    if (isUserLoggedIn) {
        return (
            <div className="flex gap-2.5 items-center ml-5">
                <Tooltip title="Account settings">
                    <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        className="cursor-pointer"
                    />
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
                    <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                    <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
                    <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
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
        <div className="flex gap-2.5">
            <button className="bg-blue-500 text-white p-1.5 rounded-md">Log In</button>
            <button className="bg-blue-500 text-white p-1.5 rounded-md">Sign Up</button>
        </div>
    );
}