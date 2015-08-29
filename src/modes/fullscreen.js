const colors = require("../colors");

function getRowOfColors(rowNumber) {
	let str = "";
	for(let i = 0; i < process.stdout.columns; i++) {
		let color = colors[(i + rowNumber) % colors.length];
		str += `${color}m \x1b[0;m`;
	}
	return str;
}

let running = false;
module.exports = {
	run: function() {
		if(!running) {
			running = true;
			let offset = 0;
			setInterval(() => {
				console.log("\x1b[H");
				for(var i = 0; i < process.stdout.rows - 2; i++) {
					console.log(getRowOfColors(i + offset));
				}
				offset++;
			}, 30);
		}
	},
	name: "fullscreen"
}