describe("proto-merge", function() {
  "use strict"

  var merge = typeof window !== 'undefined' ? require('proto-merge') : require('../')
  var assert = typeof window !== 'undefined' ? require('timoxley-assert') : require('assert')

  var project = merge({
    name: "Main Project",
    version: '0.0.1',
    sub_project: {
      name: "Sub Project"
    },
    forks: [
      {version: '0.0.3'}
    ]
  })

  it('sets prototypes correctly', function() {
    assert.strictEqual(Object.getPrototypeOf(project.sub_project), project)
    assert.strictEqual(Object.getPrototypeOf(project.forks[0]), project)
    assert.strictEqual(Object.getPrototypeOf(project), Object.prototype)
  })

  it('inherits as expected', function() {
    assert.equal(project.version, '0.0.1')
    assert.equal(project.sub_project.version, '0.0.1')

    project.version = '0.0.2'
    assert.equal(project.sub_project.version, '0.0.2')

    assert.equal(project.sub_project.name, 'Sub Project')
    assert.equal(project.forks[0].version, '0.0.3')
    assert.equal(project.sub_project.sub_project.sub_project.sub_project.name, 'Sub Project')
  })
})
