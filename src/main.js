#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const program = require("commander");
const chalk = require("chalk");
const pkgJson = require("../package.json");

const fullscreen = require("./modes/fullscreen");
const modes = Object.create(null);
modes[fullscreen.name] = fullscreen.run;

fs.readdir(path.join(__dirname, "/modes/"), (err, files) => {
	for(let file of files) {
		if(file.substr(-3, 3) === ".js") {
			try {
				const mode = require(`./modes/${file}`);
				if(mode.name && typeof mode.name === "string" && mode.name !== fullscreen.name && typeof mode.run === "function") {
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
		.option("-m --mode [name]", `The raaainbow mode to run.  Available modes are: ${modeNames}`)
		.parse(process.argv);
	
	if(!program.mode) {
		program.mode = fullscreen.name;
	}
	
	if(!modes[program.mode]) {
		console.log();
		console.log(chalk.bgRed(`  Unsupported mode "${program.mode}"`));
		program.help();		
	} else {
		require("cli-cursor").hide();
		console.log(`\x1b[2J`);
		modes[program.mode]();
	}
});
