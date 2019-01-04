# command-parser

[![](https://img.shields.io/github/license/aminnairi/command-parser.svg?style=square&logo=github)](./LICENSE) [![](https://img.shields.io/npm/v/@aminnairi/command-parser.svg?style=square&logo=npm)](https://www.npmjs.com/package/@aminnairi/command-parser)  ![](https://img.shields.io/david/aminnairi/command-parser.svg) ![](https://img.shields.io/snyk/vulnerabilities/npm/@aminnairi/command-parser.svg) [![Coverage Status](https://coveralls.io/repos/github/aminnairi/command-parser/badge.svg?branch=master)](https://coveralls.io/github/aminnairi/command-parser?branch=development) [![Build Status](https://travis-ci.org/aminnairi/command-parser.svg?branch=master)](https://travis-ci.org/aminnairi/command-parser)

Command Line Arguments Parser

## Quick Start
*Notice: these instructions will use [NPM][npm], though you can use [Yarn][yarn] instead if you know what you are doing. The following instructions will not explain how to use [Yarn][yarn].*

**1. Install the [Nodejs](https://nodejs.org/en/) plateform and check that it is correcly installed.**
```console
$ node --version
```
**2. Install the [NPM][npm] command line interface and check that it is correcly installed.**
```console
$ npm --version
```
**3. Create the project directory.**
```console
$ mkdir my-project
```
*Note: replace `my-project` with the name of your project.*

**4. Move into the project directory you previously created.**
```console
$ cd my-project
```
*Note: replace `my-project` with the name of your project.*

**5. Initialize a brand-new [NPM][npm] project.**
```console
$ npm init
```
*Note: you can initialize a brand-new [NPM][npm] project without answering questions.*
```console
$ npm init --yes
```
**6. Install the project using [NPM][npm].**
```console
$ npm install @aminnairi/command-parser
```
*Note: you can install it as a development dependency (though it is not recommended for command line interface based packages if you are not using a compiler).*
```console
$ npm install --save-dev @aminnairi/command-parser
```
**7. Create your `index.js` file.**
```console
$ touch index.js
```
**8. Open your favorite editor and add these lines to your `index.js` file.**
```javascript
'use strict';

const { CommandParser, NO_VALUE_EXPECTED } = require('@aminnairi/command-parser');
```
*Note: if you use ECMAScript Modules, you can use the following syntax.*
```javascript
'use strict';

import { CommandParser, NO_VALUE_EXPECTED } from '@aminnairi/command-parser';
```
**9. Instanciate the `CommandParser` class**
```javascript
const parser = new CommandParser();
```
*Note: you can name the instance with whatever name you would like. `parser` is just a convention.*

**10. Add an option and his description to you command line interface.**
```javascript
parser.option('meme', 'The meme template to be used');
```
**11. Display the parsed argument to the console.**
```javascript
console.log(parser.parse());
```
**12. Test your command line interface.**
```console
$ node index.js --meme conceited-reaction so Java is not free anymore huh
{ meme: 'conceited-reaction',
  argument: 'so Java is not free anymore huh' }
```
**13. Get help from the command line.**
```console
$ node index.js --help
OPTIONS

    -h, --help
        Display this message

    -m, --meme [MEME]
        The meme template to be used
```

## Advantages

- [x] Tested with a goal of 100% of coverage for the unit testing.
- [x] Install, use and get ready for production in no time.
- [x] More time for your business logic than the command parsing logic.
- [x] [POSIX-compliant](https://www.gnu.org/software/libc/manual/html_node/Argument-Syntax.html) command parsing.
- [x] Open-source and open to contribution from the community to make it better
- [x] TypeScript type hinting support.
- [x] Meme example.

## Usage

### Argument with value

```javascript
parser.option('meme', 'The meme template to be used');

console.log(parser.parse());
```

```console
$ node index.js --meme conceited-reaction
{ meme: 'conceited-reaction' }
$ node index.js
{}
```

### Argument without value

```javascript
parser.option('no-watermak', 'Remove the watermak', NO_VALUE_EXPECTED);

console.log(parser.parse());
```

```console
$ node index.js --no-watermak
{ 'no-watermak': 'yes' }
$ node index.js
{}
```

### Parse something other than the command line arguments.

```javascript
parser.option('meme', 'The meme template to be used');
parser.option('no-watermak', 'Remove the watermak', NO_VALUE_EXPECTED);

const customArguments = [
  '--meme',
  'conceited-reaction',
  '--no-watermak'
];

console.log(parser.parse(customArguments));
```

```console
node index.js
{ meme: 'conceited-reaction', 'no-watermak': 'yes' }
```

### Quickly tell if an argument is missing

```javascript
parser.option('meme', 'The meme template to be used');

const commandLineArguments = parser.parse();

if (!('argument' in commandLineArguments)) {
  console.log('Hey! looks like you are missing the text...');
} else {
  console.log('Here is the good stuff you made!');
}
```

```console
$ node index.js --meme conceited-reaction
Hey! looks like you are missing the text...
$ node index.js --meme conceited-reaction so Java is not free anymore huh
Here is the good stuff you made!
```

### Manually trigger the help

```javascript
parser.option('meme', 'The meme template to be used');

const commandLineArguments = parser.parse();

if (!('meme' in commandLineArguments)) {
  console.log(parser.help());
} else {
  console.log('Here is the good stuff you made!');
}
```

```console
$ node index.js so Java is not free anymore huh
OPTIONS

    -h, --help
        Display this message

    -m, --meme [MEME]
        The meme template to be used
$ node index.js --meme conceited-reaction so Java is not free anymore huh
Here is the good stuff you made!
```

### Use multiple options with a single token

```javascript
parser.option('awesome', 'Make an awesome meme', NO_VALUE_EXPECTED);
parser.option('wow', 'Doge-approve this meme', NO_VALUE_EXPECTED);
parser.option('meme', 'The meme template to be used');

console.log(parser.parse());
```

```console
$ node index.js -awm conceited-reaction so Java is not free anymore huh
{ awesome: 'yes',
  wow: 'yes',
  meme: 'conceited-reaction',
  argument: 'so Java is not free anymore huh' }
```

### Use the equal syntax

```javascript
parser.option('awesome', 'Make an awesome meme', NO_VALUE_EXPECTED);
parser.option('wow', 'Doge-approve this meme', NO_VALUE_EXPECTED);
parser.option('meme', 'The meme template to be used');

console.log(parser.parse());
```

```console
$ node index.js -aw --meme=conceited-reaction so Java is not free anymore huh
{ awesome: 'yes',
  wow: 'yes',
  meme: 'conceited-reaction',
  argument: 'so Java is not free anymore huh' }
```

### Multiple options chaining

```javascript
parser
  .option('awesome', 'Make an awesome meme', NO_VALUE_EXPECTED);
  .option('wow', 'Doge-approve this meme', NO_VALUE_EXPECTED);
  .option('meme', 'The meme template to be used');

console.log(parser.parse());
```

```console
$ node index.js -awm conceited-reaction so Java is not free anymore huh
{ awesome: 'yes',
  wow: 'yes',
  meme: 'conceited-reaction',
  argument: 'so Java is not free anymore huh' }
```

### About TypeScript

TypeScript adds more type checking at transpile time to prevent development errors. I decided to write my code entirely in TypeScript so that you can take advantage of the type checking as well (but you do not have to use TypeScript and can totally use this API with plain JavaScript as well). The type definition file is [`./index.d.ts`](./index.d.ts) and is automatically imported when using the following syntax.

```console
$ npm install --save-dev typescript ts-node @aminnairi/command-parser
```

```typescript
// index.ts
'use strict';

import { CommandParser, NO_VALUE_EXPECTED, ICommandParserOptions } from '@aminnairi/command-parser';

const parser: CommandParser = new CommandParser();

parser.option('wow', 'Doge-approve this meme', NO_VALUE_EXPECTED);
parser.option('meme', 'The meme template to be used');

const parsedArguments: ICommandParserOptions = parser.parse();

console.log(parsedArguments);
```

```console
$ ./node_modules/.bin/ts-node index.ts -wm conceited-reaction
{ wow: 'yes', meme: 'conceited-reaction' }
```

## Contributing

Contributions are very welcome! See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for more informations on how you can help.

![](https://i.ibb.co/b2kCLSY/itsfreerealestate.png)

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/lang/en/