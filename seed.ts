import { db } from "@/lib/db";
import {
  authorsTable,
  booksTable,
  moviesTable,
  postsTable,
  productsTable,
  todosTable,
  usersTable,
} from "@/lib/db/schema";

type AuthorSeed = {
  id: string;
  name: string;
};

type BookSeed = {
  id: string;
  title: string;
  description: string;
  authorId: string;
  genre?: string;
};

type UserSeed = {
  id: string;
  name: string;
  email: string;
};

type PostSeed = {
  id: string;
  title: string;
  body: string;
  userId: string;
};

type TodoSeed = {
  id: string;
  text: string;
  completed: boolean;
  userId: string;
};

type ProductSeed = {
  id: string;
  name: string;
  price: number;
};

type MovieSeed = {
  id: string;
  name: string;
  year: number;
};

const data = {
  authors: [
    { id: "a1", name: "Yuval Noah Harari" },
    { id: "a2", name: "Robert C. Martin" },
    { id: "a3", name: "James Clear" },
    { id: "a4", name: "Jane Austen" },
    { id: "a5", name: "Fyodor Dostoevsky" },
    { id: "a6", name: "Martin Fowler" },
    { id: "a7", name: "Bryan Stevenson" },
    { id: "a8", name: "Ryan Holiday" },
    { id: "a9", name: "George Orwell" },
    { id: "a10", name: "Karl Marx" },
    { id: "a11", name: "Andrew Hunt" },
    { id: "a12", name: "Napoleon Hill" },
    { id: "a13", name: "Herman Melville" },
    { id: "a14", name: "Eric Ries" },
    { id: "a15", name: "Mark Manson" },
  ] as AuthorSeed[],
  books: [
    {
      id: "b1",
      title: "Sapiens: A Brief History of Humankind",
      description:
        "A sweeping narrative of human history from the Stone Age to the age of artificial intelligence.",
      authorId: "a1",
      genre: "history",
    },
    {
      id: "b2",
      title: "Homo Deus: A Brief History of Tomorrow",
      description:
        "Explores humanity's future quests for immortality, happiness and divinity.",
      authorId: "a1",
      genre: "history",
    },
    {
      id: "b3",
      title: "21 Lessons for the 21st Century",
      description:
        "A concise guide to the most pressing challenges facing the world today.",
      authorId: "a1",
      genre: "history",
    },
    {
      id: "b4",
      title: "Clean Code: A Handbook of Agile Software Craftsmanship",
      description:
        "Practical advice for writing readable, maintainable and elegant code.",
      authorId: "a2",
      genre: "software engineering",
    },
    {
      id: "b5",
      title: "The Clean Coder: A Code of Conduct for Professional Programmers",
      description:
        "How to behave professionally in a demanding software industry.",
      authorId: "a2",
      genre: "software engineering",
    },
    {
      id: "b6",
      title:
        "Clean Architecture: A Craftsman's Guide to Software Structure and Design",
      description:
        "Rules for structuring systems so they remain easy to evolve over time.",
      authorId: "a2",
      genre: "software engineering",
    },
    {
      id: "b7",
      title: "Atomic Habits: An Easy & Proven Way to Build Good Habits",
      description:
        "Tiny changes that deliver remarkable results through habit stacking.",
      authorId: "a3",
      genre: "self help",
    },
    {
      id: "b8",
      title: "The Pragmatic Programmer: Your Journey to Mastery",
      description:
        "Timeless tips and tricks for becoming a more effective developer.",
      authorId: "a11",
      genre: "software engineering",
    },
    {
      id: "b9",
      title: "Pride and Prejudice",
      description:
        "Wit and social commentary as Elizabeth Bennet clashes with Mr. Darcy.",
      authorId: "a4",
      genre: "classics",
    },
    {
      id: "b10",
      title: "Sense and Sensibility",
      description:
        "Two sisters navigate love and loss with reason versus emotion.",
      authorId: "a4",
      genre: "classics",
    },
    {
      id: "b11",
      title: "Emma",
      description:
        "A matchmaking heroine learns hard lessons about meddling in others' hearts.",
      authorId: "a4",
      genre: "classics",
    },
    {
      id: "b12",
      title: "Crime and Punishment",
      description:
        "A destitute student commits murder and is consumed by guilt and paranoia.",
      authorId: "a5",
      genre: "classics",
    },
    {
      id: "b13",
      title: "The Brothers Karamazov",
      description:
        "A philosophical family drama exploring faith, doubt and free will.",
      authorId: "a5",
      genre: "classics",
    },
    {
      id: "b14",
      title: "Notes from Underground",
      description:
        "A bitter recluse rants against rationalism and society in this existential classic.",
      authorId: "a5",
      genre: "classics",
    },
    {
      id: "b15",
      title: "Refactoring: Improving the Design of Existing Code",
      description:
        "A catalog of techniques to restructure code without changing its behavior.",
      authorId: "a6",
      genre: "software engineering",
    },
    {
      id: "b16",
      title: "Domain-Specific Languages",
      description:
        "Guidance on building expressive DSLs tailored to specific problem domains.",
      authorId: "a6",
      genre: "software engineering",
    },
    {
      id: "b17",
      title:
        "UML Distilled: A Brief Guide to the Standard Object Modeling Language",
      description: "A concise introduction to the UML modeling language.",
      authorId: "a6",
      genre: "software engineering",
    },
    {
      id: "b18",
      title: "Just Mercy: A Story of Justice and Redemption",
      description:
        "A lawyer's account of fighting wrongful convictions on death row.",
      authorId: "a7",
      genre: "history",
    },
    {
      id: "b19",
      title: "Stoner",
      description:
        "The quiet, overlooked life of a university professor finds unexpected depth.",
      authorId: "a7",
      genre: "fiction",
    },
    {
      id: "b20",
      title: "Ego Is the Enemy",
      description:
        "Historical figures illustrate how ego sabotages ambition and success.",
      authorId: "a8",
      genre: "self help",
    },
    {
      id: "b21",
      title: "The Obstacle Is the Way",
      description:
        "Turning adversity into advantage through the ancient Stoic mindset.",
      authorId: "a8",
      genre: "self help",
    },
    {
      id: "b22",
      title: "Meditations",
      description: "Private notes of a Roman emperor on resilience and virtue.",
      authorId: "a8",
      genre: "philosophy",
    },
    {
      id: "b23",
      title: "1984",
      description:
        "A totalitarian surveillance state crushes truth and individuality.",
      authorId: "a9",
      genre: "classics",
    },
    {
      id: "b24",
      title: "Animal Farm",
      description:
        "An allegorical fable of revolution betrayed by power-hungry pigs.",
      authorId: "a9",
      genre: "classics",
    },
    {
      id: "b25",
      title: "Down and Out in Paris and London",
      description: "A firsthand account of poverty in two European capitals.",
      authorId: "a9",
      genre: "memoir",
    },
    {
      id: "b26",
      title: "Capital: Critique of Political Economy",
      description:
        "A foundational analysis of capitalism, labor and surplus value.",
      authorId: "a10",
      genre: "history",
    },
    {
      id: "b27",
      title: "The Communist Manifesto",
      description:
        "A political pamphlet outlining the class struggle and communist ideals.",
      authorId: "a10",
      genre: "history",
    },
    {
      id: "b28",
      title: "Think and Grow Rich",
      description:
        "Thirteen principles for turning desire into tangible achievement.",
      authorId: "a12",
      genre: "self help",
    },
    {
      id: "b29",
      title: "Moby-Dick",
      description:
        "Captain Ahab's obsessive hunt for a white whale across the seas.",
      authorId: "a13",
      genre: "classics",
    },
    {
      id: "b30",
      title:
        "The Lean Startup: How Constant Innovation Creates Radically Successful Businesses",
      description:
        "Build-measure-learn loops for launching ventures with validated learning.",
      authorId: "a14",
      genre: "business",
    },
    {
      id: "b31",
      title: "The Subtle Art of Not Giving a F*ck",
      description:
        "A counterintuitive approach to living a good life by choosing your struggles.",
      authorId: "a15",
      genre: "self help",
    },
  ] as BookSeed[],
  users: [
    { id: "u1", name: "Ada Johnson", email: "ada.johnson@example.com" },
    { id: "u2", name: "Lucas Kim", email: "lucas.kim@example.com" },
    { id: "u3", name: "Priya Patel", email: "priya.patel@example.com" },
    { id: "u4", name: "Mateo Rossi", email: "mateo.rossi@example.com" },
    { id: "u5", name: "Emma Chen", email: "emma.chen@example.com" },
  ] as UserSeed[],
  posts: [
    {
      id: "p1",
      title: "Launch checklist",
      body: "We need a short checklist for the product launch and onboarding flow.",
      userId: "u1",
    },
    {
      id: "p2",
      title: "Team retrospective",
      body: "This week we improved velocity by simplifying review steps and reducing deployment friction.",
      userId: "u2",
    },
    {
      id: "p3",
      title: "Customer feedback summary",
      body: "Users want faster search, a cleaner dashboard, and better mobile usability.",
      userId: "u3",
    },
    {
      id: "p4",
      title: "Design handoff notes",
      body: "The new dashboard should keep the same information hierarchy while reducing visual clutter.",
      userId: "u4",
    },
    {
      id: "p5",
      title: "Infrastructure update",
      body: "We upgraded API health checks and added early alerts for failed background jobs.",
      userId: "u5",
    },
  ] as PostSeed[],
  todos: [
    {
      id: "t1",
      text: "Review onboarding copy",
      completed: false,
      userId: "u1",
    },
    {
      id: "t2",
      text: "Clean up API error messages",
      completed: true,
      userId: "u2",
    },
    {
      id: "t3",
      text: "Schedule design review",
      completed: false,
      userId: "u3",
    },
    { id: "t4", text: "Publish release notes", completed: true, userId: "u4" },
    {
      id: "t5",
      text: "Update billing reminders",
      completed: false,
      userId: "u5",
    },
  ] as TodoSeed[],
  products: [
    { id: "pr1", name: "Wireless Headphones", price: 129.99 },
    { id: "pr2", name: "Mechanical Keyboard", price: 149.5 },
    { id: "pr3", name: "4K Monitor", price: 399.99 },
    { id: "pr4", name: "Laptop Stand", price: 59.0 },
    { id: "pr5", name: "USB-C Hub", price: 79.95 },
  ] as ProductSeed[],
  movies: [
    { id: "m1", name: "Arrival", year: 2016 },
    { id: "m2", name: "Blade Runner 2049", year: 2017 },
    { id: "m3", name: "The Social Network", year: 2010 },
    { id: "m4", name: "Dune", year: 2021 },
    { id: "m5", name: "Spirited Away", year: 2001 },
  ] as MovieSeed[],
};

