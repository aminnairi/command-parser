import { CommandParser, NO_VALUE_EXPECTED } from './index';
import { expect } from 'chai';
import 'mocha';

describe('Command Parser', () => {
  it('should parse double-dash non-boolean argument', () => {
    const commandParser = new CommandParser();

    commandParser.add('credentials', 'Credentials');

    const options = JSON.stringify(commandParser.parse([
      '--credentials',
      '/etc/openvpn/client/credentials.txt'
    ]));

    const expected = JSON.stringify({
      credentials: '/etc/openvpn/client/credentials.txt'
    });

    expect(options).to.be.equal(expected);
  });

  it('should parse multiple double-dash non-boolean arguments', () => {
    const commandParser = new CommandParser();

    commandParser.add('credentials', 'Credentials');
    commandParser.add('tunel', 'Tunel');

    const options = JSON.stringify(commandParser.parse([
      '--credentials',
      '/etc/openvpn/client/credentials.txt',
      '--tunel',
      '/etc/openvpn/client/config.ovpn'
    ]));

    const expected = JSON.stringify({
      credentials: '/etc/openvpn/client/credentials.txt',
      tunel: '/etc/openvpn/client/config.ovpn'
    });

    expect(options).to.be.equal(expected);
  });

  it('should parse double-dash boolean argument', () => {
    const commandParser = new CommandParser();

    commandParser.add('secure', 'Secure the VPN tunnel', NO_VALUE_EXPECTED);

    const options = commandParser.parse([
      '--secure'
    ]);

    expect(JSON.stringify(options)).to.be.equal(JSON.stringify({
      secure: 'yes'
    }));
  });
});