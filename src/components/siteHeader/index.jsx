import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "../../contexts/authContext";
import { supabase } from "../../supabase/client";

const styles = {
	title: {
		flexGrow: 1,
	},
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
	const { user, loading } = useAuth();
	const [loggedIn, setLoggedIn] = React.useState(false);
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

	React.useEffect(() => {
		if (!loading) {
			setLoggedIn(user !== null);
		}
	});

	React.useEffect(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange(
			(event, _session) => {
				setLoggedIn(_session !== null);
			}
		);
		return () => {
			authListener.subscription.unsubscribe();
		};
	});

	const menuOptions = [
		{ label: "Home", path: "/" },
		{ label: "Favorites", path: "/movies/favourites" },
		{ label: "Upcoming", path: "/movies/upcoming" },
		{ label: "Top Rated", path: "/movies/toprated" },
		{ label: "TV Shows", path: "/tvshows" },
		{ label: "My Fantasy Movie", path: "/fantasymovie" },
		{ label: "Sign out", path: "logout" },
	];

	const publicMenuOptions = [
		{ label: "Home", path: "/" },
		{ label: "TV Shows", path: "/tvshows" },
		{ label: "Login", path: "/login" },
	];

	const handleMenuSelect = (pageURL) => {
		if (pageURL === "logout") {
			handleLogout();
		} else {
			navigate(pageURL);
		}
	};

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const { auth, signOut } = useAuth();

	const handleLogout = async (e) => {
		try {
			setAnchorEl(null);
			await signOut();
		} catch (error) {
			console.log(error);
		}
		navigate("/login");
	};

	return (
		<>
			<AppBar position="fixed" elevation={0} color="primary">
				<Toolbar>
					<Typography variant="h4" sx={styles.title}>
						TMDB Client
					</Typography>
					{loggedIn ? (
						isMobile ? (
							<>
								<IconButton
									aria-label="menu"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleMenu}
									color="inherit"
									size="large"
								>
									<MenuIcon />
								</IconButton>
								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={open}
									onClose={() => setAnchorEl(null)}
								>
									{menuOptions.map((opt) => (
										<MenuItem
											key={opt.label}
											onClick={() => handleMenuSelect(opt.path)}
										>
											{opt.label}
										</MenuItem>
									))}
								</Menu>
							</>
						) : (
							<>
								{menuOptions.map((opt) => (
									<Button
										key={opt.label}
										color="inherit"
										onClick={() => handleMenuSelect(opt.path)}
									>
										{opt.label}
									</Button>
								))}
							</>
						)
					) : (
						<>
							{publicMenuOptions.map((opt) => (
								<Button
									key={opt.label}
									color="inherit"
									onClick={() => handleMenuSelect(opt.path)}
								>
									{opt.label}
								</Button>
							))}
						</>
					)}
				</Toolbar>
			</AppBar>
			<Offset />
		</>
	);
};

export default SiteHeader;
