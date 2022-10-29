import { FC, useContext, useEffect } from "react";
import "./styles/variables.css";
import "./styles/global.css";
import { GlobalContext } from "./shared/contexts";
import { GlobalLoadingContainer, WrapperAppContainer } from "./containers";
import useHttp from "./hooks/useHttp";
import { LoginService } from "./services";
import { USER_DATA } from "./shared/constants";

const App: FC = () => {
  const api = useHttp();
  const { globalLoading, toggleGlobalLoading, setUser } =
    useContext(GlobalContext);

  useEffect(() => {
    toggleGlobalLoading(true);

    LoginService(api, USER_DATA).then(async ({ data }) => {
      const { token } = await data;

      setUser({
        id: USER_DATA.login,
        password: USER_DATA.password,
        token,
      });
      toggleGlobalLoading(false);
    });
  }, []);

  return (
    <>{globalLoading ? <GlobalLoadingContainer /> : <WrapperAppContainer />}</>
  );
};

export default App;
