import { AxiosInstance } from "axios";

export type ListaType = "ToDo" | "Doing" | "Done";
export interface CardEntity {
  id: number;
  titulo: string;
  conteudo: string;
  lista: ListaType;
}

export const CreateCardService = async (
  api: AxiosInstance,
  body: Omit<CardEntity, "id">
) => await api.post<Promise<CardEntity[]>>("/cards", body);

export const GetCardsService = async (api: AxiosInstance) =>
  await api.get<Promise<CardEntity[]>>("/cards");

export const UpdateCardService = async (
  api: AxiosInstance,
  id: string,
  body: Omit<CardEntity, "id">
) => await api.put<Promise<CardEntity[]>>(`/cards/${id}`, body);

export const DeleteCardsService = async (api: AxiosInstance, id: string) =>
  await api.delete<Promise<CardEntity[]>>(`/cards/${id}`);
