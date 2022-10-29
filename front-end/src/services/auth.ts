import { AxiosInstance } from "axios";
export interface UserEntity {
  id: string;
  password: string;
  token: string;
}

interface LoginType extends Pick<UserEntity, "password"> {
  login: string;
}

export const LoginService = async (api: AxiosInstance, body: LoginType) =>
  await api.post<Promise<{ token: string }>>("/login", body);
