type cardLogType = {
  id: number;
  titulo: string;
};

export const log = (
  { id, titulo }: cardLogType,
  reason: "Removido" | "Alterado" | "Criado"
) => {
  const now = new Date().toLocaleString("pt-BR");
  console.log(`${now} - Card ${id} - ${titulo} - ${reason}`);
};
