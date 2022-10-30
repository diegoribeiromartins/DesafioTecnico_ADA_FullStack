import { FC } from "react";
import { marked } from "marked";

interface MarkdownComponentProps {
  text: string;
}

const MarkdownComponent: FC<MarkdownComponentProps> = ({ text }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: marked(text, { sanitize: true }) }}
    ></div>
  );
};

export default MarkdownComponent;
