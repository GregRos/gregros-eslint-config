#!/usr/bin/env node
const cwd = process.cwd();
const {join} = require("path")
const {cp, echo, exec, set} = require("shelljs");
set("-ex")
echo("Installing peer dependencies...");
const cmd = process.argv0 === "npm" ? "npm install --save-dev" : "yarn add --dev";

const packageJson = require("./package.json");
const peers = packageJson.peerDependencies;
const deps = Object.entries(peers)
for (const [k, v] of deps) {
    const result = exec(`npm list ${k}`);
    // If the command succeeded, skip to the next one.
    if (result.code === 0) {
        echo(`* Peer dependency ${k} exists.`)
        continue;
    }
    echo(`* Installing peer dependency ${k}...`)
    exec(`${cmd} ${k}@${v}`)
}
echo("Copying files to cwd...")
const filesDir = join(__dirname, "base", "*");
cp("-n", filesDir, `${cwd}/`)
