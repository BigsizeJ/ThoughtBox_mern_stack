import React, { ReactNode, createContext, useReducer } from "react";

export enum StoreType {
  GET_USER = "get_user",
  GET_USER_THOUGHTS = "get_user_thoughts",
  GET_THOUGHTS = "get_thoughts",
  GET_THOUGHT = "get_thought",
  VIEWED_THOUGHT = "viewed_thought",
  UPDATE_HEART_OF_VIEWED_THOUGHT = "update_heart_of_viewed_thought",
  UPDATE_REPLY_OF_VIEWED_THOUGHT = "update_reply_of_viewed_thought",
  POST_REPLY_FROM_VIEWED_THOUGHT = "post_reply_from_viewed_thought",
}

interface StoreState {
  user: { name: string; picture: string; email: string };
  thoughts: any;
  viewedThought: any;
  userThoughts: any;
}

interface StoreAction {
  type: StoreType;
  payload: any;
}

export const StoreContext = createContext<any>({});

const StoreReducer = (state: StoreState, action: StoreAction) => {
  switch (action.type) {
    case StoreType.GET_USER:
      return { ...state, user: action.payload };
    case StoreType.GET_THOUGHTS:
      return { ...state, thoughts: action.payload };
    case StoreType.GET_USER_THOUGHTS:
      return { ...state, userThoughts: action.payload };
    case StoreType.GET_THOUGHT:
      return {
        ...state,
        thoughts: state.thoughts.map((t: any) => {
          if (t._id === action.payload.thought_id)
            return action.payload.thought;
          return t;
        }),
      };
    case StoreType.VIEWED_THOUGHT:
      return {
        ...state,
        viewedThought: action.payload,
      };
    case StoreType.UPDATE_HEART_OF_VIEWED_THOUGHT:
      return {
        ...state,
        viewedThought: { ...state.viewedThought, hearts: action.payload },
      };
    case StoreType.UPDATE_REPLY_OF_VIEWED_THOUGHT:
      return {
        ...state,
        viewedThought: {
          ...state.viewedThought,
          interactions: state.viewedThought.interactions.map((comment: any) => {
            if (comment._id === action.payload)
              return { ...comment, isReplying: !comment.isReplying };
            return { ...comment, isReplying: false };
          }),
        },
      };

    default:
      return state;
  }
};

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(StoreReducer, {
    user: null,
    thoughts: null,
    userThoughts: null,
    viewedThought: null,
  });

  return (
    <StoreContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
