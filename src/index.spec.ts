import { CommandParser, NO_VALUE_EXPECTED } from './index';
import { expect } from 'chai';
import 'mocha';

const consoleLogOutputCorrectly = (callback: () => {}, message: string): boolean => {
  let oldConsoleLog = console.log;
  let called = false;

  console.log = (string) => {
    if (string === message) {
      called = true;
    }
  }

  callback();

  console.log = oldConsoleLog;

  return called;
}

describe('Command Parser', () => {
  it('should parse double-dash non-boolean arguments', () => {
    const commandParser: CommandParser = new CommandParser();

    commandParser.option('credentials', 'Credentials');
    commandParser.option('tunel', 'Tunel');

    const options: string = JSON.stringify(commandParser.parse([
      '/etc/openvpn/client/openvpn.conf',
      '--credentials',
      '/etc/openvpn/client/credentials.txt',
      '--tunel',
      '/etc/openvpn/client/config.ovpn'
    ]));

    const expected: string = JSON.stringify({
      argument: '/etc/openvpn/client/openvpn.conf',
      credentials: '/etc/openvpn/client/credentials.txt',
      tunel: '/etc/openvpn/client/config.ovpn'
    });

    expect(options).to.be.equal(expected);
  });

  it('should parse double-dash boolean arguments', () => {
    const commandParser: CommandParser = new CommandParser();

    commandParser.option('secure', 'Secure the VPN tunnel', NO_VALUE_EXPECTED);
    commandParser.option('tcp', 'Use TCP protocol', NO_VALUE_EXPECTED);

    const options: string = JSON.stringify(commandParser.parse([
      '/etc/openvpn/client/config.ovpn',
      '--secure',
      '--tcp'
    ]));

    const expected: string = JSON.stringify({
      argument: '/etc/openvpn/client/config.ovpn',
      secure: 'yes',
      tcp: 'yes'
    });

    expect(options).to.be.equal(expected);
  });

  it('should parse single-dash non-boolean arguments', () => {
    const commandParser: CommandParser = new CommandParser();

    commandParser.option('credentials', 'Credentials');
    commandParser.option('tunel', 'Tunel');

    const options: string = JSON.stringify(commandParser.parse([
      '/etc/openvpn/client/openvpn.conf',
      '-c',
      '/etc/openvpn/client/credentials.txt',
      '-t',
      '/etc/openvpn/client/config.ovpn'
    ]));

    const expected: string = JSON.stringify({
      argument: '/etc/openvpn/client/openvpn.conf',
      credentials: '/etc/openvpn/client/credentials.txt',
      tunel: '/etc/openvpn/client/config.ovpn'
    });

    expect(options).to.be.equal(expected);
  });

  it('should parse single-dash boolean arguments', () => {
    const commandParser: CommandParser = new CommandParser();

    commandParser.option('secure', 'Secure the VPN tunnel', NO_VALUE_EXPECTED);
    commandParser.option('tcp', 'Use TCP protocol', NO_VALUE_EXPECTED);

    const options: string = JSON.stringify(commandParser.parse([
      '/etc/openvpn/client/openvpn.conf',
      '-s',
      '-t'
    ]));

    const expected: string = JSON.stringify({
      argument: '/etc/openvpn/client/openvpn.conf',
      secure: 'yes',
      tcp: 'yes'
    });

    expect(options).to.be.equal(expected);
  });

  it('should parse single-dash single-token boolean arguments', () => {
    const commandParser: CommandParser = new CommandParser();

    commandParser.option('secure', 'Secure the VPN tunnel', NO_VALUE_EXPECTED);
    commandParser.option('tcp', 'Use TCP protocol', NO_VALUE_EXPECTED);

    const options: string = JSON.stringify(commandParser.parse([
      '/etc/openvpn/client/openvpn.conf',
      '-st',
    ]));

    const expected: string = JSON.stringify({
      argument: '/etc/openvpn/client/openvpn.conf',
      secure: 'yes',
      tcp: 'yes'
    });

    expect(options).to.be.equal(expected);
  });

  it('should parse single-dash single-token mixed arguments', () => {
    const commandParser: CommandParser = new CommandParser();

    commandParser.option('credentials', 'Credentials');
    commandParser.option('passthrough', 'Tunel to use');
    commandParser.option('secure', 'Secure the VPN tunnel', NO_VALUE_EXPECTED);
    commandParser.option('tcp', 'Use TCP protocol', NO_VALUE_EXPECTED);

    const options: string = JSON.stringify(commandParser.parse([
      '/etc/openvpn/client/openvpn.conf',
      '-stc',
      '/etc/openvpn/cilent/credentials.txt',
      '-p',
      '/etc/openvpn/cilent/config.ovpn'
    ]));

    const expected: string = JSON.stringify({
      argument: '/etc/openvpn/client/openvpn.conf',
      secure: 'yes',
      tcp: 'yes',
      credentials: '/etc/openvpn/cilent/credentials.txt',
      passthrough: '/etc/openvpn/cilent/config.ovpn'
    });

    expect(options).to.be.equal(expected);
  });

  it('should parse mixed-dash mixed-token mixed arguments', () => {
    const commandParser: CommandParser = new CommandParser();

    commandParser.option('credentials', 'Credentials');
    commandParser.option('passthrough', 'Tunel to use');
    commandParser.option('user', 'User to substitue to');
    commandParser.option('secure', 'Secure the VPN tunnel', NO_VALUE_EXPECTED);
    commandParser.option('tcp', 'Use TCP protocol', NO_VALUE_EXPECTED);

    const options: string = JSON.stringify(commandParser.parse([
      '/etc/openvpn/client/openvpn.conf',
      '-stc',
      '/etc/openvpn/cilent/credentials.txt',
      '-p',
      '/etc/openvpn/cilent/config.ovpn',
      '--user',
      'arch'
    ]));

    const expected: string = JSON.stringify({
      argument: '/etc/openvpn/client/openvpn.conf',
      secure: 'yes',
      tcp: 'yes',
      credentials: '/etc/openvpn/cilent/credentials.txt',
      passthrough: '/etc/openvpn/cilent/config.ovpn',
      user: 'arch'
    });

    expect(options).to.be.equal(expected);
  });

  it('should display the help correctly formated from the arguments', () => {
    const commandParser: CommandParser = new CommandParser();

    commandParser.option('credentials', 'File to where to find the OpenVPN credentials');
    commandParser.option('passthrough', 'File to where to find the OpenVPN configuration');
    commandParser.option('user', 'User to be substituted to before opening the tunnel');
    commandParser.option('secure', 'Use advanced maximum security features for the VPN tunnel', NO_VALUE_EXPECTED);
    commandParser.option('tcp', 'Use the TCP protocol instead of UDP', NO_VALUE_EXPECTED);

    const help = commandParser.help();

    const expected = `OPTIONS

    -h, --help
        Display this message

    -c, --credentials
        File to where to find the OpenVPN credentials

    -p, --passthrough
        File to where to find the OpenVPN configuration

    -u, --user
        User to be substituted to before opening the tunnel

    -s, --secure
        Use advanced maximum security features for the VPN tunnel

    -t, --tcp
        Use the TCP protocol instead of UDP`;

    expect(help).to.be.equal(expected);
  });

  it('should display the help correctly with same first letter arguments', () => {
    const commandParser: CommandParser = new CommandParser();

    commandParser.option('credentials', 'File to where to find the OpenVPN credentials');
    commandParser.option('configuration', 'File to where to find the OpenVPN configuration');
    commandParser.option('user', 'User to be substituted to before opening the tunnel');
    commandParser.option('secure', 'Use advanced maximum security features for the VPN tunnel', NO_VALUE_EXPECTED);
    commandParser.option('tcp', 'Use the TCP protocol instead of UDP', NO_VALUE_EXPECTED);

    const help = commandParser.help();

    const expected = `OPTIONS

    -h, --help
        Display this message

    -c, --credentials
        File to where to find the OpenVPN credentials

    --configuration
        File to where to find the OpenVPN configuration

    -u, --user
        User to be substituted to before opening the tunnel

    -s, --secure
        Use advanced maximum security features for the VPN tunnel

    -t, --tcp
        Use the TCP protocol instead of UDP`;

    expect(help).to.be.equal(expected);
  });

  it('should throw an error when providing a non-string as the first argument of the option method', () => {
    const parser = new CommandParser();

    // @ts-ignore
    expect(() => parser.option(123, 'Configuration', NO_VALUE_EXPECTED)).to.throw('[CommandParser][option] first argument should be of type string');
  });

  it('should throw an error when providing a non-string as the second argument of the option method', () => {
    const parser = new CommandParser();

    // @ts-ignore
    expect(() => parser.option('configuration', 123, NO_VALUE_EXPECTED)).to.throw('[CommandParser][option] second argument should be of type string');
  });

  it('should throw an error when providing a non-boolean as the third argument of the option method', () => {
    const parser = new CommandParser();

    // @ts-ignore
    expect(() => parser.option('configuration', 'Configuration', 'NO_VALUE_EXPECTED')).to.throw('[CommandParser][option] third argument should be of type boolean');
  });

  it('should throw an error when providing a non-array as the first argument of the parse method', () => {
    const parser = new CommandParser();

    // @ts-ignore
    expect(() => parser.parse({})).to.throw('[CommandParser][parse] first argument must be of type array');
  });

  it('should throw an error if one or more element of the first argument is a non-string for the parse method', () => {
    const parser = new CommandParser();

    // @ts-ignore
    expect(() => parser.parse([123])).to.throw('[CommandParser][parse] all elements of the first argument must be of type string');
  });

  it('should add all the unexpected option in the argument property for the method parse', () => {
    const parser = new CommandParser();

    const options = JSON.stringify(parser.parse([
      '--unexpected',
      '/etc/openvpn/client/openvpn.conf'
    ]));

    const expected = JSON.stringify({
      argument: '--unexpected /etc/openvpn/client/openvpn.conf'
    });

    expect(options).to.be.equal(expected);
  });

  it('should trigger the help when using the --help parameter for the parse method', () => {
    const parser = new CommandParser();

    const consoleCalled = consoleLogOutputCorrectly(() => parser.parse([ '--help' ]), `OPTIONS

    -h, --help
        Display this message`);

    expect(consoleCalled).to.be.true;
  });

  it('should use the fallback process argument instead of an array for the method parse', () => {
    const parser = new CommandParser();

    process.argv = [
      '/usr/local/bin/node',
      '/home/node/app/index.js',
      '--file',
      '/etc/openvpn/client/openvpn.conf'
    ];

    parser.option('file', 'File to use for the OpenVPN connection');

    const result = JSON.stringify(parser.parse());

    const expected = JSON.stringify({
      file: '/etc/openvpn/client/openvpn.conf'
    });

    expect(result).to.be.equal(expected);
  });

  it('should not append the value if a parameter is missing its value', () => {
    const parser = new CommandParser();

    parser.option('secure', 'Secure the tunel', NO_VALUE_EXPECTED);
    parser.option('file', 'File to be used for the OpenVPN connection');

    const result = JSON.stringify(parser.parse([
      '--secure',
      '--file'
    ]));

    const expected = JSON.stringify({
      secure: 'yes',
      argument: '--file'
    });

    expect(result).to.be.equal(expected);
  });
});