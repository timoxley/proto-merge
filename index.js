"use strict"

/**
 * Hook the prototype chains of an object up
 * such that children inherit from their parent
 * container node.
 *
 * @api public
 */

module.exports = function protoMerge(obj) {
  return findChains(obj).map(chainPrototypes)
}

module.exports.chain = chainPrototypes
module.exports.findChains = findChains


function chainPrototypes(chain) {
  return chain.reduceRight(function(previous, current) {
    previous.__proto__ = current
    return current
  }, {})
}

/**
 * Finds the chain of containing nodes for every
 * leaf node in `obj`.
 *
 * @param {Object} obj
 * @return {Array<Object>}
 * @api public
 */

function findChains(obj, chain, chains) {
  chains = chains || []
  chain = chain || []
  chain.push(obj)

  var children = getChildObjects(obj).concat(getChildArrayObjectChildren(obj))
  if (!children.length) {
    chains.push(chain)
    return
  }
  children.forEach(function(child) {
    return findChains(child, chain.slice(), chains)
  })
  return chains
}

/**
 * Get `obj` properties that are Objects
 *
 * @param {Object} obj
 * @return {Array<Array>}
 * @api private
 */

function getChildObjects(obj) {
  return Object.keys(obj).map(function(prop) {
    return obj[prop]
  })
  .filter(function(child) {
    return isObject(child)
  })
}

/**
 * Get `obj` properties that are Arrays
 *
 * @param {Object} obj
 * @return {Array<Array>}
 * @api private
 */

function getChildArrays(obj) {
  return Object.keys(obj).map(function(prop) {
    return obj[prop]
  })
  .filter(function(child) {
    return Array.isArray(child)
  })
}

/**
 * Takes an object and merges all its Array properties,
 * filtering in only Object members.
 *
 * Terribly named.
 *
 * @param {Object} obj
 * @return {Array<Object>}
 * @api private
 */

function getChildArrayObjectChildren(obj) {
  return getChildArrays(obj).reduce(function(prev, current) {
    return prev.concat(current.filter(function(obj) {
      return isObject(obj)
    }))
  }, [])
}


/**
 * Returns true iff `obj` is an Object (and not an Array/Date/???).
 *
 * @return {Boolean}
 * @api private
 */
function isObject(obj) {
  return '[object Object]' === Function.prototype.call.call(Object.prototype.toString, obj)
}
