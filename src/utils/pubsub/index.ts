import BroadcastChannelProvider from './providers/broadcastChannel';
import CustomEventsProvider from './providers/customEvent';
import { PubSubProvider } from './types';

const pubSub: PubSubProvider = BroadcastChannelProvider;

export default pubSub;
