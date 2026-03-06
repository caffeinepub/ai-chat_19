import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type Message = {
    role : Text;
    content : Text;
    timestamp : Time.Time;
  };

  module Message {
    public func compare(message1 : Message, message2 : Message) : Order.Order {
      Int.compare(message1.timestamp, message2.timestamp);
    };
  };

  type Conversation = {
    id : Nat;
    title : Text;
    messages : [Message];
    createdAt : Time.Time;
  };

  module Conversation {
    public func compareByCreatedAt(conversation1 : Conversation, conversation2 : Conversation) : Order.Order {
      Int.compare(conversation1.createdAt, conversation2.createdAt);
    };

    public func compareById(conversation1 : Conversation, conversation2 : Conversation) : Order.Order {
      Nat.compare(conversation1.id, conversation2.id);
    };
  };

  public type UserProfile = {
    name : Text;
  };

  var nextConversationId = 0;
  let conversations = Map.empty<Principal, Map.Map<Nat, Conversation>>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getConversations(offset : Nat, limit : Nat) : async [Conversation] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view conversations");
    };

    let conversationsForCaller = switch (conversations.get(caller)) {
      case (null) { return [] };
      case (?map) { map };
    };

    conversationsForCaller.values().toArray().sort(Conversation.compareByCreatedAt).sliceToArray(offset, offset + limit);
  };

  public shared ({ caller }) func createConversation(title : Text) : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can create conversations");
    };

    let conversation = {
      id = nextConversationId;
      title;
      messages = [];
      createdAt = Time.now();
    };

    let userConversations = switch (conversations.get(caller)) {
      case (null) { Map.empty<Nat, Conversation>() };
      case (?map) { map };
    };

    userConversations.add(nextConversationId, conversation);
    conversations.add(caller, userConversations);

    let id = nextConversationId;
    nextConversationId += 1;
    id;
  };

  public shared ({ caller }) func addMessage(conversationId : Nat, role : Text, content : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can add messages");
    };

    let userConversations = switch (conversations.get(caller)) {
      case (null) { Map.empty<Nat, Conversation>() };
      case (?map) { map };
    };

    switch (userConversations.get(conversationId)) {
      case (null) { Runtime.trap("Conversation not found") };
      case (?conversation) {
        let message : Message = {
          role;
          content;
          timestamp = Time.now();
        };
        let updatedConversation = {
          conversation with
          messages = conversation.messages.concat([message]);
        };
        userConversations.add(conversationId, updatedConversation);
        conversations.add(caller, userConversations);
      };
    };
  };

  public query ({ caller }) func getMessages(conversationId : Nat) : async [Message] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view messages");
    };

    let userConversations = switch (conversations.get(caller)) {
      case (null) { return [] };
      case (?map) { map };
    };

    switch (userConversations.get(conversationId)) {
      case (null) { [] };
      case (?conversation) { conversation.messages.sort() };
    };
  };

  public shared ({ caller }) func deleteConversation(conversationId : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can delete conversations");
    };

    let userConversations = switch (conversations.get(caller)) {
      case (null) { Runtime.trap("No conversations found") };
      case (?map) { map };
    };

    if (not userConversations.containsKey(conversationId)) {
      Runtime.trap("Conversation not found");
    };

    userConversations.remove(conversationId);
    conversations.add(caller, userConversations);
  };

  public shared ({ caller }) func updateConversationTitle(conversationId : Nat, newTitle : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can update conversation titles");
    };

    let userConversations = switch (conversations.get(caller)) {
      case (null) { Map.empty<Nat, Conversation>() };
      case (?map) { map };
    };

    switch (userConversations.get(conversationId)) {
      case (null) { Runtime.trap("Conversation not found") };
      case (?conversation) {
        let updatedConversation = {
          conversation with title = newTitle;
        };
        userConversations.add(conversationId, updatedConversation);
        conversations.add(caller, userConversations);
      };
    };
  };

  public query ({ caller }) func getConversation(conversationId : Nat) : async ?Conversation {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view conversations");
    };

    switch (conversations.get(caller)) {
      case (null) { null };
      case (?userConversations) { userConversations.get(conversationId) };
    };
  };
};
