import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { id, createdAt, updatedAt } from '../common';
import { users } from '../user';

export const items = pgTable('item', {
  id,
  name: text('name').notNull(),
  reference: text('reference').notNull(),
  assigneeId: text('assignee_id').references(() => users.id),
  assignedAt: timestamp('assigned_at', { withTimezone: true, mode: 'date' }),
  billingFileKey: text('billing_file_key'),
  archivedAt: timestamp('archived_at', { withTimezone: true, mode: 'date' }),
  createdAt,
  updatedAt
});

export const itemRelations = relations(items, ({ one }) => ({
  assignee: one(users, {
    fields: [items.assigneeId],
    references: [users.id]
  })
}));

export type Item = typeof items.$inferSelect;
