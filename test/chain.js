describe("chain", function() {
  "use strict"

  var chain = require('proto-merge').chain
  var assert = require('timoxley-assert')

  var parent = {name: "Mom"}
  var child = {name: "Bob"}
  var grandchild = {name: "Bill"}

  chain([parent, child, grandchild])

  it('sets prototypes correctly', function() {
    assert.strictEqual(Object.getPrototypeOf(grandchild), child)
    assert.strictEqual(Object.getPrototypeOf(child), parent)
    assert.strictEqual(Object.getPrototypeOf(parent), Object.prototype)
  })
})
