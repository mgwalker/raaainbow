#!/usr/bin/env node
"use strict";var fs=require("fs");var path=require("path");var program=require("commander");var chalk=require("chalk");var pkgJson=require("../package.json");var pos=require("cli-position");var cliCursor=require("cli-cursor");var modes=Object.create(null);fs.readdir(path.join(__dirname,"/modes/"),function(err,files){if(err){return;}var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=files[Symbol.iterator](),_step;!(_iteratorNormalCompletion = (_step = _iterator.next()).done);_iteratorNormalCompletion = true) {var file=_step.value;if(file.substr(-3,3) === ".js"){try{var mode=require("./modes/" + file);if(mode.name && typeof mode.name === "string" && typeof mode.run === "function"){modes[mode.name] = mode.run;}}catch(e) {console.log(e);}}}}catch(err) {_didIteratorError = true;_iteratorError = err;}finally {try{if(!_iteratorNormalCompletion && _iterator["return"]){_iterator["return"]();}}finally {if(_didIteratorError){throw _iteratorError;}}}var modeNames=[];for(var mode in modes) {modeNames.push(mode);}modeNames = modeNames.join(", ");program.version(pkgJson.version).option("-m --mode <name>","The raaainbow mode to run.  Available modes are: " + modeNames).parse(process.argv);if(!program.mode){console.log();console.log("  " + chalk.bgGreen("Please specify a mode!"));program.help();}else if(!modes[program.mode]){console.log();console.log("  " + chalk.bgRed("Unsupported mode \"" + program.mode + "\""));program.help();}else {cliCursor.hide();console.log("\u001b[2J");modes[program.mode]();}process.on("exit",function(){console.log("`\x1b[m\x1b[2J");pos.moveTo(0,0);});});