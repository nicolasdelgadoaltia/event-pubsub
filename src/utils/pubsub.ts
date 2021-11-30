import { sameFunctions } from './functions';

const namespace = 'mfe-event-messages';

type topicType = string;
type listenerCallback = (data?: any) => void;

const listeners: any = {};

export const listen = (topic: topicType, callback: listenerCallback) => {
  if (!listeners[topic]) {
    listeners[topic] = [callback];
    window.addEventListener(`${namespace}:${topic}`, (event) => {
      listeners[topic].forEach((listenerCallback: any) => {
        listenerCallback((<CustomEvent>event).detail);
      });
    });
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
  const listenerToRemove = listeners[topic].find((v: any) =>
    sameFunctions(v, callback)
  );
  if (listenerToRemove) {
    listeners[topic].splice(listeners[topic].indexOf(listenerToRemove), 1);
    if (listeners[topic].length === 0) {
      window.removeEventListener(`${namespace}:${topic}`, callback);
    }
  }
};
