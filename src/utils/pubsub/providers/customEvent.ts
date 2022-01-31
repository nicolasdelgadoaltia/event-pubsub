import { listenerCallback, PubSubProvider, topicType } from '../types';
import { sameFunctions } from '../../functions';

const namespace = 'mfe-event-messages';

let listeners = {};

export const listen = (topic: topicType, callback: listenerCallback) => {
  if (!listeners[topic]) {
    listeners[topic] = [callback];
    window.addEventListener(`${namespace}:${topic}`, (event) => {
      listeners[topic].forEach((listenerCallback) => {
        listenerCallback((<CustomEvent>event).detail);
      });
    });
  } else {
    listeners[topic] = [...listeners[topic], callback];
  }
};

export const publish = <T>(topic: topicType, data: T) => {
  window.dispatchEvent(
    new CustomEvent(`${namespace}:${topic}`, { detail: data })
  );
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
    if (listeners[topic].length === 0) {
      window.removeEventListener(`${namespace}:${topic}`, callback);
    }
  }
};

const CustomEventsProvider: PubSubProvider = {
  listen,
  publish,
  removeListener,
};

export default CustomEventsProvider;
