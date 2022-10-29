import { FC } from "react";
import { ChildrenProp } from "../types";

const AppProvider: FC<ChildrenProp> = ({ children }) => {
  return <div>{children}</div>;
};

export default AppProvider;
