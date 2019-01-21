# command-parser

[![](https://img.shields.io/github/license/aminnairi/command-parser.svg?style=square&logo=github)](./LICENSE) [![](https://img.shields.io/npm/v/@aminnairi/command-parser.svg?style=square&logo=npm)](https://www.npmjs.com/package/@aminnairi/command-parser)  ![](https://img.shields.io/david/aminnairi/command-parser.svg?logo=npm) ![](https://img.shields.io/snyk/vulnerabilities/npm/@aminnairi/command-parser.svg?logo=npm) [![](https://img.shields.io/travis/aminnairi/command-parser/master.svg?logo=travis)](https://travis-ci.org/aminnairi/command-parser) [![](https://img.shields.io/coveralls/github/aminnairi/command-parser/master.svg)](https://coveralls.io/github/aminnairi/command-parser?branch=master)

Command Line Arguments Parser

```console
$ code my-cli
```

```javascript
'use strict'

const { CommandParser } = require('@aminnairi/command-parser')

const name = 'my-cli'
const version = '0.1.0'
const synopsis = 'My Command Line Interface'
const parser = new CommandParser(name, version, synopsis)

const command = 'name'
const description = 'Your name'
parser.option(command, description)

const { name } = parser.parser()

console.log(`Hello, ${name}!`)
```

```console
$ node my-cli --name you
Hello, you!
```

## Installation

Using [`npm`][npm]

```console
$ npm install --save @aminnairi/command-parser
```

Or using [`yarn`][yarn]

```console
$ yarn add @aminnairi/command-parser
```

## Include

Using [CommonJS][commonjs]

```javascript
'use strict'

const { CommandParser, NO_VALUE_EXPECTED } = require('@aminnairi/command-parser')
```

Using [ECMAScript Modules][esmodules]

```javascript
'use strict'

import { CommandParser, NO_VALUE_EXPECTED } from '@aminnairi/command-parser'
```

## Usage

### Instanciation

```javascript
const name = 'my-cli'
const version = '0.1.0'
const synopsis = 'My Command Line Interface'
const parser = new CommandParser(name, version, synopsis)
```

### Arguments

#### Configuration

```javascript
parser
  .option('name', 'Your name')
  .option('mood', 'Your mood')
  .option('robot', 'If you are a robot', NO_VALUE_EXPECTED)
```

#### Parsing

```javascript
const { name, mood, robot } = parser.parse()

if (name) {
  console.log(`Hello, ${name}!`)
}

if (mood) {
  console.log(`Are you really ${mood}?`)
}

if (robot) {
  console.log(`01101100 01101111 01101100 right?`)
}
```

### Command Line

Using [`node`][node]

#### Double-Dash Syntax

```console
$ node my-cli --name John --mood happy --robot
Hello, John!
Are you really happy?
01101100 01101111 01101100 right?
```

#### Single-Dash Syntax

```console
$ node my-cli -n John -m happy -r
Hello, John!
Are you really happy?
01101100 01101111 01101100 right?
```

#### Short Single-Dash Syntax

```console
$ node my-cli -rn John -m happy
Hello, John!
Are you really happy?
01101100 01101111 01101100 right?
```

### Version

```console
$ node my-cli --version
my-cli version 0.1.0
```

#### Help

```console
$ node my-cli --help
SYNOPSIS

    My Command Line Interface

OPTIONS

    -h, --help
        Display this message

    -v, --version
        Display the name and version of this command

    -n, --name [NAME]
        Your name

    -m, --mood [MOOD]
        Your mood

    -r, --robot
        If you are a robot
```

### TypeScript

```console
$ npm install --save typescript ts-node @aminnairi/command-parser
$ ./node_modules/.bin/tsc --init
$ code my-cli
```

```typescript
'use strict'

import { CommandParser, ICommandParserOptions, NO_VALUE_EXPECTED } from '@aminnairi/command-parser'

const name: string = 'my-cli'
const version: string = '0.1.0'
const synopsis: string = 'My Command Line Interface'
const parser: CommandParser = new CommandParser(name, version, synopsis)

parser
  .option('name', 'Your name')
  .option('mood', 'Your mood')
  .option('robot', 'If you are a robot')

const { name, mood, robot }: ICommandParserOptions =  parser.parse()

if (name) {
  console.log(`Hello, ${name}!`)
}

if (mood) {
  console.log(`Are you really ${mood}?`)
}

if (robot) {
  console.log(`01101100 01101111 01101100 right?`)
}
```

```console
$ ./node_modules/.bin/ts-node my-cli -rn John -m happy
Hello, John!
Are you really happy?
01101100 01101111 01101100 right?
```

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

[npm]: https://nodejs.org/en/
[node]: https://nodejs.org/en/
[yarn]: https://yarnpkg.com/lang/en/
[commonjs]: https://nodejs.org/api/modules.html
[esmodules]: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/import
[tsnode]: https://github.com/TypeStrong/ts-node