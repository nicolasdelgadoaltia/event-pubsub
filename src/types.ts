export interface TopicSubscription {
  topic: string;
  callback: (data: any) => void;
}
