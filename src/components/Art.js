import React from "react";
import * as d3 from "d3";

import { Button, Paper } from "@mui/material";
import Link from "../../src/components/Link";

// Styles
import classes from "../styles/Art.module.css";
import theme from "../sup/theme";

const idata = new Array(70)
	.fill(0)
	.map((_, i) => ({ x: i, y: Math.random() * 10 + 1 }));

export const Art = ({ title }) => {
	const boardRef = React.useRef(null);

	const [data, setData] = React.useState(idata);

	const handleRefresh = () => {
		const d = new Array(200)
			.fill(0)
			.map((_, i) => ({ x: i, y: Math.random() * 10 + 1 }));
		setData(d);
	};

	const drawBar = () => {
		// scales
		const xs = d3
			.scaleBand()
			.domain(d3.range(0, data.length))
			.range([0, 270]);

		const ys = d3.scaleLinear().domain([0, 14]).range([0, 270]);

		d3.select(boardRef.current)
			.selectAll("rect")
			.data(data)
			.transition()
			.duration(1000)
			.attr("x", (d) => xs(d.x))
			.attr("y", (d) => ys(d.y))
			.attr("width", xs.bandwidth())
			.attr("height", (d) => 270 - ys(d.y))
			.style("fill", (d) => `hsla(${ys(d.x)},70%, 30%, 1)`);
	};
	const drawSig = () => {};

	const bars = data.map((d) => <rect key={d.x} />);

	React.useEffect(() => {
		console.log({ data });
		drawBar();
	}, [data]);

	return (
		<div className={classes.root}>
			<h1>{title}</h1>
			<Paper sx={{ marginBottom: theme.spacing(8) }}>
				<svg ref={boardRef} className={classes.board}>
					{bars}
				</svg>
			</Paper>
			<Button variant="outlined" onClick={handleRefresh}>
				Refresh
			</Button>
			<Button variant="contained" component={Link} noLinkStyle href="/">
				Go to the main page
			</Button>
		</div>
	);
};
