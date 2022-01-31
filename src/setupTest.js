export class BroadcastChannelMock {
  close() {}
  onmessage() {}
  postMessage() {}
}

global.BroadcastChannel = BroadcastChannelMock;
