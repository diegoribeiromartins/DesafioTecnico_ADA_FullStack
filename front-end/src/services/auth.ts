import { AxiosInstance } from "axios";
export interface UserEntity {
  id: string;
  password: string;
  token: string;
}

export const LoginService = async (
  api: AxiosInstance,
  body: Omit<UserEntity, "token">
) => await api.post<Promise<Pick<UserEntity, "token">>>("/login", body);
