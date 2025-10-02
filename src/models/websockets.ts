import { UserVariable } from '@/models/user';

export interface WebSocketUserUpdateEventData {
  userId: string;
  updatedUser: UserVariable;
}

export interface WebSocketUserDeleteEventData {
  userId: string;
}

export interface WebSocketUserUpdateEvent {
  type: 'user-update';
  data: WebSocketUserUpdateEventData;
}

export interface WebSocketUserDeleteEvent {
  type: 'user-deleted';
  data: WebSocketUserDeleteEventData;
}

export type WebSocketEvent = WebSocketUserUpdateEvent | WebSocketUserDeleteEvent;
