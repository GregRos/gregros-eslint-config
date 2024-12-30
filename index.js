module.exports = {
    extends: ["./base.js"],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "script"
    },
    env: {
        node: true,
        es6: true
    },
    rules: {
        // OVERRIDES
        // x == null is allowed because it is predictable.
        eqeqeq: ["error", "always", { null: "ignore" }],

        quotes: "off",

        "no-undef": "off",

        "no-case-declarations": "off",

        "no-unused-vars": ["warn", { args: "none", vars: "local" }],
        // Style - use prettier
        "no-trailing-spaces": "off",
        // CUSTOM

        "array-callback-return": "warn",

        "no-self-compare": "warn",

        "dot-notation": "error",

        "max-depth": "warn",

        "max-nested-callbacks": ["warn", 5],

        "max-params": ["warn", 4],

        "no-iterator": "error",

        "no-new": "warn",

        "no-new-object": "error",

        "no-proto": "error",

        "no-sequences": "warn",


        "no-unneeded-ternary": "error",

        "no-unused-expressions": "error",

        "no-useless-computed-key": "error",

        "no-useless-rename": "error",

        "no-var": "off",

        "no-void": "off",

        "prefer-numeric-literals": "error",

        "symbol-description": "error"
    },
    overrides: [
        {
            files: ["**/*.ts", "**/*.tsx"],
            parser: "@typescript-eslint/parser",

            plugins: ["@typescript-eslint"],
            extends: [],
            rules: {
                // BROKEN
                "node/no-missing-import": "off",
                "node/no-empty-function": "off",
                "node/no-unsupported-features/es-syntax": "off",
                "node/no-missing-require": "off",
                "node/shebang": "off",
                "no-redeclare": "off",
                // TS VERSIONS OF ESLINT RULES

                "default-param-last": "off",
                "@typescript-eslint/default-param-last": "error",

                "no-dupe-class-members": "off",
                "@typescript-eslint/no-dupe-class-members": "error",

                "no-duplicate-imports": "off",

                "no-loss-of-precision": "off",
                "@typescript-eslint/no-loss-of-precision": "error",

                "no-unused-expressions": "off",
                "@typescript-eslint/no-unused-expressions": "error",

                "no-unused-vars": "off",
                "@typescript-eslint/no-unused-vars": ["warn", { args: "none", vars: "local" }],

                "no-useless-constructor": "off",
                "@typescript-eslint/no-useless-constructor": "error",

                "@typescript-eslint/adjacent-overload-signatures": "error",

                "@typescript-eslint/await-thenable": "error",

                "@typescript-eslint/ban-ts-comment": "error",

                "@typescript-eslint/no-extra-non-null-assertion": "error",

                "@typescript-eslint/no-floating-promises": "warn",

                "@typescript-eslint/no-for-in-array": "warn",

                "@typescript-eslint/no-misused-new": "warn",

                "@typescript-eslint/no-misused-promises": "warn",

                "@typescript-eslint/no-namespace": "warn",

                "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",

                "@typescript-eslint/prefer-namespace-keyword": "error",

                "@typescript-eslint/triple-slash-reference": "warn",

                // NON :RECOMMENDED

                "@typescript-eslint/array-type": [
                    "error",
                    {
                        default: "array"
                    }
                ],

                "@typescript-eslint/consistent-type-assertions": [
                    "error",
                    {
                        assertionStyle: "as"
                    }
                ],

                "@typescript-eslint/no-confusing-non-null-assertion": "error",

                "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",

                "@typescript-eslint/no-unnecessary-qualifier": "error",

                "@typescript-eslint/prefer-for-of": "warn",

                "@typescript-eslint/prefer-optional-chain": "warn",

                "@typescript-eslint/promise-function-async": "warn"
            },
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: "module"
            }
        }
    ]
}