const findAuthorByName = async (name: string) => {
  const authors = await db.query.authorsTable.findMany();
  return authors.find((author) => author.name === name);
};

const createAuthor = async (author: { name: string }) => {
  const [createdAuthor] = await db
    .insert(authorsTable)
    .values({
      name: author.name,
    })
    .returning();

  if (!createdAuthor) {
    throw new Error(`Author "${author.name}" was not created.`);
  }

  return createdAuthor;
};

const findBookByTitle = async (title: string) => {
  const books = await db.query.booksTable.findMany();
  return books.find((book) => book.title === title);
};

const createBook = async (payload: {
  title: string;
  description: string;
  authorId: number;
}) => {
  const [book] = await db
    .insert(booksTable)
    .values({
      title: payload.title,
      description: payload.description,
      authorId: payload.authorId,
    })
    .returning();

  if (!book) {
    throw new Error(`Book "${payload.title}" was not created.`);
  }

  return book;
};

const findUserByEmail = async (email: string) => {
  const users = await db.query.usersTable.findMany();
  return users.find((user) => user.email === email);
};

const createUser = async (user: {
  id: string;
  name: string;
  email: string;
}) => {
  const [createdUser] = await db
    .insert(usersTable)
    .values({
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: false,
    })
    .returning();

  if (!createdUser) {
    throw new Error(`User "${user.email}" was not created.`);
  }

  return createdUser;
};

