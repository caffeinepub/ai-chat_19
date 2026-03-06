import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Message {
    content: string;
    role: string;
    timestamp: Time;
}
export type Time = bigint;
export interface Conversation {
    id: bigint;
    title: string;
    messages: Array<Message>;
    createdAt: Time;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addMessage(conversationId: bigint, role: string, content: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createConversation(title: string): Promise<bigint>;
    deleteConversation(conversationId: bigint): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getConversation(conversationId: bigint): Promise<Conversation | null>;
    getConversations(offset: bigint, limit: bigint): Promise<Array<Conversation>>;
    getMessages(conversationId: bigint): Promise<Array<Message>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateConversationTitle(conversationId: bigint, newTitle: string): Promise<void>;
}
