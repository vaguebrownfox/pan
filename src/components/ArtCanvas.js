import React from "react";

import { Button, Slider } from "@mui/material";
import Link from "./Link";

const height = 1080;
const width = 1080;

// Styles
import classes from "../styles/Art.module.css";
import theme from "../sup/theme";

export const ArtCanvas = ({ title }) => {
	const boardRef = React.useRef(null);

	const [nf, setNf] = React.useState(1);
	const [poles, setPoles] = React.useState([]);

	const handleAddPoles = () => {
		const n = nf < 50 ? nf + 1 : nf - 1;

		setNf(n);
	};

	const drawPoles = (ctx, tadpoles) => {
		ctx.clearRect(0, 0, width, height);

		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, height, width);

		for (const t of tadpoles) {
			let dx = t.vx;
			let dy = t.vy;
			const mtail = t.px.length;

			t.px[0] += dx;
			t.py[0] += dy;

			let x = t.px[0];
			let y = t.py[0];

			let speed = Math.sqrt(dx * dx + dy * dy);

			const count = speed * 8; // increasing value for sine function wiggle
			const k1 = -5 - speed / 3; // length of tail segs

			// Bounce off the walls.
			if (x < 0 || x > width) t.vx *= -1;
			if (y < 0 || y > height) t.vy *= -1;

			// Swim!
			for (var j = 1; j < mtail; ++j) {
				const vx = x - t.px[j];
				const vy = y - t.py[j];
				const k2 = Math.cos(((t.count += count) + j * 3) / 600) / speed;
				t.px[j] = (x += (dx / speed) * k1) - dy * k2;
				t.py[j] = (y += (dy / speed) * k1) + dx * k2;
				speed = Math.sqrt((dx = vx) * dx + (dy = vy) * dy);
			}

			// Head
			ctx.fillStyle = `hsla(${
				270 * Math.cos(t.count * 0.00005)
			}, 100%, 65%, 1)`;
			ctx.save();
			ctx.translate(t.px[0], t.py[0]);
			ctx.rotate(Math.atan2(t.vy, t.vx) - Math.PI / 2);
			ctx.beginPath();
			ctx.ellipse(0, 0, 4, 16, 0, 0, Math.PI);
			ctx.fill();
			ctx.restore();

			// Body
			ctx.beginPath();
			ctx.moveTo(t.px[0], t.py[0]);
			for (let i = 1; i < 2; ++i) ctx.lineTo(t.px[i], t.py[i]);
			ctx.lineWidth = 0;
			ctx.stroke();

			// Tail
			const inv = t.vx / t.vy < 0 ? 1 : -1;
			ctx.beginPath();
			for (let i = 1; i < mtail; ++i) {
				ctx.strokeStyle = `hsla(${
					inv * 270 * (i / mtail - 1) * (i / mtail - 1)
				}, 100%, 65%, 1)`;
				ctx.moveTo(t.px[i - 1], t.py[i - 1]);

				ctx.lineTo(t.px[i], t.py[i]);
				ctx.lineWidth = 8 * (i / mtail - 1) * (i / mtail - 1);

				ctx.stroke();
			}
		}
	};

	React.useEffect(() => {
		const m = 20;
		const v = 3;

		const pole = {
			vx: (Math.random() - 0.5) * v,
			vy: (Math.random() - 0.5) * v,
			px: new Array(m).fill(Math.random() * width),
			py: new Array(m).fill(Math.random() * height),
			count: 0,
		};

		setPoles([...poles, pole]);
	}, [nf]);

	React.useEffect(() => {
		const canvas = boardRef.current;
		const context = canvas.getContext("2d");
		context.lineJoin = "round";
		context.lineCap = "round";

		let frameCount = 0;
		let animationFrameId = null;
		if (animationFrameId) {
			window.cancelAnimationFrame(animationFrameId);
		}
		const render = () => {
			frameCount++;
			drawPoles(context, poles);
			animationFrameId = window.requestAnimationFrame(render);
		};
		render();

		return () => {
			window.cancelAnimationFrame(animationFrameId);
		};
	}, [drawPoles]);

	return (
		<div className={classes.root}>
			<h1>{title}</h1>
			<div className={classes.boardCon} onClick={handleAddPoles}>
				<canvas
					ref={boardRef}
					height={height}
					width={width}
					className={classes.board}
				/>
			</div>

			<Button
				sx={{ margin: theme.spacing(4) }}
				variant="text"
				component={Link}
				noLinkStyle
				href="/"
			>
				Go to the main page
			</Button>
		</div>
	);
};
