export interface ICommandParserOptions {
    [key: string]: string;
}
export declare class CommandParser {
    private options;
    private versionIdentifier;
    private name;
    private synopsis;
    constructor(name: string, versionIdentifier: string, synopsis: string);
    option(name: string, description: string, noValueExpected?: boolean): this;
    parse(parameters?: string[]): ICommandParserOptions;
    help(): string;
    version(): string;
}
export declare const NO_VALUE_EXPECTED: boolean;
