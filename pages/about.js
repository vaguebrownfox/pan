import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ProTip from "../src/components/ProTip";
import Link from "../src/components/Link";
import Copyright from "../src/components/Copyright";
import Head from "next/head";

export default function About() {
	return (
		<Container id="rootContainer" maxWidth="sm">
			<Head>
				<title>About</title>
				<meta
					name="viewport"
					content="initial-scale=1, width=device-width"
				/>
			</Head>
			<Box id="rootBox" sx={{ my: 4 }}>
				<Typography variant="h4" component="h1" gutterBottom>
					Next.js v5 example
				</Typography>
				<Button
					variant="contained"
					component={Link}
					noLinkStyle
					href="/"
				>
					Go to the main page
				</Button>
				<ProTip />
				<Copyright />
			</Box>
		</Container>
	);
}
