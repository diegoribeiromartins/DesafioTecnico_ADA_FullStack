import { FC } from "react";
import { CardItemContainer } from "../../containers";
import { CardEntity, ListaType } from "../../services";
import "./styles.css";

interface ListComponentProps {
  items: CardEntity[];
  list: ListaType;
}

const listNameOptions = {
  ToDo: "To do",
  Doing: "Doing",
  Done: "Done",
};

const ListComponent: FC<ListComponentProps> = ({ items, list }) => {
  const listName = listNameOptions[list];

  return (
    <div className="ListComponent__Wrapper">
      <div className="ListComponent__Wrapper__Lista">{listName}</div>
      {items.length > 0 && (
        <div className="ListComponent__Wrapper__Items">
          {items.map((card) => (
            <CardItemContainer
              card={card}
              key={`item-list-card-${card.id || "New___Card"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListComponent;
