import { pgTable, text, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { id, createdAt, updatedAt } from '@/db/schema/common';
import { boards } from './board';
import { boardTasks } from './board-task';

export const boardColumns = pgTable('board-column', {
  id,
  name: text('name').notNull(),
  boardId: text('board_id')
    .notNull()
    .references(() => boards.id),
  order: integer('order').notNull(),
  createdAt,
  updatedAt
});

export const boardColumnRelations = relations(
  boardColumns,
  ({ one, many }) => ({
    board: one(boards, {
      fields: [boardColumns.boardId],
      references: [boards.id]
    }),
    tasks: many(boardTasks)
  })
);

export type BoardColumnEntity = typeof boardColumns.$inferSelect;
