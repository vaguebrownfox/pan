import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Tabs } from "../src/components/Tabs";

export default function Index() {
	return (
		<Container maxWidth="sm">
			<Box sx={{ my: 4, border: "0px red solid" }}>
				<Tabs />
			</Box>
		</Container>
	);
}