const findPostByTitle = async (title: string) => {
  const posts = await db.query.postsTable.findMany();
  return posts.find((post) => post.title === title);
};

const createPost = async (payload: {
  title: string;
  body: string;
  userId: string;
}) => {
  const [post] = await db
    .insert(postsTable)
    .values({
      title: payload.title,
      body: payload.body,
      userId: payload.userId,
    })
    .returning();

  if (!post) {
    throw new Error(`Post "${payload.title}" was not created.`);
  }

  return post;
};

const findTodoByText = async (text: string) => {
  const todos = await db.select().from(todosTable);
  return todos.find((todo) => todo.text === text);
};

const createTodo = async (payload: {
  text: string;
  completed: boolean;
  userId: string;
}) => {
  const [todo] = await db
    .insert(todosTable)
    .values({
      text: payload.text,
      completed: payload.completed,
      userId: payload.userId,
    })
    .returning();

  if (!todo) {
    throw new Error(`Todo "${payload.text}" was not created.`);
  }

  return todo;
};

const findProductByName = async (name: string) => {
  const products = await db.select().from(productsTable);
  return products.find((product) => product.name === name);
};

const createProduct = async (payload: {
  name: string;
  price: number | string;
}) => {
  const [product] = await db
    .insert(productsTable)
    .values({
      name: payload.name,
      price:
        typeof payload.price === "string"
          ? payload.price
          : payload.price.toFixed(2),
    })
    .returning();

  if (!product) {
    throw new Error(`Product "${payload.name}" was not created.`);
  }

  return product;
};

const findMovieByName = async (name: string) => {
  const movies = await db.select().from(moviesTable);
  return movies.find((movie) => movie.name === name);
};

const createMovie = async (payload: { name: string; year: number }) => {
  const [movie] = await db
    .insert(moviesTable)
    .values({
      name: payload.name,
      year: payload.year,
    })
    .returning();

  if (!movie) {
    throw new Error(`Movie "${payload.name}" was not created.`);
  }

  return movie;
};

