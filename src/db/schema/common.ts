import { text, timestamp } from 'drizzle-orm/pg-core';

export const id = text('id')
  .primaryKey()
  .$defaultFn(() => crypto.randomUUID());
export const createdAt = timestamp('created_at', {
  withTimezone: true,
  mode: 'date'
})
  .defaultNow()
  .notNull();
export const updatedAt = timestamp('updated_at', {
  withTimezone: true,
  mode: 'date'
})
  .defaultNow()
  .notNull();

export const commonSchema = {
  id,
  createdAt,
  updatedAt
};
