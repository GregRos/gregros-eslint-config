const path = require("path");
module.exports = {
    root: true,
    extends: [
        "@reflectiz/eslint-config"
    ],
    parserOptions: {
        project: path.join(__dirname, "tsconfig.json")
    }
}
