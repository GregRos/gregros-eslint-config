// I'd like to follow the Google style, but the reality is that we have A LOT of code that uses double quotes.
// Changing them all would be a massive transformation. It would mess up the history, be hard to get used to,
// Etc. And there is no point. There is no difference between them.
const quoteConfig = ["error", "double", {avoidEscape: true}];

const namingConvention = [{
    // Most things should be camelCase or strictCamelCase.
    selector: "default",
    format: ["camelCase"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid"
}, {
    selector:"typeLike",
    format: ["PascalCase"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid"
}, {
    // Only CONST variables can be UPPER_CASE
    selector: "variable",
    modifiers: ["const"],
    format: ["camelCase", "UPPER_CASE"],
    // Leading underscore needs to be allowed in variables for destructing
    // etc.
    leadingUnderscore: "allow"
}, {
    // _is required for private members
    selector: "memberLike",
    format: ["camelCase"],
    modifiers: ["private"],
    leadingUnderscore: "require"
}, {
    // Meaningless variable names that are sometimes used.
    // They aren't even short.
    selector: "variable",
    format: ["camelCase"],
    custom: {
        // Not allowed:
        // * 'tmp' or 'temp' - temporary what?
        // * sth, something, some, thing, etc. - totally meaningless. if you want a meanigless variable, just use a letter.
        // * asd, adf, abc, xyz - meaningless names made by pressing random keys.
        // Note that you CAN have single-letter variable names.
        regex: "(tmps?|temps?|sths?|somethings?|somethigns?|some|things?|whatevers?|asd|adf|abc|xyz|hi)$",
        match: false
    }
}]

const bannedTypes = {
    types: {
        String: {
            message: "Use `string` instead",
            fixWith: "string"
        },
        Number: {
            message: "Use `number` instead.",
            fixWith: "number"
        },
        "{}": {
            message: "Use `object` instead",
            fixWith: "object"
        },
        Symbol: {
            message: "Use `symbol` instead.",
            fixWith: "symbol"
        },
        Boolean: {
            message: "Use `boolean` instead.",
            fixWith: "boolean"
        }
    }
}

module.exports = {
    extends: [
        "./internal/google-eslint-config.js"
    ],
    // Warn - used for things that might be bugs, but you can use anyway with a comment
    // Error - used for style things that have no use. You'll never need to do these. Probably.
    // "Warn" isn't actually optional. Most executions will happen with warnings-as-errors.
    rules: {
        // OVERRIDES
        // x == null is allowed because it is predictable.
        eqeqeq: ["error", "always", {"null": "ignore"}],

        // Why do we need this? We already have prettier.
        quotes: "off",

        // I know the issues. But enforcing braces seems ugly to me.
        "no-case-declarations": "off",

        // CUSTOM

        // This is a common error, such as using `map` in place of `forEach`.
        "array-callback-return": "warn",

        // Probable bug
        "no-self-compare": "warn",

        // If the condition is in the same line as the statement,
        // it can't be confused. But multi-line block statements without curly
        // can cause mistakes.
        // Prettier is set up like this, so this isn't fully necessary.
        curly: ["error", "multi-line"],

        // It's standard. You should only use [] notation in special cases.
        "dot-notation": "error",

        // The default is 4. That's good enough.
        "max-depth": "warn",

        // This is the absolute maximum that is understandable.
        // The default of 10 is crazy.
        "max-nested-callbacks": ["warn", 3],

        // The default is 3 (which I like), but is too far from our current code
        "max-params": ["warn", 4],

        // These are NEVER useful unless you're doing something incredibly weird.
        "no-implied-eval": "error",

        // Obsolete, useless property
        "no-iterator": "error",

        // If you're using a random 'new' and discarding the value, something is wrong.
        "no-new": "warn",

        // Pointless
        "no-new-object": "error",

        // Deprecated property.
        "no-proto": "error",

        // Do you actually need this? What for?
        "no-sequences": "warn",

        // This should never be done except in very odd circumstances.
        "no-throw-literal": "warn",

        // This is a style issue honestly
        "no-unneeded-ternary": "error",

        // Useless
        "no-unused-expressions": "error",

        // Useless
        "no-useless-computed-key": "error",

        // Useless
        "no-useless-rename": "error",

        // Var is almost never needed.
        "no-var": "warn",

        // Void operators are unknown to most developers.
        "no-void": "warn",

        // Makes objects much more readable.
        "object-shorthand": "error",

        // Numeric literals are cool. Use them.
        "prefer-numeric-literals": "error",

        // LOVE it, not going to enforce
        // "prefer-template": "error"

        // There is never a reason not to have a symbol description.
        "symbol-description": "error",
    },
    "overrides": [
        {
            "files": ["**/*.ts", "**/*.tsx"],
            "parser": "@typescript-eslint/parser",

            "plugins": [
                "@typescript-eslint"
            ],
            "extends": [
                // We're NOT using :recommended. Unlike eslint:recommended, which is pretty good,
                // this one is crazy. It's for people who live in a magical fairy world, where they also only write C#.
                // It has rules like prohibiting `require`, it has 6 different rules that interfere with using `any`
                // etc, etc.
            ],
            "rules": {
                // BROKEN
                "node/no-missing-import": "off",
                "node/no-empty-function": "off",
                "node/no-unsupported-features/es-syntax": "off",
                "node/no-missing-require": "off",
                "node/shebang": "off",

                // TS VERSIONS OF ESLINT RULES

                // There is no legitimate use for default params before regular ones. It's just a mistake.
                "default-param-last": "off",
                "@typescript-eslint/default-param-last": "error",

                // Dupe class members are just an error.
                "no-dupe-class-members": "off",
                "@typescript-eslint/no-dupe-class-members": "error",

                // Duplicate imports increase the size of the imports block unnecessarily.
                // It's complicated enough as it is.
                "no-duplicate-imports": "off",
                "@typescript-eslint/no-duplicate-imports": "error",

                // Again, basically no legitimate uses.
                "no-implied-eval": "off",
                "@typescript-eslint/no-implied-eval": "error",

                "no-loss-of-precision": "off",
                "@typescript-eslint/no-loss-of-precision": "error",

                "no-throw-literal": "off",
                "@typescript-eslint/no-throw-literal": "error",

                "no-unused-expressions": "off",
                "@typescript-eslint/no-unused-expressions": "error",

                // Unused parameters are legitimate, since they meaningfully change the signature
                // of a function. Sometimes you want to use them.
                "no-unused-vars": "off",
                "@typescript-eslint/no-unused-vars": ["warn", {args: "none"}],

                "no-useless-constructor": "off",
                "@typescript-eslint/no-useless-constructor": "error",

                // NAMING CONVENTION

                "@typescript-eslint/naming-convention": ["warn", ...namingConvention],

                // SUBSET OF :recommended
                // Unlike eslint:recommended, I'm going to explain why we need these.

                // Non-consecutive overloads are unclear and confusing.
                "@typescript-eslint/adjacent-overload-signatures": "error",

                // This is never needed. It still allows awaiting something that MIGHT be awaitable.
                "@typescript-eslint/await-thenable": "error",

                // The default options allow `ts-expect-error` with a comment. That's good enough.
                "@typescript-eslint/ban-ts-comment": "error",

                // Only normalize type names. Don't restrict the use of any types.
                "@typescript-eslint/ban-types": ["error", bannedTypes],

                // Empty interfaces are useless
                "@typescript-eslint/no-empty-interface": "error",

                // Useless non-null assertions are useless
                "@typescript-eslint/no-extra-non-null-assertion": "error",

                // This is the cause of many bugs. If you want this to execute and don't care
                // if it fails, add an empty .catch(() => {}).
                "@typescript-eslint/no-floating-promises": "error",

                // This is almost always a bug.
                "@typescript-eslint/no-for-in-array": "warn",

                // Consistent style. Redundant type information makes code harder to read.
                "@typescript-eslint/no-inferrable-types": "error",

                // I've never seen this done, but it is probably a mistake.
                "@typescript-eslint/no-misused-new": "warn",

                // Cause of many bugs.
                "@typescript-eslint/no-misused-promises": "warn",

                // Namespaces are an odd, sort-of deprecated, legacy construct. The language
                // recommends against using them.
                "@typescript-eslint/no-namespace": "warn",

                // This is probably a mistake.
                "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",

                // Unnecessary type info makes code harder to read.
                // "@typescript-eslint/no-unnecessary-type-assertion": "error",
                // (had false positives)

                // Unnecessary type info makes code harder to read.
                // "@typescript-eslint/no-unnecessary-type-constraint": "error",
                // (probably also has false positives)

                // If you DO use namespaces, the `module` keyword is just confusing.
                // There is no use, so this isn't a 'warn'.
                "@typescript-eslint/prefer-namespace-keyword": "error",

                // These are obsolete but have some, very few, legitimate uses.
                "@typescript-eslint/triple-slash-reference": "warn",

                // NON :RECOMMENDED

                // Normalize type names. Different names for the same type are confusing.
                "@typescript-eslint/array-type": ["error", {
                    default: "array"
                }],

                // Normalize 'x as T` vs `<T>x`. This is the more common and accepted form today.
                // Two types of syntax for exactly the same thing is confusing.
                "@typescript-eslint/consistent-type-assertions": ["error", {
                    assertionStyle: "as"
                }],

                // These are pointless.
                "@typescript-eslint/no-confusing-non-null-assertion": "error",

                // Prefer more concise, cleaner code.
                "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",

                // Cleaner code.
                "@typescript-eslint/no-unnecessary-qualifier": "error",

                // Using an indexed for loop when not needed is confusing.
                "@typescript-eslint/prefer-for-of": "warn",

                // ?. makes for more readable, cleaner code.
                "@typescript-eslint/prefer-optional-chain": "warn",

                // This makes code more consistent and instantly makes async functions recognizable.
                // However, there are legitimate reasons not to follow it for specific functions.
                "@typescript-eslint/promise-function-async": "warn"
            },
            "parserOptions": {
                "ecmaVersion": 2018,
                "sourceType": "module"
            }
        }

    ]
}
