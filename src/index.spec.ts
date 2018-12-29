import { CommandParser, NO_VALUE_EXPECTED } from './index';
import { expect } from 'chai';
import 'mocha';

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

});