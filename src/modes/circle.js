const colors = require("../colors");

module.exports = {
	name: "circle",
	run: function() {
		
		let angle = 0;
		let colorIndex = 0;

		setInterval(() => {
			if(angle > 2 * Math.PI) {
				angle = 0;
			}
			let centerX = Math.round(process.stdout.columns / 2);
			let centerY = Math.round(process.stdout.rows / 2);
			let radius = (centerX < centerY ? centerX : centerY);

			// Center the cursor
			process.stdout.write(`\x1b[${centerY};${centerX}f`);
			
			let xOffset = Math.round(Math.sin(angle) * (radius * 2));	// a single terminal space is about twice as tall as wide, so account for that
			let yOffset = Math.round(Math.cos(angle) * radius);
			if(xOffset > 0) {
				process.stdout.write(`\x1b[${xOffset}C`);
			} else {
				process.stdout.write(`\x1b[${xOffset}D`);
			}
			if(yOffset > 0) {
				process.stdout.write(`\x1b[${yOffset}A`);
			} else {
				process.stdout.write(`\x1b[${yOffset}B`);
			}
			process.stdout.write(`${colors[colorIndex % colors.length]}m `);
			
			angle += 0.04;
			colorIndex++;
		}, 3); 
	}
}