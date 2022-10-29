import { FC, useContext, useEffect, useState } from "react";
import { CardEntity, ListaType } from "../../services";
import { GlobalContext } from "../../shared/contexts";

interface CardItemContainerProps {
  card: CardEntity;
}

const CardItemContainer: FC<CardItemContainerProps> = ({ card: CardData }) => {
  const { cards, setCards } = useContext(GlobalContext);
  const [edit, setEdit] = useState<boolean>(false);
  const [card, setCard] = useState<CardEntity>(CardData);

  useEffect(() => {
    if (!card.id) setEdit(true);
  }, [card]);

  const handleUpdateCard = async () => {};

  const handleCancelUpdateCard = () => {
    setCard(CardData);
    setEdit(false);
  };

  const handleCreateCard = async () => {};

  const handleCancelCreateCard = () => {
    const cardsWithoutThis = cards?.filter((card) => !!card.id) || [];
    setCards(cardsWithoutThis);
  };

  const handleListTransferCard = async (toList: ListaType) => {
    const cardDataUpdate = { ...card, lista: toList };
    setCard(cardDataUpdate);
    await handleUpdateCard();
  };

  return <div>CardItemContainer</div>;
};

export default CardItemContainer;
