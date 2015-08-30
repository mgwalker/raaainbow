const pos = require("cli-position");
const colors = require("../colors");
const scale = require("linear-scale");

module.exports = {
	name: "sine",
	run: function() {
		pos.center();
		
		let xOffset = 0;
		setInterval(() => {
			const columns = pos.columns();
			const yTop = pos.rows() / 3;
			const yCenter = pos.rows() / 2;
			
			const xScale = scale([0, columns], [0, 4 * Math.PI]);
			
			// Clear the screen, because that's easier than
			// erasing the previous line
			console.log('`\x1b[m\x1b[2J');
			
			for(let x = 0; x < columns; x++) {
				let y = Math.round((Math.sin(xScale(x + xOffset)) * yTop) + yCenter);
				pos.moveTo(x, y);
				process.stdout.write(`${colors[x % colors.length]} `);
			}
			xOffset++;
		}, 20);
	}
};