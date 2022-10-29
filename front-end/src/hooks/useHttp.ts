import axios, { Axios } from "axios";
import { useContext } from "react";
import { GlobalContext } from "../shared/contexts";

const useHttp = () => {
  const { user } = useContext(GlobalContext);

  const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  if (!!user?.token)
    AxiosInstance.defaults.headers.Authentication = `Bearer ${user.token}`;

  return AxiosInstance;
};

export default useHttp;
