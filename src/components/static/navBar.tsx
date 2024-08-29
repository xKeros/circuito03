import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const NavBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="home" component="a" href="/">
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Application
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<AddCircleOutlineIcon />}
            component="a"
            href="/new-post"
          >
            New Post
          </Button>
          <Button color="inherit" component="a" href="/profile">
            Profile
          </Button>
          <Button color="inherit" component="a" href="/most-recent">
            Most Recent
          </Button>
          <Button color="inherit" component="a" href="/follow">
            Follow
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
