import { db } from "../../db/conn";
import { sql } from "@databases/sqlite";

export type CardType = {
  id: number;
  titulo: string;
  conteudo: string;
  lista: string;
};

class CardModel {
  async show(id: string | null = null) {
    let compareId = id;

    if (!id) {
      const getLastInsertRowId = await db.query(
        sql`SELECT last_insert_rowid() as id`
      );
      compareId = getLastInsertRowId?.[0].id;
    }
    return await db.query(sql`
      SELECT * FROM cards
      WHERE id = ${compareId}
    `);
  }

  async get() {
    return await db.query(sql`
      SELECT * FROM cards
    `);
  }

  async create(cardItem: Omit<CardType, "id">) {
    return await db.query(sql`
      INSERT INTO cards (titulo, conteudo, lista)
      VALUES (${cardItem.titulo.trim()}, ${cardItem.conteudo.trim()}, ${cardItem.lista.trim()})
    `);
  }

  async update(cardItem: CardType) {
    return await db.query(sql`
      UPDATE cards
      SET titulo = ${cardItem.titulo}, conteudo = ${cardItem.conteudo}, lista = ${cardItem.lista}
      WHERE id = ${cardItem.id}
    `);
  }

  async delete(id: number) {
    return await db.query(sql`
      DELETE FROM cards
      WHERE id = ${id}
    `);
  }
}

export default new CardModel();
