#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const program = require("commander");
const chalk = require("chalk");
const pkgJson = require("../package.json");
const pos = require("cli-position");

const modes = Object.create(null);

fs.readdir(path.join(__dirname, "/modes/"), (err, files) => {
	for(let file of files) {
		if(file.substr(-3, 3) === ".js") {
			try {
				const mode = require(`./modes/${file}`);
				if(mode.name && typeof mode.name === "string" && typeof mode.run === "function") {
					modes[mode.name] = mode.run;
				}
			} catch(e) { console.log(e); }
		}
	}
	
	let modeNames = [ ];
	for(let mode in modes) {
		modeNames.push(mode);
	}
	modeNames = modeNames.join(", ");
	
	program
		.version(pkgJson.version)
		.option("-m --mode <name>", `The raaainbow mode to run.  Available modes are: ${modeNames}`)
		.parse(process.argv);
	
	if(!program.mode) {
		console.log();
		console.log(`  ${chalk.bgGreen(`Please specify a mode!`)}`);
		program.help();				
	}
	else if(!modes[program.mode]) {
		console.log();
		console.log(`  ${chalk.bgRed(`Unsupported mode "${program.mode}"`)}`);
		program.help();		
	} else {
		require("cli-cursor").hide();
		console.log(`\x1b[2J`);
		modes[program.mode]();
	}
	
	process.on("exit", () => {
		console.log('`\x1b[m\x1b[2J');
		pos.moveTo(0, 0);
	});
});
