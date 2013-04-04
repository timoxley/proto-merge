describe("find chain", function() {
  "use strict"

  var merge = typeof window !== 'undefined' ? require('proto-merge') : require('../')
  var assert = typeof window !== 'undefined' ? require('timoxley-assert') : require('assert')
  var findChains = merge.findChains

  it('finds single level, single leaf chains correctly', function() {
    var parent = {
      child: {
      }
    }

    var child = parent.child

    var chain = findChains(parent)
    assert.deepEqual(chain, [[parent, child]])
  })

  it('finds single level, multiple leaf chains correctly', function() {
    var parent = {
      name: 'parent',
      sister: {name: 'sister'},
      brother: {name: 'brother'}
    }

    var chain = findChains(parent)
    assert.deepEqual(chain, [[parent, parent.sister], [parent, parent.brother]])
  })

  it('finds single branch, multi-level chains correctly', function() {
    var parent = {
      name: 'parent',
      child: {
        name: 'child',
        grandchild: {name: 'grandchild'}
      }
    }

    var child = parent.child
    var grandchild = parent.child.grandchild

    var chain = findChains(parent)
    assert.deepEqual(chain, [[parent, child, grandchild]])
  })



  it('finds multi-branch, multi-level chains correctly', function() {
    var parent = {
      sister: {
        grandchild: {}
      },
      brother: {
        grandchild: {}
      }
    }

    var sister = parent.sister
    var brother = parent.brother
    var chain = findChains(parent)
    assert.deepEqual(chain, [[parent, sister, sister.grandchild], [parent, brother, brother.grandchild]])
  })

  it('ignores non-object values', function() {
    var parent = {
      name: 'Mum',
      child: {
        name: 'Joe',
        hobbies: ['Bikes', 'Robots'],
        grandchild: {
          name: 'Bill'
        }
      }
    }
    var child = parent.child
    var grandchild = parent.child.grandchild

    var chain = findChains(parent)
    assert.deepEqual(chain, [[parent, child, grandchild]])
  })

  it('chains array parents', function() {
    var parent = {
      name: 'Mum',
      children: [
        {name: 'Joe'},
        {name: 'Bill'},
        {name: 'Bob'}
      ]
    }
    var joe = parent.children[0]
    var bill = parent.children[1]
    var bob = parent.children[2]

    var chain = findChains(parent)
    assert.deepEqual(chain, [[parent, joe], [parent, bill], [parent, bob]])
  })



})
