export type topicType = string;
export type listenerCallback = (data?: any) => void;

export interface PubSubProvider {
  init?: () => void;
  close?: () => void;
  listen: (topic: topicType, callback: listenerCallback) => void;
  publish: <T>(topic: topicType, data: T) => void;
  removeListener: (topic: topicType, callback: listenerCallback) => void;
}
