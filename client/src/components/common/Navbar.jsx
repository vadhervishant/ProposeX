import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Divider, ListItemIcon, ListItemText } from '@mui/material';
import { Settings, Movie, MusicNote, Book, WatchLater, Timeline, Diversity1, Login, PersonAdd, Logout, AdminPanelSettings, Home } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';

const appName = "ProposeX";
const appNameShort = "CN";
const pages = [/* { text: 'Contact', route: 'Contact' }, { text: 'About', route: 'About' } */];
const settings_logged_in = 
[{ text: 'Logout', icon: Logout, route: 'Logout' }];
const settings_logged_out = 
[{ text: 'Login', icon: Login, route: 'Login' }, { text: 'Register', icon: PersonAdd, route: 'Register' }];

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleChange = (event) => {
        // setAuth(event.target.checked);
        if (localStorage.getItem('token')) {
            navigator("UserDashboard");
        } else {
            navigator("");
        }
    };

    const [enteredText, setEnteredText] = useState("");

    const textChangeHandler = (event) => {
        setEnteredText(event.target.value);
    };

    const navigate = useNavigate();

    const navigator = (page) => {
        if (!page) {
            localStorage.clear();
        }
        navigate("/" + page);
    };

    function handleClick() {
        navigate("/search", { state: enteredText });
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color="primary" position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {appName}
                        </Typography>


                        {localStorage.getItem('token') && (<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.text} onClick={() => navigator(page.route)}>
                                        <Typography textAlign="center">{page.text}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>)}
                        <Typography
                            variant="h5"
                            // noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {appNameShort}
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', marginLeft: 40 } }}>
                            {localStorage.getItem('token') && (pages.map((page) => (
                                <Button
                                    key={page.text}
                                    onClick={() => navigator(page.route)}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.text}
                                </Button>
                            )))}
                        </Box>
                        {localStorage.getItem('token') && (<Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleClick();
                                    }
                                }}
                                onChange={textChangeHandler}
                                value={enteredText}
                            />
                        </Search>)}

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip color="secondary" title={localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).firstName}>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={localStorage.getItem('token') ? JSON.parse(localStorage.getItem('user')).firstName.toUpperCase() : ""} src={localStorage.getItem('token') ? "/static/images/avatar/2.jpg" : ""} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {localStorage.getItem('token') ? settings_logged_in.map((setting) => (
                                    Object.keys(setting).length !== 0 ?
                                        <MenuItem key={setting.text} onClick={() => { navigator(setting.route); setAnchorElUser(null); }}  >
                                            <ListItemIcon>
                                                <setting.icon color="secondary" fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText textAlign="center">{setting.text}</ListItemText>
                                        </MenuItem> : <Divider />
                                )) : settings_logged_out.map((setting) => (
                                    Object.keys(setting).length !== 0 ?
                                        <MenuItem key={setting.text} onClick={() => {
                                            navigator(setting.route); setAnchorElUser(null);
                                        }}>
                                            <ListItemIcon>
                                                <setting.icon color="secondary" fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText textAlign="center">{setting.text}</ListItemText>
                                        </MenuItem> : <Divider />
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}
export default Navbar;