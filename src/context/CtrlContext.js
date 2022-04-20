import { createContext, useReducer } from "react";
import dayjs from "dayjs";
import { getToday } from "../util";

export const CtrlContext = createContext();

export const CtrlReducer = (state, action) => {
  switch (action.type) {
    case "NEXT_MONTH":
      return { ...state, monthIndex: ++state.monthIndex };
    case "PREV_MONTH":
      return { ...state, monthIndex: --state.monthIndex };
    case "TODAY":
      return { ...state, monthIndex: dayjs().month(), pickDay: getToday() };
    case "TOGGLE_SIDEBAR":
      return { ...state, sidebar: !state.sidebar };
    case "SELECT_DAY":
      return { ...state, pickDay: +action.payload };
    case "SELECT_DAY_MONTH":
      return { ...state, pickDay: +action.payload ,
      monthIndex:dayjs(+action.payload).month()};
    default:
      return state;
  }
};

export const CtrlContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CtrlReducer, {
    monthIndex: dayjs().month(),
    change: false,
    pickDay: getToday(),
    sidebar: true,
  });
  return (
    <CtrlContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CtrlContext.Provider>
  );
};
