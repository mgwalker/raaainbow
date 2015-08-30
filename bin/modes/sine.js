"use strict";var pos=require("cli-position");var colors=require("../colors");function scale(inRange,outRange){var inDelta=inRange[1] - inRange[0];var outDelta=outRange[1] - outRange[0];return function(val){return (val - inRange[0]) / inDelta * outDelta + outRange[0];};};module.exports = {name:"sine",run:function run(){pos.center();setTimeout(function(){var columns=pos.columns();var yTop=pos.rows() / 3;var yCenter=pos.rows() / 2;var xScale=scale([0,columns],[0,4 * Math.PI]);for(var x=0;x < columns;x++) {var y=Math.round(Math.sin(xScale(x)) * yTop + yCenter);pos.moveTo(x,y);process.stdout.write(colors[x % colors.length] + " ");}},100);}};