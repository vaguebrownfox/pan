import React from "react";
import { Grid, Paper } from "@mui/material";
import Link from "./Link";

export const Tabs = () => {
	return (
		<Grid item xs={12}>
			<Grid container justifyContent="space-between" spacing={2}>
				{[0, 1, 2].map((value) => (
					<Grid key={value} item>
						<Link href="/art/poles">
							<Paper sx={{ height: 140, width: 140 }} />
						</Link>
					</Grid>
				))}
			</Grid>
		</Grid>
	);
};
