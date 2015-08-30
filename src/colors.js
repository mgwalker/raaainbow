const x256 = require("x256");
const distinctColors = new Set();
const colors = [ ];

for(let i = 0; i < 256; i++) {
	const color = x256(255, i, 0);
	if(!distinctColors.has(color)) {
		distinctColors.add(color);
		colors.push(color);
	}
}

for(let i = 255; i >= 0; i--) {
	const color = x256(i, 255, 0);
	if(!distinctColors.has(color)) {
		distinctColors.add(color);
		colors.push(color);
	}
}

for(let i = 0; i < 256; i++) {
	const color = x256(0, 255, i);
	if(!distinctColors.has(color)) {
		distinctColors.add(color);
		colors.push(color);
	}
}

for(let i = 255; i >= 0; i--) {
	const color = x256(0, i, 255);
	if(!distinctColors.has(color)) {
		distinctColors.add(color);
		colors.push(color);
	}
}

for(let i = 0; i < 256; i++) {
	const color = x256(i, 0, 255);
	if(!distinctColors.has(color)) {
		distinctColors.add(color);
		colors.push(color);
	}
}

for(let i = 255; i >= 0; i--) {
	const color = x256(255, 0, i);
	if(!distinctColors.has(color)) {
		distinctColors.add(color);
		colors.push(color);
	}
}

const ansiColors = colors.map(c => `\x1b[48;5;${c}m`);

module.exports = ansiColors;