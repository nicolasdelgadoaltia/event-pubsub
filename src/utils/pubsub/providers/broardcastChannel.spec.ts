import { channel, init, close, listen, listeners } from './broadcastChannel';
import { BroadcastChannelMock } from '../../../setupTest';

describe('init()', () => {
  test('Creates Broadcast channel', () => {
    expect(channel).toBeNull();
    init();
    expect(channel).toStrictEqual(new BroadcastChannelMock());
  });
});
describe('close()', () => {
  test('Closes Broadcast channel', () => {
    init();
    expect(channel).toStrictEqual(new BroadcastChannelMock());
    close();
    expect(channel).toBeNull();
  });
});
