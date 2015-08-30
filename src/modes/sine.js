const pos = require("cli-position");
const colors = require("../colors");

function scale(inRange, outRange) {
	const inDelta = inRange[1] - inRange[0];
	const outDelta = outRange[1] - outRange[0];
	
	return function(val) {
		return (((val - inRange[0]) / inDelta) * outDelta) + outRange[0];//((val / inDelta) * outDelta) + outRange[0];
	}
};

module.exports = {
	name: "sine",
	run: function() {
		pos.center();
		
		setTimeout(() => {
			const columns = pos.columns();
			const yTop = pos.rows() / 3;
			const yCenter = pos.rows() / 2;
			
			const xScale = scale([0, columns], [0, 4 * Math.PI]);
			
			for(let x = 0; x < columns; x++) {
				let y = Math.round((Math.sin(xScale(x)) * yTop) + yCenter);
				pos.moveTo(x, y);
				process.stdout.write(`${colors[x % colors.length]} `);
			}
		}, 100);
	}
};