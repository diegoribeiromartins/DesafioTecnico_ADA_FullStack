import { FC } from "react";
import { ChildrenProp } from "../../shared/types";
import "./styles.css";

interface ButtonComponentProps extends ChildrenProp {
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
  icon?: boolean;
}

const ButtonComponent: FC<ButtonComponentProps> = ({
  children,
  disabled = false,
  icon = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`Components__Btn ${icon ? "Components__Btn__Icon" : ""}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
