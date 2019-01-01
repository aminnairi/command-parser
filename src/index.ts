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

  constructor() {
    this.options = [
      {
        description: 'Display this message',
        long: '--help',
        name: 'help',
        noValueExpected: true,
        short: '-h'
      }
    ];
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

    let short = undefined;
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
    let message: string = 'OPTIONS';

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
}

export const NO_VALUE_EXPECTED: boolean = true;
