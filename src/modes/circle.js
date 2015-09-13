const colors = require("../colors");
const pos = require("cli-position");

module.exports = {
	name: "circle",
	run: function() {
		let angle = 0;
		let colorIndex = 0;

		setInterval(() => {
			if (angle > 2 * Math.PI) {
				angle = 0;
			}
			let centerX = Math.round(pos.columns() / 2);
			let centerY = Math.round(pos.rows() / 2);
			let radius = (centerX < centerY ? centerX : centerY);

			// Center the cursor
			pos.center();

			let xOffset = Math.round(Math.sin(angle) * (radius * 2));	// a single terminal space is about twice as tall as wide, so account for that
			let yOffset = Math.round(Math.cos(angle) * radius);

			pos.moveLeft(xOffset).moveUp(yOffset);

			process.stdout.write(`${colors[colorIndex % colors.length]} `);

			angle += 0.04;
			colorIndex++;
		}, 3);
	}
};
