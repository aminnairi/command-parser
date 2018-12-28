interface Options {
    description: string;
    long: string;
    name: string;
    noValueExpected: Boolean;
    short: string | undefined;
}
declare class CommandParser {
    options: Options[];
    constructor();
    add(option: string, description: string, noValueExpected?: Boolean): void;
    parse(parameters?: string[]): {
        [key: string]: string;
    };
    help(): string;
}
declare const NO_VALUE_EXPECTED = true;
export { CommandParser, NO_VALUE_EXPECTED };
