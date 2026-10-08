type AuthorSeed = {
  id: string;
  name: string;
};

type BookSeed = {
  title: string;
  description: string;
  authorId: string;
  genre: string;
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

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:3000/api";
const MAX_ATTEMPTS = 3;
const RETRY_DELAY_MS = 500;
const RETRYABLE_STATUS_CODES = new Set([408, 429, 500, 502, 503, 504]);

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
      title: "Sapiens: A Brief History of Humankind",
      description:
        "A sweeping narrative of human history from the Stone Age to the age of artificial intelligence.",
      authorId: "a1",
      genre: "history",
    },
    {
      title: "Homo Deus: A Brief History of Tomorrow",
      description:
        "Explores humanity's future quests for immortality, happiness and divinity.",
      authorId: "a1",
      genre: "history",
    },
    {
      title: "21 Lessons for the 21st Century",
      description:
        "A concise guide to the most pressing challenges facing the world today.",
      authorId: "a1",
      genre: "history",
    },
    {
      title: "Clean Code: A Handbook of Agile Software Craftsmanship",
      description:
        "Practical advice for writing readable, maintainable and elegant code.",
      authorId: "a2",
      genre: "software engineering",
    },
    {
      title: "The Clean Coder: A Code of Conduct for Professional Programmers",
      description:
        "How to behave professionally in a demanding software industry.",
      authorId: "a2",
      genre: "software engineering",
    },
    {
      title:
        "Clean Architecture: A Craftsman's Guide to Software Structure and Design",
      description:
        "Rules for structuring systems so they remain easy to evolve over time.",
      authorId: "a2",
      genre: "software engineering",
    },
    {
      title: "Atomic Habits: An Easy & Proven Way to Build Good Habits",
      description:
        "Tiny changes that deliver remarkable results through habit stacking.",
      authorId: "a3",
      genre: "self help",
    },
    {
      title: "The Pragmatic Programmer: Your Journey to Mastery",
      description:
        "Timeless tips and tricks for becoming a more effective developer.",
      authorId: "a11",
      genre: "software engineering",
    },
    {
      title: "Pride and Prejudice",
      description:
        "Wit and social commentary as Elizabeth Bennet clashes with Mr. Darcy.",
      authorId: "a4",
      genre: "classics",
    },
    {
      title: "Sense and Sensibility",
      description:
        "Two sisters navigate love and loss with reason versus emotion.",
      authorId: "a4",
      genre: "classics",
    },
    {
      title: "Emma",
      description:
        "A matchmaking heroine learns hard lessons about meddling in others' hearts.",
      authorId: "a4",
      genre: "classics",
    },
    {
      title: "Crime and Punishment",
      description:
        "A destitute student commits murder and is consumed by guilt and paranoia.",
      authorId: "a5",
      genre: "classics",
    },
    {
      title: "The Brothers Karamazov",
      description:
        "A philosophical family drama exploring faith, doubt and free will.",
      authorId: "a5",
      genre: "classics",
    },
    {
      title: "Notes from Underground",
      description:
        "A bitter recluse rants against rationalism and society in this existential classic.",
      authorId: "a5",
      genre: "classics",
    },
    {
      title: "Refactoring: Improving the Design of Existing Code",
      description:
        "A catalog of techniques to restructure code without changing its behavior.",
      authorId: "a6",
      genre: "software engineering",
    },
    {
      title: "Domain-Specific Languages",
      description:
        "Guidance on building expressive DSLs tailored to specific problem domains.",
      authorId: "a6",
      genre: "software engineering",
    },
    {
      title:
        "UML Distilled: A Brief Guide to the Standard Object Modeling Language",
      description: "A concise introduction to the UML modeling language.",
      authorId: "a6",
      genre: "software engineering",
    },
    {
      title: "Just Mercy: A Story of Justice and Redemption",
      description:
        "A lawyer's account of fighting wrongful convictions on death row.",
      authorId: "a7",
      genre: "history",
    },
    {
      title: "Stoner",
      description:
        "The quiet, overlooked life of a university professor finds unexpected depth.",
      authorId: "a7",
      genre: "fiction",
    },
    {
      title: "Ego Is the Enemy",
      description:
        "Historical figures illustrate how ego sabotages ambition and success.",
      authorId: "a8",
      genre: "self help",
    },
    {
      title: "The Obstacle Is the Way",
      description:
        "Turning adversity into advantage through the ancient Stoic mindset.",
      authorId: "a8",
      genre: "self help",
    },
    {
      title: "Meditations",
      description: "Private notes of a Roman emperor on resilience and virtue.",
      authorId: "a8",
      genre: "philosophy",
    },
    {
      title: "1984",
      description:
        "A totalitarian surveillance state crushes truth and individuality.",
      authorId: "a9",
      genre: "classics",
    },
    {
      title: "Animal Farm",
      description:
        "An allegorical fable of revolution betrayed by power-hungry pigs.",
      authorId: "a9",
      genre: "classics",
    },
    {
      title: "Down and Out in Paris and London",
      description: "A firsthand account of poverty in two European capitals.",
      authorId: "a9",
      genre: "memoir",
    },
    {
      title: "Capital: Critique of Political Economy",
      description:
        "A foundational analysis of capitalism, labor and surplus value.",
      authorId: "a10",
      genre: "history",
    },
    {
      title: "The Communist Manifesto",
      description:
        "A political pamphlet outlining the class struggle and communist ideals.",
      authorId: "a10",
      genre: "history",
    },
    {
      title: "Think and Grow Rich",
      description:
        "Thirteen principles for turning desire into tangible achievement.",
      authorId: "a12",
      genre: "self help",
    },
    {
      title: "Moby-Dick",
      description:
        "Captain Ahab's obsessive hunt for a white whale across the seas.",
      authorId: "a13",
      genre: "classics",
    },
    {
      title:
        "The Lean Startup: How Constant Innovation Creates Radically Successful Businesses",
      description:
        "Build-measure-learn loops for launching ventures with validated learning.",
      authorId: "a14",
      genre: "business",
    },
    {
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
    { id: "t1", text: "Review onboarding copy", completed: false },
    { id: "t2", text: "Clean up API error messages", completed: true },
    { id: "t3", text: "Schedule design review", completed: false },
    { id: "t4", text: "Publish release notes", completed: true },
    { id: "t5", text: "Update billing reminders", completed: false },
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

const getJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${url}`);
  }

  return (await response.json()) as T;
};

const delay = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const postJsonWithRetry = async <T>(
  url: string,
  payload: unknown,
  description: string,
  findExisting: () => Promise<T | undefined>,
): Promise<T> => {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    let response: Response | undefined;
    let requestError: unknown;

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      requestError = error;
    }

    if (response?.ok) {
      return (await response.json()) as T;
    }

    const failure = response
      ? `${response.status} ${await response.text()}`
      : requestError instanceof Error
        ? requestError.message
        : String(requestError);
    const shouldRetry =
      !response || RETRYABLE_STATUS_CODES.has(response.status);

    if (!shouldRetry) {
      throw new Error(`Failed to ${description}: ${failure}`);
    }

    // A POST may have succeeded even if its response was lost; check before retrying.
    const existing = await findExisting();
    if (existing) {
      return existing;
    }

    if (attempt === MAX_ATTEMPTS) {
      throw new Error(
        `Failed to ${description} after ${MAX_ATTEMPTS} attempts: ${failure}`,
      );
    }

    const waitMs = RETRY_DELAY_MS * 2 ** (attempt - 1);
    console.warn(
      `Could not ${description} (${failure}); retrying in ${waitMs}ms (attempt ${attempt + 1}/${MAX_ATTEMPTS}).`,
    );
    await delay(waitMs);
  }

  throw new Error(`Failed to ${description}.`);
};

const findAuthorByName = async (name: string) => {
  const authors = await getJson<Array<{ id: number; name: string }>>(
    `${API_BASE_URL}/authors`,
  );
  return authors.find((author) => author.name === name);
};

const createAuthor = async (author: { name: string }) => {
  const createdAuthor = await postJsonWithRetry<{ id: number; name: string }>(
    `${API_BASE_URL}/authors`,
    author,
    `create author "${author.name}"`,
    () => findAuthorByName(author.name),
  );

  if (typeof createdAuthor.id !== "number") {
    throw new Error(`Author "${author.name}" response did not include a numeric ID.`);
  }

  return createdAuthor;
};

const findBookByTitle = async (title: string) => {
  const books = await getJson<Array<{ id: number; title: string }>>(
    `${API_BASE_URL}/books`,
  );
  return books.find((book) => book.title === title);
};

const createBook = async (payload: {
  title: string;
  description: string;
  authorId: number;
}) =>
  postJsonWithRetry<{ id: number; title: string }>(
    `${API_BASE_URL}/books`,
    payload,
    `create book "${payload.title}"`,
    () => findBookByTitle(payload.title),
  );

const findUserByEmail = async (email: string) => {
  const users = await getJson<Array<{ id: number; email: string }>>(
    `${API_BASE_URL}/users`,
  );
  return users.find((user) => user.email === email);
};

const createUser = async (user: { name: string; email: string }) =>
  postJsonWithRetry<{ id: number; email: string }>(
    `${API_BASE_URL}/users`,
    user,
    `create user "${user.email}"`,
    () => findUserByEmail(user.email),
  );

const findPostByTitle = async (title: string) => {
  const posts = await getJson<Array<{ id: number; title: string }>>(
    `${API_BASE_URL}/posts`,
  );
  return posts.find((post) => post.title === title);
};

const createPost = async (payload: {
  title: string;
  body: string;
  userId: number;
}) =>
  postJsonWithRetry<{ id: number; title: string }>(
    `${API_BASE_URL}/posts`,
    payload,
    `create post "${payload.title}"`,
    () => findPostByTitle(payload.title),
  );

const findTodoByText = async (text: string) => {
  const todos = await getJson<Array<{ id: number; text: string }>>(
    `${API_BASE_URL}/todos`,
  );
  return todos.find((todo) => todo.text === text);
};

const createTodo = async (payload: { text: string; completed: boolean }) =>
  postJsonWithRetry<{ id: number; text: string }>(
    `${API_BASE_URL}/todos`,
    payload,
    `create todo "${payload.text}"`,
    () => findTodoByText(payload.text),
  );

const findProductByName = async (name: string) => {
  const products = await getJson<Array<{ id: number; name: string }>>(
    `${API_BASE_URL}/products`,
  );
  return products.find((product) => product.name === name);
};

const createProduct = async (payload: { name: string; price: number | string }) =>
  postJsonWithRetry<{ id: number; name: string }>(
    `${API_BASE_URL}/products`,
    payload,
    `create product "${payload.name}"`,
    () => findProductByName(payload.name),
  );

const findMovieByName = async (name: string) => {
  const movies = await getJson<Array<{ id: number; name: string }>>(
    `${API_BASE_URL}/movies`,
  );
  return movies.find((movie) => movie.name === name);
};

const createMovie = async (payload: { name: string; year: number }) =>
  postJsonWithRetry<{ id: number; name: string }>(
    `${API_BASE_URL}/movies`,
    payload,
    `create movie "${payload.name}"`,
    () => findMovieByName(payload.name),
  );

const seedAuthors = async () => {
  const existingAuthors = await getJson<Array<{ id: number; name: string }>>(
    `${API_BASE_URL}/authors`,
  );
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
  const existingBooks = await getJson<Array<{ id: number; title: string }>>(
    `${API_BASE_URL}/books`,
  );
  const existingBookTitles = new Set(existingBooks.map((book) => book.title));

  const bookPromises = data.books.map(async (book) => {
    if (existingBookTitles.has(book.title)) {
      return;
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
  });

  await Promise.all(bookPromises);
};

const seedUsers = async () => {
  const existingUsers = await getJson<Array<{ id: number; email: string }>>(
    `${API_BASE_URL}/users`,
  );
  const existingUserEmails = new Set(existingUsers.map((user) => user.email));

  const userIdsByLegacyId = new Map<string, number>();

  for (const user of data.users) {
    if (existingUserEmails.has(user.email)) {
      const existingUser = existingUsers.find((entry) => entry.email === user.email);
      if (existingUser) {
        userIdsByLegacyId.set(user.id, existingUser.id);
      }
      continue;
    }

    const createdUser = await createUser({
      name: user.name,
      email: user.email,
    });

    if (typeof createdUser.id !== "number") {
      throw new Error(`User "${user.email}" response did not include a numeric ID.`);
    }

    userIdsByLegacyId.set(user.id, createdUser.id);
  }

  return userIdsByLegacyId;
};

const seedPosts = async (userIdsByLegacyId: Map<string, number>) => {
  const existingPosts = await getJson<Array<{ id: number; title: string }>>(
    `${API_BASE_URL}/posts`,
  );
  const existingPostTitles = new Set(existingPosts.map((post) => post.title));

  const postPromises = data.posts.map(async (post) => {
    if (existingPostTitles.has(post.title)) {
      return;
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
  });

  await Promise.all(postPromises);
};

const seedTodos = async () => {
  const existingTodos = await getJson<Array<{ id: number; text: string }>>(
    `${API_BASE_URL}/todos`,
  );
  const existingTodoTexts = new Set(existingTodos.map((todo) => todo.text));

  const todoPromises = data.todos.map(async (todo) => {
    if (existingTodoTexts.has(todo.text)) {
      return;
    }

    await createTodo({
      text: todo.text,
      completed: todo.completed,
    });
  });

  await Promise.all(todoPromises);
};

const seedProducts = async () => {
  const existingProducts = await getJson<Array<{ id: number; name: string }>>(
    `${API_BASE_URL}/products`,
  );
  const existingProductNames = new Set(existingProducts.map((product) => product.name));

  const productPromises = data.products.map(async (product) => {
    if (existingProductNames.has(product.name)) {
      return;
    }

    await createProduct({
      name: product.name,
      price: product.price,
    });
  });

  await Promise.all(productPromises);
};

const seedMovies = async () => {
  const existingMovies = await getJson<Array<{ id: number; name: string }>>(
    `${API_BASE_URL}/movies`,
  );
  const existingMovieNames = new Set(existingMovies.map((movie) => movie.name));

  const moviePromises = data.movies.map(async (movie) => {
    if (existingMovieNames.has(movie.name)) {
      return;
    }

    await createMovie({
      name: movie.name,
      year: movie.year,
    });
  });

  await Promise.all(moviePromises);
};

const main = async () => {
  console.log("Seeding authors, books, users, posts, todos, products, and movies...");

  const authorIdsByLegacyId = await seedAuthors();
  await seedBooks(authorIdsByLegacyId);

  const userIdsByLegacyId = await seedUsers();
  await seedPosts(userIdsByLegacyId);
  await seedTodos();
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
