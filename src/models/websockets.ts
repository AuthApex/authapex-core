export interface WebSocketUserIdEventData {
  userId: string;
}

export interface WebSocketUserUpdateEvent {
  type: 'user-update';
  data: WebSocketUserIdEventData;
}

export interface WebSocketUserDeleteEvent {
  type: 'user-deleted';
  data: WebSocketUserIdEventData;
}

export type WebSocketEvent = WebSocketUserUpdateEvent | WebSocketUserDeleteEvent;
