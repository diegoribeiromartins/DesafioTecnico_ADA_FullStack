import { FC, useContext, useEffect } from "react";
import { GlobalContext } from "../../shared/contexts";
import "./styles.css";

const GlobalLoadingContainer: FC = () => {
  const { globalLoading } = useContext(GlobalContext);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [globalLoading]);

  return <div className="GlobalLoadingContainer__Wrapper">Carregando...</div>;
};

export default GlobalLoadingContainer;
