/**
 @author César Casas
 @web https://ar.linkedin.com/in/cesarcasas
 @version 0.0.1
 @description Sphinx Query Logs Analizer
 */
"use strict";

var args = require('argsparser').parse();
var fs = require("fs");

console.log("NSQA version 0.0.1");

if(!args['-f']) {
    console.log("Use node app.js -f /path/to/log");
    process.exit(1);
}//bad arguments format

var $file = args['-f'];

if(!fs.existsSync($file)){
    console.log("File ", $file, " not exists");
    process.exit(1);
};

var data = fs.readFileSync($file).toString();
var parts = data.split("\n");
var stats  =  {
    realtime : 0
    ,walltime : 0
    ,maxrealtime : -1
    ,maxwalltime: -1
};
console.log("Lines: ", parts.length);



var splitLine  = function(line){
    var date = line.substring(0, 30);
    line  = line.replace(date, "");

    date = date.replace("[","").replace("]","");

    var subparts  = line.split(" ");

    var realtime = subparts[1];
    var walltime = subparts[3];

    stats.realtime+= parseFloat(realtime);
    stats.walltime+= parseFloat(walltime);

    stats.maxrealtime  = parseFloat(realtime) > stats.maxrealtime   ? parseFloat(realtime) : stats.maxrealtime;
    stats.maxwalltime  = parseFloat(walltime) > stats.maxwalltime   ? parseFloat(walltime) : stats.maxwalltime;


};

for(var x=0; x<parts.length; x++){
    var line = parts[x];
    if(line.trim()!="")   splitLine(line);
}//end for


stats.realtime  = stats.realtime / parts.length;
stats.walltime  = stats.walltime / parts.length;
console.log(stats);