import {
  useMessageNotificationSubscription,
  useReadConversationMutation,
} from "@generated/graphql";
import React, { useEffect, useReducer } from "react";

type MessagesState = {
  show: "recent" | "conversation" | "info";
  conversationId?: number;
  filter: string;
  conversationCursors: string[];
  messageCursors: string[];
  localMessages: any[];
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
      const conversationCursors =
        state.filter.length > 0 ? state.conversationCursors : [null];
      return {
        ...state,
        conversationCursors,
        localMessages: [payload, ...state.localMessages],
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
      return {
        ...state,
        localMessages: [payload.message, ...state.localMessages],
      };

    case "setFilter":
      return {
        ...state,
        conversationCursors: [null],
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
