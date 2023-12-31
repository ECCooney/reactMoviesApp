import React, { useState } from "react";
import Header from "../headerTvShowList";
import FilterCard from "../filterTvShowsCard";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import TvShowList from "../tvShowList";

const styles = {
	root: {
		padding: "20px",
	},
	fab: {
		marginTop: 8,
		position: "fixed",
		top: 2,
		right: 2,
	},
};

function TvShowListPageTemplate({ tvShows, name, action }) {
	const [nameFilter, setNameFilter] = useState("");
	const [genreFilter, setGenreFilter] = useState("0");
	const [drawerOpen, setDrawerOpen] = useState(false);

	const genreId = Number(genreFilter);

	let displayedTvShows = tvShows
		.filter((t) => {
			return t.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
		})
		.filter((t) => {
			return genreId > 0 ? t.genre_ids.includes(genreId) : true;
		});

	const handleChange = (type, value) => {
		if (type === "title") setNameFilter(value);
		else setGenreFilter(value);
	};

	return (
		<>
			<Grid container sx={styles.root}>
				<Grid item xs={12}>
					<Header name={name} />
				</Grid>
				<Grid item container spacing={5}>
					<TvShowList action={action} tvShows={displayedTvShows} />
				</Grid>
			</Grid>
			<Fab
				color="secondary"
				variant="extended"
				onClick={() => setDrawerOpen(true)}
				sx={styles.fab}
			>
				Filter
			</Fab>
			<Drawer
				anchor="left"
				open={drawerOpen}
				onClose={() => setDrawerOpen(false)}
			>
				<FilterCard
					onUserInput={handleChange}
					nameFilter={nameFilter}
					genreFilter={genreFilter}
				/>
			</Drawer>
		</>
	);
}
export default TvShowListPageTemplate;
