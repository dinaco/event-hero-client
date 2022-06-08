import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

function Navbar() {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate();

  const customLogoutUser = () => {
    logoutUser();
    navigate("/");
  };

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
  return (
    <AppBar position='static' sx={{ mb: 2 }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <Tooltip title='Open menu'>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'>
                <MenuIcon />
              </IconButton>
            </Tooltip>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={anchorElNav}
              onClose={handleCloseNavMenu}
              sx={{
                display: "block",
              }}>
              <div>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to='/events'>
                    <Typography textAlign='center'>All Events</Typography>
                  </Link>
                </MenuItem>
              </div>

              {!isLoggedIn && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to='/'>
                    <Typography textAlign='center'>Login</Typography>
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </Box>

          <LocalFireDepartmentIcon sx={{ display: "flex", mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            sx={{
              mr: 2,
              display: "flex",
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
            }}>
            EVENT HERO
          </Typography>
          {isLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.name} src={user.profileImg} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={anchorElUser}
                onClose={handleCloseUserMenu}>
                {isLoggedIn && (
                  <>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to='/my-account'>
                        <Typography textAlign='center'>My Account</Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to='/profile'>
                        <Typography textAlign='center'>Profile</Typography>
                      </Link>
                    </MenuItem>
                  </>
                )}
                {isLoggedIn && user.role === "customer" && (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link to='/add-balance'>
                      <Typography textAlign='center'>Add Balance</Typography>
                    </Link>
                  </MenuItem>
                )}
                <MenuItem onClick={customLogoutUser}>
                  <Typography textAlign='center'>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
