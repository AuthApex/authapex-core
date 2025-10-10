export interface WebSocketUserIdEventData {
  userId: string;
}

export interface WebSocketUserUpdateEvent {
  type: 'user-update';
  data: WebSocketUserIdEventData;
}
export interface WebSocketSessionDeleteEvent {
  type: 'session-deleted';
  data: WebSocketUserIdEventData;
}

export type WebSocketEvent = WebSocketUserUpdateEvent | WebSocketSessionDeleteEvent;
