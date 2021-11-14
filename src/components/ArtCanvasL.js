import React from "react";

import { Button, Slider } from "@mui/material";
import Link from "./Link";

const height = 1080;
const width = 1080;

// Styles
import classes from "../styles/Art.module.css";

export const ArtCanvasL = ({ title }) => {
	const boardRef = React.useRef(null);

	const draw = (ctx, frameCount, dot) => {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		// Bounce off the walls.
		if (dot.px[0] < 0 || dot.px[0] > width) dot.vx *= -1;
		if (dot.py[0] < 0 || dot.py[0] > height) dot.vy *= -1;

		ctx.fillStyle = "#FFAB4C";
		ctx.beginPath();
		ctx.arc(
			(dot.px[0] += dot.vx),
			(dot.py[0] += dot.vy),
			20,
			0,
			2 * Math.PI
		);
		ctx.fill();
		ctx.beginPath();
		ctx.fillStyle = "#FF5F7E";
		ctx.ellipse(
			height / 2,
			height / 2,
			10,
			20,
			0,
			-0.21 * Math.PI,
			1.21 * Math.PI
		);
		// ctx.arc(
		// 	(dot.px[1] += dot.vx),
		// 	(dot.py[1] += dot.vy),
		// 	20,
		// 	0,
		// 	2 * Math.PI
		// );
		ctx.fill();
	};

	React.useEffect(() => {
		// effect
		const canvas = boardRef.current;
		const context = canvas.getContext("2d");
		context.lineJoin = "round";
		context.lineCap = "round";

		const dot = {
			px: [0, 9],
			py: [0, 9],

			vx: 1,
			vy: 1,
		};

		let frameCount = 0;
		let animationFrameId;
		const render = () => {
			frameCount++;
			draw(context, frameCount, dot);
			animationFrameId = window.requestAnimationFrame(render);
		};
		render();

		return () => {
			window.cancelAnimationFrame(animationFrameId);
		};
	}, [draw]);

	return (
		<div className={classes.root}>
			<h1>{title}</h1>
			<div className={classes.boardCon}>
				<canvas
					ref={boardRef}
					height={height}
					width={width}
					className={classes.board}
				/>
			</div>

			<Button variant="text" component={Link} noLinkStyle href="/">
				Go to the main page
			</Button>
		</div>
	);
};