const seedAuthors = async () => {
  const existingAuthors = await db.query.authorsTable.findMany();
  const existingAuthorMap = new Map(
    existingAuthors.map((author) => [author.name, author.id]),
  );

  const authorIdsByLegacyId = new Map<string, number>();

  for (const author of data.authors) {
    const existingId = existingAuthorMap.get(author.name);

    if (existingId) {
      authorIdsByLegacyId.set(author.id, existingId);
      continue;
    }

    const createdAuthor = await createAuthor({ name: author.name });
    authorIdsByLegacyId.set(author.id, createdAuthor.id);
  }

  return authorIdsByLegacyId;
};

const seedBooks = async (authorIdsByLegacyId: Map<string, number>) => {
  const existingBooks = await db.query.booksTable.findMany();
  const existingBookTitles = new Set(existingBooks.map((book) => book.title));

  for (const book of data.books) {
    if (existingBookTitles.has(book.title)) {
      continue;
    }

    const authorId = authorIdsByLegacyId.get(book.authorId);

    if (!authorId) {
      throw new Error(
        `Missing author mapping for book "${book.title}" (legacy ID: ${book.authorId})`,
      );
    }

    await createBook({
      title: book.title,
      description: book.description,
      authorId,
    });
  }
};

const seedUsers = async () => {
  const existingUsers = await db.query.usersTable.findMany();
  const existingUserEmails = new Set(existingUsers.map((user) => user.email));

  const userIdsByLegacyId = new Map<string, string>();

  for (const user of data.users) {
    if (existingUserEmails.has(user.email)) {
      const existingUser = existingUsers.find(
        (entry) => entry.email === user.email,
      );

      if (existingUser) {
        userIdsByLegacyId.set(user.id, existingUser.id);
      }

      continue;
    }

    const createdUser = await createUser({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    userIdsByLegacyId.set(user.id, createdUser.id);
  }

  return userIdsByLegacyId;
};

const seedPosts = async (userIdsByLegacyId: Map<string, string>) => {
  const existingPosts = await db.query.postsTable.findMany();
  const existingPostTitles = new Set(existingPosts.map((post) => post.title));

  for (const post of data.posts) {
    if (existingPostTitles.has(post.title)) {
      continue;
    }

    const userId = userIdsByLegacyId.get(post.userId);

    if (!userId) {
      throw new Error(
        `Missing user mapping for post "${post.title}" (legacy ID: ${post.userId})`,
      );
    }

    await createPost({
      title: post.title,
      body: post.body,
      userId,
    });
  }
};

const seedTodos = async (userIdsByLegacyId: Map<string, string>) => {
  const existingTodos = await db.select().from(todosTable);
  const existingTodoTexts = new Set(existingTodos.map((todo) => todo.text));

  for (const todo of data.todos) {
    if (existingTodoTexts.has(todo.text)) {
      continue;
    }

    const userId = userIdsByLegacyId.get(todo.userId);

    if (!userId) {
      throw new Error(
        `Missing user mapping for todo "${todo.text}" (legacy ID: ${todo.userId})`,
      );
    }

    await createTodo({
      text: todo.text,
      completed: todo.completed,
      userId,
    });
  }
};

const seedProducts = async () => {
  const existingProducts = await db.select().from(productsTable);
  const existingProductNames = new Set(
    existingProducts.map((product) => product.name),
  );

  for (const product of data.products) {
    if (existingProductNames.has(product.name)) {
      continue;
    }

    await createProduct({
      name: product.name,
      price: product.price,
    });
  }
};

const seedMovies = async () => {
  const existingMovies = await db.select().from(moviesTable);
  const existingMovieNames = new Set(existingMovies.map((movie) => movie.name));

  for (const movie of data.movies) {
    if (existingMovieNames.has(movie.name)) {
      continue;
    }

    await createMovie({
      name: movie.name,
      year: movie.year,
    });
  }
};

const main = async () => {
  console.log(
    "Seeding authors, books, users, posts, todos, products, and movies...",
  );

  const authorIdsByLegacyId = await seedAuthors();
  await seedBooks(authorIdsByLegacyId);

  const userIdsByLegacyId = await seedUsers();
  await seedPosts(userIdsByLegacyId);
  await seedTodos(userIdsByLegacyId);
  await seedProducts();
  await seedMovies();

  console.log(
    `Seed complete. Added ${data.authors.length} authors, ${data.books.length} books, ${data.users.length} users, ${data.posts.length} posts, ${data.todos.length} todos, ${data.products.length} products, and ${data.movies.length} movies.`,
  );
};

void main().catch((error: unknown) => {
  console.error("Seed failed:", error);
  process.exitCode = 1;
});
