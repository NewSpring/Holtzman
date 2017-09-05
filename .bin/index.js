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
  Mkdirp = require("mkdirp");

var root = Path.resolve(__dirname, "../");

var built = [".remote", "node_modules", "packages", ".meteor/local"];

function installDep(src, dep) {
  return new Promise(function(resolve, reject) {
    Mkdirp(src, function(err) {
      if (err) return reject(err);
      GitHub(dep, src)
        .on("error", function(err) {}) // XXX handle error
        .on("end", resolve);
    });
  });
}

Vorpal.command("setup")
  .description("Bootstrap an application. This may take some time...")
  .option("-c, --clean", "Force rebuild of application(s)")
  .option("-l, --log [level]", "Sets verbosity level.")
  .action(function(args, cb) {
    var app = root;
    var options = args.options;

    if (options.clean) {
      console.log("Cleaning all dependencies...");
      for (var i = 0; i < built.length; i++) {
        var localPath = built[i];
        Rimraf(Path.join(app, localPath));
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
          console.log("installing resource: " + dep);
          depPromises.push(installDep(Path.join(localPath, dep), deps[dep]));
        }
      }
    }
    var npmPromises = [];
    npmPromises.push(
      new Promise(function(p, f) {
        console.log("installing npm deps");
        var child = Spawn("npm", ["install"], {
          cwd: app,
          stdio: "inherit"
        });
        child.on("error", f);
      })
    );

    return Promise.all(npmPromises.concat(depPromises))
      .then(function() {
        console.log("Holtzmann should be ready to go!");
        // console.log("you will need to clone it down manually");
        // console.log("\n");
        // console.log("    cd " + app + "/.remote/ && git clone https://github.com/NewSpring/ops-settings.git settings");
        // console.log("\n");
        cb();
      })
      .catch(function(err) {
        console.error(err);
        cb();
      });
  });

Vorpal.command("run")
  .description("Start a local server to serve the site and print its address in your console")
  .option("-p, --port", "Choose a port to run the application")
  .option("-v, --verbosity [level]", "Sets verbosity level.")
  .option("-q, --quick", "Only runs the app, not apollos watcher as well")
  .option("-n, --native", "Runs the native version of the application")
  .option("--ios", "Run the native app of a given site in the iOS simulator")
  .option("--android", "Run the native app of a given site in the Android simulator")
  .option("--device", "Run the native app of a given site on the device of the platform")
  .option("--production", "Run the application in production mode")
  .option("--host <hostname>", "Include the hostname for the mobile server")
  .option("--debug", "Run the application in debug mode")
  .action(function(args, cb) {
    var app = root;
    var options = args.options;

    var packageFile = require(Path.join(app, "package.json"));

    var env = process.env;
    env.METEOR_DISABLE_FS_FIBERS = 1; // https://github.com/meteor/meteor/pull/7668#issuecomment-256230102
    if (options.debug) env.METEOR_PROFILE = 200;
    if (options.production) env.NODE_ENV = "production";
    if (!options.ios && !options.android && !options.native) env.WEB = true;
    if (options.native || options.ios || options.android) env.NATIVE = true;

    var configFile = Path.join(__dirname, "apollos-runtime.json");
    if (!Fs.existsSync(configFile)) {
      Fs.writeFileSync(configFile, JSON.stringify({ WEB: !!env.WEB }, null, 2), "utf8");
    }

    var apolloRuntime = require(configFile);
    // removes the built files for a rebuild
    if (!options.quick && !!apolloRuntime.WEB != !!env.WEB) {
      Rimraf(Path.join(app, ".meteor/local"));
    }

    var meteorArgs = ["--settings"];
    if (options.ios && !options.device) meteorArgs.unshift("run", "ios");
    if (options.android && !options.device) meteorArgs.unshift("run", "android");
    if (options.ios && options.device) meteorArgs.unshift("run", "ios-device");
    if (options.android && options.device) meteorArgs.unshift("run", "android-device");

    if (
      packageFile.apollos &&
      packageFile.apollos.settings &&
      Fs.existsSync(Path.join(app, packageFile.apollos.settings))
    ) {
      meteorArgs.push(packageFile.apollos.settings);
    } else {
      meteorArgs.push(Path.join(app, ".meteor/sample.settings.json"));
    }

    if (options.device && options.host) {
      meteorArgs.push(`--mobile-server=http://${options.host}:3000`);
    }

    function run() {
      var meteor = Spawn("meteor", meteorArgs, { stdio: "inherit", cwd: app, env: env });
    }

    Fs.writeFileSync(configFile, JSON.stringify({ WEB: !!env.WEB }, null, 2), "utf8");

    if (options.production) {
      console.log("Building apollos in production mode");
      meteorArgs.push("--production");
    }

    run();
  });

Vorpal.parse(process.argv);
