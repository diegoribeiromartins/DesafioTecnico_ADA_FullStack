import { FC, useContext, useEffect, useMemo } from "react";
import { ButtonComponent, ListComponent } from "../../components";
import { useHttp } from "../../hooks";
import { CardEntity, GetCardsService } from "../../services";
import { GlobalContext } from "../../shared/contexts";

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

  return (
    <>
      <section>
        <ButtonComponent>Criar item</ButtonComponent>
      </section>

      <section>
        <ListComponent items={TodoCards} />
        <ListComponent items={DoingCards} />
        <ListComponent items={DoneCards} />
      </section>
    </>
  );
};

export default WrapperAppContainer;
