import {
  useMessageNotificationSubscription,
  useReadConversationMutation,
  Message,
  Conversation,
} from "@generated/graphql";
import React, { useEffect, useReducer } from "react";

type MessagesState = {
  show: "recent" | "conversation" | "info";
  conversationId?: number;
  filter: string;
  conversationCursors: string[];
  messageCursors: string[];
  localConversations: Partial<Conversation>[];
  localMessages: Partial<Message>[];
};

type Action = {
  type: MessageActionTypes;
  payload?: any;
};

type MessageActionTypes =
  | "newMessageNotification"
  | "switchConversations"
  | "closeConversation"
  | "showInfo"
  | "closeInfo"
  | "setFilter"
  | "startNewConversation"
  | "loadMoreConversations"
  | "loadMoreMessages"
  | "newMessage"
  | "readConversation";

const initialState: MessagesState = {
  show: "recent",
  conversationId: undefined,
  filter: "",
  conversationCursors: [null],
  messageCursors: [null],
  localConversations: [],
  localMessages: [],
};

export const MessagesContext = React.createContext<{
  state: MessagesState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

const reducer = (
  state: MessagesState,
  { payload, type }: Action
): MessagesState => {
  switch (type) {
    case "newMessageNotification":

      const filteredNMN = state.localConversations.filter(
        (c) => c.id !== payload.conversationId
      );
      const newConversationNMN = {
        id: payload.conversationId,
        latest: {
          ...payload,
          read: state.conversationId === payload.conversationId,
        },
        partner: { ...payload.author },
      };
      return {
        ...state,
        localMessages: [payload, ...state.localMessages],
        localConversations: [newConversationNMN, ...filteredNMN],
      };
    case "closeConversation":
      return {
        ...state,
        conversationId: null,
        show: "recent",
        localMessages: [],
      };

    case "showInfo":
      return { ...state, show: "info" };

    case "closeInfo":
      return { ...state, show: "conversation" };

    case "newMessage":
      console.log(state.localConversations);
      const filteredNM = state.localConversations.filter(
        (c) => c.id !== payload.conversationId
      );
      console.log(payload);
      const newConversationNM = {
        id: payload.conversationId,
        latest: {
          ...payload.message,
          read: false,
          authorId: payload.message.author.id,
        },
        partner: undefined,
      };
      return {
        ...state,
        localMessages: [payload.message, ...state.localMessages],
        localConversations: [newConversationNM, ...filteredNM],
      };

    case "setFilter":
      return {
        ...state,
        conversationCursors: [null],
        localConversations: [],
        filter: payload.filter,
      };

    case "switchConversations":
      console.log(payload);
      return {
        ...state,
        show: "conversation",
        conversationId: payload.conversationId,
        messageCursors: [null],
        localMessages: [],
      };

    case "startNewConversation":
      return { ...state, show: "conversation", conversationCursors: [null] };

    case "loadMoreConversations":
      return {
        ...state,
        conversationCursors: [...state.conversationCursors, payload.cursor],
      };

    case "loadMoreMessages":
      return {
        ...state,
        messageCursors: [...state.messageCursors, payload.cursor],
      };

    case "readConversation":
      payload.readConversation({ conversationId: state.conversationId });
      return { ...state };

    default:
      return { ...state };
  }
};

export const MessagesProvider: React.FC<{}> = ({ children }) => {
  //State management
  const [state, dispatch] = useReducer(reducer, initialState);

  //API
  const [{ data }] = useMessageNotificationSubscription();
  const [, readConversation] = useReadConversationMutation();
  const latestNotification = data ? data.messageNotification : null;

  useEffect(() => {
    if (latestNotification) {
      dispatch({ type: "newMessageNotification", payload: latestNotification });
    }
  }, [latestNotification]);

  useEffect(() => {
    if (!state.conversationId) {
      return;
    }

    dispatch({
      type: "readConversation",
      payload: { readConversation: readConversation },
    });
  }, [state.conversationId]);

  return (
    <MessagesContext.Provider value={{ state, dispatch }}>
      {children}
    </MessagesContext.Provider>
  );
};
