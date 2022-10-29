import { FC } from "react";
import { ChildrenProp } from "../../shared/types";

interface ButtonComponentProps extends ChildrenProp {}

const ButtonComponent: FC<ButtonComponentProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default ButtonComponent;
