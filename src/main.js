#!/usr/bin/env node

const x256 = require("x256");

const distinctColors = new Set();
const colors = [ ];

for(let i = 0; i < 256; i++) {
	const color = x256(255, i, 0);
	if(!distinctColors.has(color)) {
		distinctColors.add(color);
		colors.push(color);
		//console.log(`\x1b[48;5;${color}m     \x1b[0;m`);
	}
}

for(let i = 255; i >= 0; i--) {
	const color = x256(i, 255, 0);
	if(!distinctColors.has(color)) {
		distinctColors.add(color);
		colors.push(color);
		//console.log(`\x1b[48;5;${color}m     \x1b[0;m`);
	}
}

for(let i = 0; i < 256; i++) {
	const color = x256(0, 255, i);
	if(!distinctColors.has(color)) {
		distinctColors.add(color);
		colors.push(color);
		//console.log(`\x1b[48;5;${color}m     \x1b[0;m`);
	}
}

for(let i = 255; i >= 0; i--) {
	const color = x256(0, i, 255);
	if(!distinctColors.has(color)) {
		distinctColors.add(color);
		colors.push(color);
		///console.log(`\x1b[48;5;${color}m     \x1b[0;m`);
	}
}

for(let i = 0; i < 256; i++) {
	const color = x256(i, 0, 255);
	if(!distinctColors.has(color)) {
		distinctColors.add(color);
		colors.push(color);
		//console.log(`\x1b[48;5;${color}m     \x1b[0;m`);
	}
}

for(let i = 255; i >= 0; i--) {
	const color = x256(255, 0, i);
	if(!distinctColors.has(color)) {
		distinctColors.add(color);
		colors.push(color);
		//console.log(`\x1b[48;5;${color}m     \x1b[0;m`);
	}
}

function getRowOfColors(rowNumber) {
	let str = "";
	for(let i = 0; i < process.stdout.columns; i++) {
		let color = colors[(i + rowNumber) % colors.length];
		str += `\x1b[48;5;${color}m \x1b[0;m`;
	}
	return str;
}

/*let row = 0;
setInterval(() => {
	console.log(getRowOfColors(row++));
}, 100);
*/

let offset = 0;
setInterval(() => {
	console.log("\x1b[H");
	for(var i = 0; i < process.stdout.rows - 2; i++) {
		console.log(getRowOfColors(i + offset));
	}
	offset++;
}, 30);