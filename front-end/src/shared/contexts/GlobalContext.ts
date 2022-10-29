import { createContext } from "react";
import { CardEntity, UserEntity } from "../../services";

interface GlobalContextType {
  globalLoading: boolean;
  toggleGlobalLoading: (status?: boolean) => void;

  user: UserEntity | null;
  setUser: (user: UserEntity) => void;

  cards: CardEntity[] | null;
  setCards: (cards: CardEntity[]) => void;
}

export const GlobalContext = createContext<GlobalContextType>(
  {} as GlobalContextType
);
