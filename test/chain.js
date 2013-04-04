describe("chain", function() {
  "use strict"
  var merge = typeof window !== 'undefined' ? require('proto-merge') : require('../')
  var assert = typeof window !== 'undefined' ? require('timoxley-assert') : require('assert')
  var chain = merge.chain


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
