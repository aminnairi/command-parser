# command-parser

[![](https://img.shields.io/github/issues/aminnairi/command-parser.svg?style=square&logo=github)](https://github.com/aminnairi/command-parser/issues/) [![](https://img.shields.io/github/license/aminnairi/command-parser.svg?style=square&logo=github)](./LICENSE) [![](https://img.shields.io/npm/dt/@aminnairi/command-parser.svg?logo=npm&style=square)](https://www.npmjs.com/package/@aminnairi/command-parser) [![](https://img.shields.io/npm/v/@aminnairi/command-parser.svg?style=square&logo=npm)](https://www.npmjs.com/package/@aminnairi/command-parser)

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
**5. Initialize a brand-new NPM project.**
```console
$ npm init
```
*Note: you can initialize a brand-new NPM project without answering questions.*
```console
$ npm init --yes
```
**6. Install the project using [NPM][npm].**
```console
$ npm install @aminnairi/command-parser
```
*Note: you can install it as a development dependency (tough it is not recommended for command line interface based packages if you are not using a compiler).*
```console
npm install --save-dev @aminnairi/command-parser
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
**12. Test you command line interface.**
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

    -m, --meme
        The meme template to be used
```

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

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/lang/en/