import { pgTable, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { id, createdAt, updatedAt } from '@/db/schema/common';
import { users } from '@/db/schema/user';
import { boardColumns } from './board-column';

export const boards = pgTable('board', {
  id,
  name: text('name').notNull(),
  createdAt,
  updatedAt
});

export const userBoards = pgTable('user_board', {
  id,
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  boardId: text('board_id')
    .notNull()
    .references(() => boards.id),
  createdAt,
  updatedAt
});

export const boardRelations = relations(boards, ({ many }) => ({
  users: many(userBoards),
  columns: many(boardColumns)
}));

export const userBoardRelations = relations(userBoards, ({ one }) => ({
  user: one(users, {
    fields: [userBoards.userId],
    references: [users.id]
  }),
  board: one(boards, {
    fields: [userBoards.boardId],
    references: [boards.id]
  })
}));

export type BoardEntity = typeof boards.$inferSelect;
export type UserBoardEntity = typeof userBoards.$inferSelect;
