import { AxiosInstance } from "axios";

export interface CardEntity {
  id: number;
  titulo: string;
  conteudo: string;
  lista: "ToDo" | "Doing" | "Done";
}

export const CreateCardService = async (
  api: AxiosInstance,
  body: Omit<CardEntity, "id">
) => await api.post<Promise<CardEntity[]>>("/card", body);

export const GetCardsService = async (api: AxiosInstance) =>
  await api.get<Promise<CardEntity[]>>("/card");

export const UpdateCardService = async (
  api: AxiosInstance,
  id: string,
  body: Omit<CardEntity, "id">
) => await api.put<Promise<CardEntity[]>>(`/card/${id}`, body);

export const DeleteCardsService = async (api: AxiosInstance, id: string) =>
  await api.delete<Promise<CardEntity[]>>(`/card/${id}`);
