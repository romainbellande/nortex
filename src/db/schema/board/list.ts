import { pgTable, text, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { id, createdAt, updatedAt } from '../common';
import { boards } from './board';
import { cards } from './card';

export const lists = pgTable('list', {
  id,
  name: text('name').notNull(),
  boardId: text('board_id')
    .notNull()
    .references(() => boards.id),
  order: integer('order').notNull(),
  createdAt,
  updatedAt
});

export const listRelations = relations(lists, ({ one, many }) => ({
  board: one(boards, {
    fields: [lists.boardId],
    references: [boards.id]
  }),
  cards: many(cards)
}));

export type List = typeof lists.$inferSelect;
