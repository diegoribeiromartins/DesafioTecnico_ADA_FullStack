import { FC } from "react";
import { ChildrenProp } from "../types";
import GlobalContextProvider from "./GlobalContextProvider";

const AppProvider: FC<ChildrenProp> = ({ children }) => {
  return <GlobalContextProvider>{children}</GlobalContextProvider>;
};

export default AppProvider;
