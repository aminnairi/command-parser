# command-parser

[![](https://img.shields.io/github/issues/aminnairi/command-parser.svg?style=square&logo=github)](https://github.com/aminnairi/command-parser/issues/) [![](https://img.shields.io/github/license/aminnairi/command-parser.svg?style=square&logo=github)](./LICENSE) [![](https://img.shields.io/npm/dt/@aminnairi/command-parser.svg?logo=npm&style=square)](https://www.npmjs.com/package/@aminnairi/command-parser) [![](https://img.shields.io/npm/v/@aminnairi/command-parser.svg?style=square&logo=npm)](https://www.npmjs.com/package/@aminnairi/command-parser)

Command Line Arguments Parser

## Installation

```console
user@host:~/my-cli$ npm install --save @aminnairi/command-parser
```

## Importation

### ECMAScript Modules

```javascript
'use strict';

import { CommandParser, NO_VALUE_EXCEPTED } from '@aminnairi/command-parser';
```

### CommonJS

```javascript
'use strict';

const { CommandParser, NO_VALUE_EXCEPTED } = require('@aminnairi/command-parser');
```

## Usage

```javascript
const parser = new CommandParser();

parser.option('quiet', 'Do not output anything except the result', NO_VALUE_EXPECTED);
parser.option('config', 'Path to the configuration file');

const options = parser.parse();

console.log(options);
/* {
  quiet: 'yes',
  config: '/usr/share/app.conf',
  argument: 'my-app'
} */
```

```console
user@host:~/my-cli$ node index.js --quiet --config /usr/share/app.conf my-app
user@host:~/my-cli$ # or
user@host:~/my-cli$ node index.js -q -c /usr/share/app.conf my-app
user@host:~/my-cli$ # or
user@host:~/my-cli$ node index.js -qc /usr/share/app.conf my-app
user@host:~/my-cli$ node index.js --help
OPTIONS

    -h, --help
        Display this message

    -q, --quiet
        Do not output anything except the result

    -c, --config
        Path to the configuration file
```
## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md)