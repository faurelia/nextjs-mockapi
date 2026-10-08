import { defineRelations } from "drizzle-orm";

import { usersTable } from "./users";
import { postsTable } from "./posts";
import { booksTable } from "./books";
import { authorsTable } from "./authors";

export const relations = defineRelations(
  {
    usersTable,
    postsTable,
    authorsTable,
    booksTable,
  },
  (r) => ({
    usersTable: {
      posts: r.many.postsTable(),
    },

    postsTable: {
      user: r.one.usersTable({
        from: r.postsTable.userId,
        to: r.usersTable.id,
      }),
    },

    authorsTable: {
      books: r.many.booksTable(),
    },

    booksTable: {
      author: r.one.authorsTable({
        from: r.booksTable.authorId,
        to: r.authorsTable.id,
      }),
    },
  }),
);
