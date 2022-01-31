import { listenerCallback, PubSubProvider, topicType } from '../types';
import { sameFunctions } from '../../functions';

interface BroadcastMessage {
  topic: topicType;
  payload: any;
}

const namespace = 'mfe-event-messages';

export const listeners = {};

export let channel: BroadcastChannel = null;

export const init = () => {
  channel = new BroadcastChannel(namespace);
};
export const close = () => {
  channel.close();
  channel = null;
};

export const listen = (topic: topicType, callback: listenerCallback) => {
  if (!listeners[topic]) {
    listeners[topic] = [callback];
    channel.onmessage = (event) => {
      const { topic, payload }: BroadcastMessage = (<MessageEvent>event).data;
      if (listeners[topic]) {
        listeners[topic].forEach((listenerCallback) => {
          listenerCallback(payload);
        });
      }
    };
  } else {
    listeners[topic] = [...listeners[topic], callback];
  }
};

export const publish = <T>(topic: topicType, data: T) => {
  const message: BroadcastMessage = {
    topic,
    payload: data,
  };
  channel.postMessage(message);
};

export const removeListener = (
  topic: topicType,
  callback: listenerCallback
) => {
  const listenerToRemove = listeners[topic].find((v) =>
    sameFunctions(v, callback)
  );
  if (listenerToRemove) {
    listeners[topic].splice(listeners[topic].indexOf(listenerToRemove), 1);
  }
};

const BroadcastChannelProvider: PubSubProvider = {
  init,
  close,
  listen,
  publish,
  removeListener,
};

export default BroadcastChannelProvider;
