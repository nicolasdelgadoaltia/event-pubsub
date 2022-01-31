import { useCallback, useEffect, useMemo, useState } from 'react';
import { collectionsAreEqual } from '../utils/collection';
import { TopicSubscription } from '../types';
import pubSub from '../utils/pubsub';

interface Props {
  topicSubscriptions?: TopicSubscription[];
}

const usePubSub = ({ topicSubscriptions }: Props) => {
  const [listeners, setListeners] = useState<TopicSubscription[]>([]);
  const { listen, publish, removeListener, init, close } = pubSub;

  useEffect(() => {
    init && init();
  }, []);
  useEffect(() => {
    return () => {
      if (close) {
        close();
      }
    };
  }, []);

  const hasListeners = useMemo(
    () => topicSubscriptions && topicSubscriptions.length > 0,
    [topicSubscriptions]
  );
  const pendingListenersToRemove = useMemo(
    () => listeners.length > 0,
    [listeners]
  );

  const removeListeners = useCallback(() => {
    listeners.forEach(({ topic, callback }) => removeListener(topic, callback));
    setListeners([]);
  }, [listeners]);

  useEffect(() => {
    if (hasListeners && !collectionsAreEqual(topicSubscriptions, listeners)) {
      if (pendingListenersToRemove) {
        removeListeners();
      }
      if (topicSubscriptions) {
        topicSubscriptions.forEach(({ topic, callback }) =>
          listen(topic, callback)
        );
        setListeners([...topicSubscriptions]);
      }
    }
  }, [topicSubscriptions]);

  useEffect(() => {
    return () => {
      if (hasListeners && pendingListenersToRemove) {
        removeListeners();
      }
    };
  }, []);
  return publish;
};

export default usePubSub;
