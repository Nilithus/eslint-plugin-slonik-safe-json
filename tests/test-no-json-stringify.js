const rule = require('../rules/no-json-stringify');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2015
    }
});

const errors = [{messageId: 'unexpected'}];

ruleTester.run('slonik-safe-json-serialization', rule, {
    valid: [
        "sql`SELECT * FROM FOO`",
        {
            code: 'sql`SELECT * FROM FOO WHERE id=${foo.bar}`',
        },
        {
            code: 'sql`SELECT * FROM FOO WHERE id=${sql.json({})}`',
        },
        {
            code: 'sql`(${uuidv4()}, upper(${t}))`',
        }
    ],
    invalid: [
        {
            code: 'sql`INSERT INTO foo (json) VALUES (${JSON.stringify({})})`',
            errors
        },
        {
            code: 'sql`INSERT INTO foo (otherValue, json) VALUES (${foo.bar}, ${JSON.stringify({})})`',
            errors
        }
    ]
})

console.log("Tests run successfully");