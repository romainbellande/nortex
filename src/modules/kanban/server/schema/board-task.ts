import { pgTable, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { id, createdAt, updatedAt } from '@/db/schema/common';
import { boardColumns } from './board-column';
import { users } from '@/db/schema/user';

export const boardTasks = pgTable('board-task', {
  id,
  title: text('title').notNull(),
  description: text('description'),
  columnId: text('column_id')
    .notNull()
    .references(() => boardColumns.id),
  position: text('position').notNull(),
  assigneeId: text('assignee_id').references(() => users.id),
  createdAt,
  updatedAt
});

export const boardTaskRelations = relations(boardTasks, ({ one }) => ({
  column: one(boardColumns, {
    fields: [boardTasks.columnId],
    references: [boardColumns.id]
  }),
  assignee: one(users, {
    fields: [boardTasks.assigneeId],
    references: [users.id]
  })
}));

export type BoardTaskEntity = typeof boardTasks.$inferSelect;
