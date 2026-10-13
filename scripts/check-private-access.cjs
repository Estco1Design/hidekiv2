const assert = require('node:assert/strict')
const { stripTypeScriptTypes } = require('node:module')
const fs = require('node:fs')
const vm = require('node:vm')
const source = stripTypeScriptTypes(fs.readFileSync('src/lib/private-access.ts','utf8')).replace('export function','function') + '\nexports.hasPrivateAccess = hasPrivateAccess'
const context = { exports: {}, Set };vm.runInNewContext(source,context)
const check = context.exports.hasPrivateAccess
assert.equal(check(null,'client@example.test'),false)
assert.equal(check({email:'client@example.test',emailVerified:false},'client@example.test'),false)
assert.equal(check({email:'other@example.test',emailVerified:true},'client@example.test'),false)
assert.equal(check({email:'client@example.test',emailVerified:true},''),false)
assert.equal(check({email:'CLIENT@example.test',emailVerified:true},' client@example.test, another@example.test '),true)
console.log('PASS: private access requires both verified email and an explicit invitation.')
