import { FC, ChangeEvent, useContext, useEffect, useState } from "react";
import {
  MdCheckCircleOutline,
  MdEdit,
  MdDelete,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineCancel,
} from "react-icons/md";
import {
  ButtonComponent,
  InputComponent,
  MarkdownComponent,
  TextareaComponent,
} from "../../components";
import { useHttp } from "../../hooks";
import {
  CardEntity,
  CreateCardService,
  DeleteCardsService,
  ListaType,
  UpdateCardService,
} from "../../services";
import { GlobalContext } from "../../shared/contexts";
import "./styles.css";

interface CardItemContainerProps {
  card: CardEntity;
}

const CardItemContainer: FC<CardItemContainerProps> = ({ card: CardData }) => {
  const api = useHttp();
  const { cards, setCards } = useContext(GlobalContext);
  const [edit, setEdit] = useState<boolean>(false);
  const [card, setCard] = useState<CardEntity>(CardData);

  useEffect(() => {
    if (!card.id) setEdit(true);
  }, [card]);

  const handleUpdateCard = async (cardEdited: CardEntity) => {
    UpdateCardService(api, card.id.toString(), cardEdited).then(
      async ({ data }) => {
        const updatedCard = await data;
        const cardsList = [...(cards || [])];
        const updatedCardIndex = cardsList.findIndex((cr) => cr.id === card.id);
        cardsList[updatedCardIndex] = updatedCard[0];
        setCards(cardsList);
        setEdit(false);
        setCard(updatedCard[0]);
      }
    );
  };

  const handleCancelUpdateCard = () => {
    setCard(CardData);
    setEdit(false);
  };

  const handleCreateCard = async () => {
    CreateCardService(api, card).then(async ({ data }) => {
      const newCard = await data;
      const cardsList = [...(cards || [])];
      const newCardIndex = cardsList.findIndex((cr) => !cr.id);
      cardsList[newCardIndex] = newCard[0];
      setCards(cardsList);
    });
  };

  const handleCancelCreateCard = () => {
    const cardsWithoutThis = cards?.filter((card) => !!card.id) || [];
    setCards(cardsWithoutThis);
  };

  const handleDeleteCard = () => {
    DeleteCardsService(api, card.id.toString()).then(({ data }) => {
      const cardsList = [...(cards || [])].filter((cr) => cr.id !== card.id);
      setCards(cardsList);
    });
  };

  const handleListTransferCard = async (changeTo: "left" | "right") => {
    let toList: ListaType = "ToDo";
    const position: ListaType = card.lista;

    if (changeTo === "left") {
      switch (position) {
        case "ToDo":
          break;
        case "Doing":
          toList = "ToDo";
          break;
        case "Done":
          toList = "Doing";
          break;
      }
    } else {
      switch (position) {
        case "ToDo":
          toList = "Doing";
          break;
        case "Doing":
          toList = "Done";
          break;
        case "Done":
          break;
      }
    }

    const cardDataUpdate = { ...card, lista: toList };
    await handleUpdateCard(cardDataUpdate);
  };

  const handleChangeTitulo = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const newData = { ...card };
    newData.titulo = target.value;
    setCard(newData);
  };

  const handleChangeConteudo = ({
    target,
  }: ChangeEvent<HTMLTextAreaElement>) => {
    const newData = { ...card };
    newData.conteudo = target.value;
    setCard(newData);
  };

  return (
    <div className="CardItemContainer__Wrapper">
      <div className="CardItemContainer__Wrapper__Header">
        {!edit && card.lista !== "ToDo" && (
          <div>
            <ButtonComponent
              icon
              onClick={() => handleListTransferCard("left")}
            >
              <MdKeyboardArrowLeft />
            </ButtonComponent>
          </div>
        )}

        <div>{!!card.id ? `#${card.id}` : "Novo item"}</div>

        {!edit && card.lista !== "Done" && (
          <div>
            <ButtonComponent
              icon
              onClick={() => handleListTransferCard("right")}
            >
              <MdKeyboardArrowRight />
            </ButtonComponent>
          </div>
        )}
      </div>

      <div className="CardItemContainer__Wrapper__Titulo">
        {edit ? (
          <InputComponent
            value={card.titulo}
            onChange={handleChangeTitulo}
            placeholder="Preencha o título"
          />
        ) : (
          card.titulo
        )}
      </div>

      <div className="CardItemContainer__Wrapper__Conteudo">
        {edit ? (
          <TextareaComponent
            value={card.conteudo}
            onChange={handleChangeConteudo}
            placeholder="Preencha o conteúdo"
          />
        ) : (
          <MarkdownComponent text={card.conteudo} />
        )}
      </div>

      <div className="CardItemContainer__Wrapper__Options">
        {edit && (
          <>
            <ButtonComponent
              icon
              onClick={
                !!card.id ? handleCancelUpdateCard : handleCancelCreateCard
              }
            >
              <MdOutlineCancel />
            </ButtonComponent>
            <ButtonComponent
              icon
              disabled={card.titulo.length < 2 || card.conteudo.length < 2}
              onClick={
                !!card.id ? () => handleUpdateCard(card) : handleCreateCard
              }
            >
              <MdCheckCircleOutline />
            </ButtonComponent>
          </>
        )}

        {!edit && (
          <>
            <ButtonComponent icon onClick={() => setEdit(true)}>
              <MdEdit />
            </ButtonComponent>
            <ButtonComponent icon onClick={handleDeleteCard}>
              <MdDelete />
            </ButtonComponent>
          </>
        )}
      </div>
    </div>
  );
};

export default CardItemContainer;
