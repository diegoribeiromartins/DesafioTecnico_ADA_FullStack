import { ChangeEvent, FC } from "react";
import "./styles.css";

interface InputComponentProps {
  value: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputComponent: FC<InputComponentProps> = ({
  value,
  placeholder = "",
  onChange,
}) => {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="InputComponent__Input"
    />
  );
};

export default InputComponent;
