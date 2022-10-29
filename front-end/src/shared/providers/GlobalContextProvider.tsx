import { FC, useState } from "react";
import { GlobalContext } from "../contexts";
import { ChildrenProp } from "../types";
import { UserEntity } from "../../services";
import { CardEntity } from "../../services/card";

const GlobalContextProvider: FC<ChildrenProp> = ({ children }) => {
  const [globalLoading, setGlobalLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserEntity | null>(null);
  const [cards, setCards] = useState<CardEntity[] | null>(null);

  return (
    <GlobalContext.Provider
      value={{
        globalLoading,
        toggleGlobalLoading: (status = !globalLoading) =>
          setGlobalLoading(status),

        user,
        setUser,

        cards,
        setCards,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
