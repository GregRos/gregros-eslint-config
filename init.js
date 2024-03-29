#!/usr/bin/env node
const cwd = process.cwd();
const { join } = require("path");
const { cp, echo, exec, config, test, set } = require("shelljs");
config.globOptions.dot = true;
set("-e");
const yarn = {
    name: "yarn",
    install(...what) {
        return exec(`yarn add --dev ${what.join(" ")}`).code === 0;
    },
    uninstall(...what) {
        return exec(`yarn remove --dev ${what.join(" ")}`).code === 0;
    }
};

const npm = {
    name: "npm",
    install(...what) {
        return exec(`npm install --save-dev ${what.join(" ")}`).code === 0;
    },
    uninstall(...what) {
        return exec(`npm uninstall --save-dev ${what.join(" ")}`).code === 0;
    }
};

const pkg = test("-f", "yarn.lock") ? yarn : npm;
echo(`Installing peer dependencies. Using ${pkg.name}.`);
const myPackageJson = require("./package.json");
const peers = myPackageJson.autoInstall || {};
const names = Object.keys(peers);
const list = names.join(" ");
console.log(`Uninstalling: ${list}`)
pkg.uninstall(...names);
const packages = Object.entries(peers).map(([k, v]) => `${k}@${v}`);
console.log(`
Installing:
${packages.map(x => `* ${x}`).join("\n")}
`.trim());
pkg.install(...packages);

echo("Copying files to CWD (no overwrite)...");
const filesDir = join(__dirname, "base", "*");
cp("-n", filesDir, `${cwd}`);
echo("Done!");
