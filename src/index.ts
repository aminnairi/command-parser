'use strict';

interface IOptions {
  description: string;
  long: string;
  name: string;
  noValueExpected: boolean;
  short: string | undefined;
}

export interface ICommandParserOptions {
  [key: string]: string;
}

export class CommandParser {
  private options: IOptions[];
  private versionIdentifier: string;
  private name: string;
  private synopsis: string;

  constructor(name: string, versionIdentifier: string, synopsis: string) {
    if (name === undefined) {
      throw new ReferenceError(
        '[CommandParser][constructor] first argument is mandatory'
      );
    }

    if (typeof name !== 'string') {
      throw new TypeError(
        '[CommandParser][constructor] first argument should be of type string'
      );
    }

    if (versionIdentifier === undefined) {
      throw new ReferenceError(
        '[CommandParser][constructor] second argument is mandatory'
      );
    }

    if (typeof versionIdentifier !== 'string') {
      throw new TypeError(
        '[CommandParser][constructor] second argument should be of type string'
      );
    }

    if (synopsis === undefined) {
      throw new TypeError(
        '[CommandParser][constructor] third argument is mandatory'
      );
    }

    if (typeof synopsis !== 'string') {
      throw new TypeError(
        '[CommandParser][constructor] third argument should be of type string'
      );
    }

    this.options = [
      {
        description: 'Display this message',
        long: '--help',
        name: 'help',
        noValueExpected: true,
        short: '-h'
      },
      {
        description: 'Display the name and version of this command',
        long: '--version',
        name: 'version',
        noValueExpected: true,
        short: '-v'
      }
    ];
    this.name = name;
    this.versionIdentifier = versionIdentifier;
    this.synopsis = synopsis;
  }

  public option(
    name: string,
    description: string,
    noValueExpected: boolean = false
  ): this {
    if (typeof name !== 'string') {
      throw new TypeError(
        '[CommandParser][option] first argument should be of type string'
      );
    }

    if (typeof description !== 'string') {
      throw new TypeError(
        '[CommandParser][option] second argument should be of type string'
      );
    }

    if (typeof noValueExpected !== 'boolean') {
      throw new TypeError(
        '[CommandParser][option] third argument should be of type boolean'
      );
    }

    if (name === 'version') {
      throw new Error(
        '[CommandParser][option] "version" is not a valid option name'
      );
    }

    if (name === 'help') {
      throw new Error(
        '[CommandParser][option] "help" is not a valid option name'
      );
    }

    let short;
    let shortLowerCaseAvailable = true;
    let shortUpperCaseAvailable = true;

    const shortLowerCase: IOptions['short'] = `-${name[0].toLowerCase()}`;
    const shortUpperCase: IOptions['short'] = `-${name[0].toUpperCase()}`;

    for (const option of this.options) {
      if (option.short === shortLowerCase) {
        shortLowerCaseAvailable = false;
        break;
      }
    }

    if (!shortLowerCaseAvailable) {
      for (const option of this.options) {
        if (option.short === shortUpperCase) {
          shortUpperCaseAvailable = false;
          break;
        }
      }
    }

    if (shortLowerCaseAvailable) {
      short = shortLowerCase;
    } else if (shortUpperCaseAvailable) {
      short = shortUpperCase;
    }

    this.options.push({
      description,
      long: `--${name}`,
      name,
      noValueExpected,
      short
    });

    return this;
  }

  public parse(
    parameters: string[] = process.argv.slice(2)
  ): ICommandParserOptions {
    if (!Array.isArray(parameters)) {
      throw new TypeError(
        '[CommandParser][parse] first argument must be of type array'
      );
    }

    for (const parameter of parameters) {
      if (typeof parameter !== 'string') {
        throw new TypeError(
          '[CommandParser][parse] all elements of the first argument must be of type string'
        );
      }
    }

    const provided: ICommandParserOptions = {};

    for (let index: number = 0; index < parameters.length; index++) {
      const parameter: string = parameters[index];

      if (parameter === '--help' || parameter === '-h') {
        console.log(this.help());
        break;
      }

      if (parameter === '-v' || parameter === '--version') {
        console.log(this.version());
        break;
      }

      if (
        parameter.startsWith('-') &&
        parameter[1] !== '-' &&
        parameter.length > 2
      ) {
        const multiParameters: string[] = parameter.slice(1).split('');
        const count: number = multiParameters.length;

        parameters.splice(index, 1);

        for (let position: number = count - 1; position >= 0; position--) {
          parameters.splice(index, 0, `-${multiParameters[position]}`);
        }

        index--;

        continue;
      }

      let found: boolean = false;

      for (const option of this.options) {
        if (parameter === option.long || parameter === option.short) {
          if (option.noValueExpected === NO_VALUE_EXPECTED) {
            provided[option.name] = 'yes';
            found = true;
            break;
          }

          const next = parameters[index + 1];

          if (next) {
            provided[option.name] = next;
            index += 1;
            found = true;
            break;
          }
        }

        if (parameter.startsWith(option.long) && parameter.includes('=')) {
          const value = parameter.split('=')[1];
          provided[option.name] = value;
          found = true;
          break;
        }
      }

      if (!found) {
        const argument = 'argument';

        if (argument in provided) {
          provided[argument] += ` ${parameter}`;
        } else {
          provided[argument] = parameter;
        }
      }
    }

    return provided;
  }

  public help(): string {
    let message: string = 'SYNOPSIS';

    message += `\n\n    ${this.synopsis}`;
    message += '\n\nOPTIONS';

    for (const option of this.options) {
      message += '\n\n    ';

      if (option.short) {
        message += `${option.short}, ${option.long}`;
      } else {
        message += `${option.long}`;
      }

      if (!option.noValueExpected) {
        message += ` [${option.name.toUpperCase()}]`;
      }

      message += `\n        ${option.description}`;
    }

    return message;
  }

  public version(): string {
    return `${this.name} version ${this.versionIdentifier}`;
  }
}

export const NO_VALUE_EXPECTED: boolean = true;
