#!/usr/bin/env node
"use strict";

// XXX currently this project is written to support node 0.10.*
// when Meteor 1.4 is ready, we can rewrite in es6
var Vorpal = require("vorpal")(),
      Path = require("path"),
      Fs = require("fs"),
      Exec = require("child_process").exec,
      Spawn = require("child_process").spawn,
      Rimraf = require("rimraf").sync,
      Promise = require("es6-promise").Promise,
      GitHub = require("github-download"),
      Mkdirp = require("mkdirp"),
      Symlink = require("symlink-or-copy").sync;
      ;

var root = Path.resolve(__dirname, "../"),
      sitesFolder = Path.join(root, "./sites"),
      apollosFolder = Path.join(root, "./apollos")
      ;

function getDirectories(srcpath) {
  return Fs.readdirSync(srcpath).filter(function(file) {
    return Fs.statSync(Path.join(srcpath, file)).isDirectory();
  });
}

var sites = getDirectories(sitesFolder);
var apollosCompiled = [
  "dist",
  "node_modules"
];

var sitesCompiled = [
  ".remote",
  "node_modules",
  "packages",
  ".meteor/local"
];

function installDep(src, dep){
  return new Promise(function(resolve, reject){
    Mkdirp(src, function(err) {
      if (err) return reject(err);
      GitHub(dep, src)
        .on("error", function(err){}) // XXX handle error
        .on("end", resolve);
    });
  });
}

Vorpal
  .command("setup <site>")
  .description("Bootstrap an application. This may take some time...")
  .option("-c, --clean", "Force rebuild of application(s)")
  .option("-l, --log [level]", "Sets verbosity level.")
  .autocomplete(sites)
  .action(function(args, cb) {
    var app = Path.join(sitesFolder, args.site);
    var options = args.options;
    // var log = this.log;
    if (args.site && sites.indexOf(args.site) === -1) {
      this.log("Could not find " + args.site + " in /sites folder");
      return cb();
    }

    if (options.clean) {
      console.log("Cleaning all dependencies...");
      if (args.site) {
        for (var i = 0; i < sitesCompiled.length; i++) {
          var localPath = sitesCompiled[i];
          Rimraf(Path.join(app, localPath));
        }
      }

      for (var i = 0; i < apollosCompiled.length; i++) {
        var localPath = apollosCompiled[i];
        Rimraf(Path.join(apollosFolder, localPath));
      }
    }

    var packageFile = require(Path.join(app, "package.json"));
    var depPromises = [];
    if (packageFile.apollos && packageFile.apollos.resource) {
      for (var subDir in packageFile.apollos.resource) {
        if (!packageFile.apollos.resource.hasOwnProperty(subDir)) continue;
        var localPath = Path.join(app, subDir);
        var deps = packageFile.apollos.resource[subDir];
        for (var dep in deps) {
          if (!deps.hasOwnProperty(dep)) continue;
          console.log("installing resource: " + dep + " for " + args.site)
          depPromises.push(installDep(Path.join(localPath, dep), deps[dep]));
        }
      }
    }
    var npmPromises = [];
    npmPromises.push(
      new Promise(function(p, f){
        console.log("installing npm deps of Apollos...");
        var child = Spawn("npm", ["install"], {
          cwd: apollosFolder, stdio: "inherit"
        });
        child.on("error", f);
        child.on("close", p);
      })
    );
    npmPromises.push(
      new Promise(function(p, f){
        console.log("installing npm deps of " + args.site + "...");
        var child = Spawn("npm", ["install"], {
          cwd: app, stdio: "inherit"
        });
        child.on("error", f);
        child.on("close", function(){
          var dest = Path.join(app, "node_modules/apollos");
          Rimraf(dest);
          Symlink(apollosFolder, dest);
          return p();
        });
      })
    );

    return Promise.all(npmPromises.concat(depPromises))
      .then(function(){
        console.log(args.site + " should be ready to go!");
        console.log("if " + args.site + " has a settings file, you will need to clone it down manually");
        console.log("\n");
        console.log("    cd " + app + "/.remote/ && git clone https://github.com/NewSpring/ops-settings.git settings");
        console.log("\n");
        cb();
      })
      .catch(function(err) {
        console.error(err);
        cb();
      })
  });

Vorpal
  .command("run <site>")
  .description("Start a local server to serve the site and print its address in your console")
  .option("-p, --port", "Choose a port to run the application")
  .option("-v, --verbosity [level]", "Sets verbosity level.")
  .option("-q, --quick", "Only runs the app, not apollos watcher as well")
  .option("-n, --native", "Runs the native version of the application")
  .option("--ios", "Run the native app of a given site in the iOS simulator")
  .option("--android", "Run the native app of a given site in the Android simulator")
  .option("--device", "Run the native app of a given site on the device of the platform")
  .option("--production", "Run the application in production mode")
  .option("--debug", "Run the application in debug mode")

  .autocomplete(sites)
  .action(function(args, cb) {
    var app = Path.join(sitesFolder, args.site);
    var options = args.options;

    if (sites.indexOf(args.site) === -1) {
      this.log("Could not find " + args.site + " in /sites folder");
      return cb();
    }

    var packageFile = require(Path.join(app, "package.json"));

    var env = process.env;
    if (options.debug) env.METEOR_PROFILE = 200;
    if (options.production) env.NODE_ENV = "production";
    if (!options.ios && !options.android && !options.native) env.WEB = true;
    if (options.native || options.ios || options.android) env.NATIVE = true;

    if (!options.quick && !options.production) {
      var babel = Spawn("npm", ["run", "start"], { stdio: ["ignore", "ignore", process.stderr], cwd: apollosFolder });
    }

    var meteorArgs = [ "--settings" ];

    if (packageFile.apollos && packageFile.apollos.settings) {
      meteorArgs.push(packageFile.apollos.settings)
    }

    function run() {
      var meteor = Spawn("meteor", meteorArgs, { stdio: "inherit", cwd: app, env: env });
    }

    if (options.production) {
      console.log("Building apollos in production mode");
      meteorArgs.push("--production");
      var babel = Spawn("npm", ["run", "compile"], { cwd: apollosFolder, env: env });
      babel.on("close", function(){
        console.log("Running " + args.site + " in production mode");
        run();
      })

    } else {
      run();
    }


  });


Vorpal
  .parse(process.argv);
