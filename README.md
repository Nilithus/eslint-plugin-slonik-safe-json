# eslint-plugin-slonik-safe-json
ESLint rule for not allowing `JSON.stringify` inside [slonik](https://github.com/gajus/slonik) sql tagged template literals

## Installation
Once you have [ESLint](https://eslint.org/) installed then install the plugin:
```sh
npm install --save-dev eslint-plugin-slonik-safe-json
```

## Usage
Add `slonik-safe-json` to plugins section of `.eslintrc` config file.
```json
{
    "plugins": [
        "slonik-safe-json"
    ]
}
```

Add rule in rules section
```json
"rules": {
  "slonik-safe-json/no-json-stringify": "error"
}
```