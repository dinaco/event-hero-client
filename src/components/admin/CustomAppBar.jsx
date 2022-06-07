import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { AppBar } from "react-admin";
import {
  Typography,
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

const CustomAppBar = (props) => {
  const { user, logoutUser } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

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
    <AppBar
      sx={{
        "& .RaAppBar-title": {
          flex: 1,
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
        },
      }}
      {...props}>
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
      <Typography variant='h6' color='inherit' id='react-admin-title' />
      <Box mx={2} sx={{ flexGrow: 0 }}>
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
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}>
          <MenuItem onClick={logoutUser}>
            <PowerSettingsNewIcon fontSize='small' sx={{ mr: 1 }} />
            <Typography textAlign='center'>Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </AppBar>
  );
};

export default CustomAppBar;
