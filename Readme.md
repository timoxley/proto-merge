# proto-merge

[![Build Status](https://travis-ci.org/timoxley/proto-merge.png?branch=master)](https://travis-ci.org/timoxley/proto-merge)

Define complex prototype chains with vanilla nested objects.

## Installation

#### node + browserify
    $ npm install proto-merge

#### component
    $ component install timoxley/proto-merge

## Why?

APIs often need a little prototype magic, yet the overhead
of verbose prototype definitions will ruin the elegance /
brevity of the code.

`proto-merge` simplifies complex prototype chaining definitions to
a minimum.

## Example

```js
var merge = require('proto-merge')

var project = merge({
  name: "Main Project",
  version: 0.0.1,
  sub_project: {
    name: "Sub Project"
  },
  forks: [
    {version: 0.0.2},
    {name: 'A fork!'}
  ]
})

// property access works as expected:
console.log(project.version) // => '0.0.1'

// sub_project inherits properties from from its 'parent'
console.log(project.sub_project.version) // => '0.0.1'

// sub_project can override with its own properties
console.log(project.sub_project.name) // => 'Sub Project'

// the link is dynamic, so if you change the parent
// you also change the child
project.version = '0.0.2'

console.log(project.sub_project.version) // => '0.0.2'

// prototypes are also inherited in array members
console.log(project.forks[0].version) // => '0.0.2'
console.log(project.forks[1].version) // => '0.0.1'

```

As with all magic, use responsibly.

## License

  MIT
