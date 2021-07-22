const rules = require('../../rules/no-json-stringify');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2015
    }
});

const errors = [{messageId: 'unexpected'}];

const slonikJsonRule = rules['slonik-safe-json-serialization'];

ruleTester.run('slonik-safe-json-serialization', slonikJsonRule, {
    valid: [
        "sql`SELECT * FROM FOO`",
        {
            code: 'sql`SELECT * FROM FOO WHERE id=${foo.bar}`',
        },
        {
            code: 'sql`SELECT * FROM FOO WHERE id=${sql.json({})}`',
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