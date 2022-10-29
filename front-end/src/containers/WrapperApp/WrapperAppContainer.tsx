import { FC, useContext, useEffect, useMemo } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import { ButtonComponent, ListComponent } from "../../components";
import { useHttp } from "../../hooks";
import { CardEntity, GetCardsService } from "../../services";
import { GlobalContext } from "../../shared/contexts";
import "./styles.css";

const WrapperAppContainer: FC = () => {
  const { cards, setCards } = useContext(GlobalContext);
  const api = useHttp();

  useEffect(() => {
    GetCardsService(api).then(async ({ data }) => {
      const cards = await data;
      setCards(cards);
    });
  }, []);

  const TodoCards = useMemo(
    () => cards?.filter((card) => card.lista === "ToDo") || [],
    [cards]
  );
  const DoingCards = useMemo(
    () => cards?.filter((card) => card.lista === "Doing") || [],
    [cards]
  );
  const DoneCards = useMemo(
    () => cards?.filter((card) => card.lista === "Done") || [],
    [cards]
  );

  const handleAddCard = () => {
    const newCard: CardEntity[] = [
      {
        id: 0,
        titulo: "",
        conteudo: "",
        lista: "ToDo",
      },
    ];

    setCards(cards?.concat(newCard) || []);
  };

  const canAddCard = useMemo(() => !!cards?.find((card) => !card.id), [cards]);

  return (
    <>
      <header>
        <ButtonComponent onClick={handleAddCard} disabled={canAddCard}>
          <MdCreateNewFolder />
          Criar item
        </ButtonComponent>
      </header>

      <section className="WrapperAppContainer__Section">
        <ListComponent items={TodoCards} list="ToDo" />
        <ListComponent items={DoingCards} list="Doing" />
        <ListComponent items={DoneCards} list="Done" />
      </section>
    </>
  );
};

export default WrapperAppContainer;
