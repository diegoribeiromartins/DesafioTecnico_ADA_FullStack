import { FC, useState } from "react";
import { CardItemContainer } from "../../containers";
import { CardEntity } from "../../services/card";

interface ListComponentProps {
  items: CardEntity[];
}

const ListComponent: FC<ListComponentProps> = ({ items }) => {
  return (
    <div>
      {items.map((card) => (
        <CardItemContainer card={card} />
      ))}
    </div>
  );
};

export default ListComponent;
