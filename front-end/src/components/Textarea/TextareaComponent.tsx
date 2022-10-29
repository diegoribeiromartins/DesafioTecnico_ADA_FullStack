import { ChangeEvent, FC } from "react";
import "./styles.css";

interface TextareaComponentProps {
  value: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void | Promise<void>;
}

const TextareaComponent: FC<TextareaComponentProps> = ({
  value,
  placeholder = "",
  onChange,
}) => {
  return (
    <textarea
      placeholder={placeholder}
      onChange={onChange}
      className="TextareaComponent__Textarea"
      value={value}
      rows={4}
    ></textarea>
  );
};

export default TextareaComponent;
