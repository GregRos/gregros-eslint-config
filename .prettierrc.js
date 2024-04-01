module.exports = {
    tabWidth: 4,
    arrowParens: "avoid",
    trailingComma: "none",
    printWidth: 100,
    semi: false,
    plugins: ["prettier-plugin-packagejson"],
    overrides: [
        {
            files: "*.{yaml,json}",
            options: {
                tabWidth: 2
            }
        }
    ]
}
