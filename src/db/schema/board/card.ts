import { pgTable, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { id, createdAt, updatedAt } from '../common';
import { lists } from './list';
import { users } from '../user';

export const cards = pgTable('card', {
  id,
  title: text('title').notNull(),
  description: text('description'),
  listId: text('list_id')
    .notNull()
    .references(() => lists.id),
  position: text('position').notNull(),
  assigneeId: text('assignee_id').references(() => users.id),
  createdAt,
  updatedAt
});

export const cardRelations = relations(cards, ({ one }) => ({
  list: one(lists, {
    fields: [cards.listId],
    references: [lists.id]
  }),
  assignee: one(users, {
    fields: [cards.assigneeId],
    references: [users.id]
  })
}));

export type Card = typeof cards.$inferSelect;
