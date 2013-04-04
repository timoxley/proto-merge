
# proto-merge

  Experimental. Create an Object prototype chain based on hierarchy.

## Installation

    $ component install timoxley/proto-merge

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
    {version: 0.0.2}
  ]
})

// property access works as expected:
console.log(project.version) // => '0.0.1'

// but note sub_project inherits properties from from its 'parent'
console.log(project.sub_project.version) // => '0.0.1'

// and can override with its own properties
console.log(project.sub_project.name) // => 'Sub Project'

// the link is dynamic, so if you change the parent
// you also change the child
project.version = '0.0.2'
console.log(project.sub_project.version) // => '0.0.2'

// prototypes are also inherited in array members
console.log(project.forks[0].version) // => '0.0.3'

// you can also use this in silly ways:
project.sub_project.sub_project.sub_project.name // => 'Sub Project'

```

## Why?

I don't know yet.

## License

  MIT
