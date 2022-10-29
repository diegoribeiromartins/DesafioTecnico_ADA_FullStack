import { FC } from "react";
import { GlobalContext } from "../contexts";
import { ChildrenProp } from "../types";

const GlobalContextProvider: FC<ChildrenProp> = ({ children }) => {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};

export default GlobalContextProvider;
