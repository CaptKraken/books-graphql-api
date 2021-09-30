import {
  comparePassword,
  encryptPassword,
  getNewInfo,
  newCookie,
  posgres,
} from "@/utils/index";
import { randomQuote } from "./localquotes";

// TODO: ADD A SORT FUNCTION (check getUsers for example)

/**
 * example of resolver:
 * query: async (parent, arguments, context, info)=>{
 * // your code here
 * return something;
 * }
 */

export const resolvers = {
  Query: {
    me: async (_par, _args, { user: { id } }) => {
      const me = await posgres("people").select("*").where({ id }).first();
      return me;
    },
    login: async (_par, { email, password, remember }, { res }) => {
      const user = await posgres("people")
        .select("*")
        .where({ email: email.toLowerCase() })
        .first();

      if (!user) throw new Error("User does not exist!");
      const match = await comparePassword(password, user.password);
      if (!match) throw new Error("Incorrect password!");

      newCookie(user, res);
      return user;
    },
    getUser: async (_par, { id }) => {
      const user = await posgres("people").select("*").where({ id }).first();

      if (!user) throw new Error(`No user found by that id.`);

      return user;
    },
    getUsers: async (_par, { sortBy, sortDirection, limit, offset }) => {
      const users = await posgres("people")
        .select()
        .orderBy(sortBy, sortDirection)
        .limit(Number(limit))
        .offset(Number(offset));

      if (!users) throw new Error(`No user found.`);
      return users.map((user) => user);
    },
    getAuthor: async (_par, { authorid: author_id }) => {
      const author = await posgres("authors")
        .select("*")
        .where({ author_id })
        .first();

      if (!author) throw new Error(`No author found by that id.`);
      return author;
    },
    getRandomQuote: async (_par, _args, { dataSources }, _info) => {
      let res = await dataSources.quoteAPI.getRandomMotivationalQuote();

      if (!res || !res?.quotes || res?.quotes?.length === 0) {
        return randomQuote();
      }

      const { text, author } = res.quotes[0];
      return { text, author };
    },
    getAuthors: async (_par, { sortBy, sortDirection, limit, offset }) => {
      const authors = await posgres("authors")
        .select()
        .orderBy(sortBy, sortDirection)
        .limit(Number(limit))
        .offset(Number(offset));
      if (!authors) throw new Error(`No author found.`);
      return authors.map((author) => author);
    },
    getBook: async (_par, { bookid: book_id }) => {
      const book = await posgres("books")
        .select("*")
        .where({ book_id })
        .first();
      if (!book) throw new Error(`No book found by that id.`);
      return book;
    },
    getBooksByCategory: async (
      _par,
      { category_id, sortBy, sortDirection, limit, offset }
    ) => {
      const books = await posgres("books")
        .select()
        .whereRaw(`${category_id} = any(categories)`)
        .orderBy(sortBy, sortDirection)
        .limit(Number(limit))
        .offset(Number(offset));

      if (!books) throw new Error(`No book found.`);
      return books.map((book) => book);
    },
    getBooks: async (_par, { sortBy, sortDirection, limit, offset }) => {
      const books = await posgres("books")
        .select()
        .orderBy(sortBy, sortDirection)
        .limit(Number(limit))
        .offset(Number(offset));

      if (!books) throw new Error(`No book found.`);
      return books.map((book) => book);
    },
    countBooks: async () => {
      const booksCount = await posgres("books").count("book_id").first();
      return booksCount.count;
    },
    getCategory: async (_par, { category_id, field, value }) => {
      console.log(category_id, field, value);
      let category;
      if (category_id) {
        category = await posgres("categories")
          .select()
          .where({ category_id })
          .first();
      }
      if (field && value) {
        category = await posgres("categories")
          .select()
          .whereRaw(`${field}='${value}'`)
          .first();
      }
      if (!category) throw new Error(`No category found.`);
      return category;
    },
    getCategories: async (_par, { sortBy, sortDirection, limit, offset }) => {
      const categories = await posgres("categories")
        .select()
        .orderBy(sortBy, sortDirection)
        .limit(Number(limit))
        .offset(Number(offset));

      if (!categories) throw new Error(`No book found.`);
      return categories.map((category) => category);
    },
    countSearchResult: async (_par, { searchTerm }) => {
      if (!searchTerm) throw new Error(`Search term can't be empty.`);
      const term = searchTerm.toLowerCase();
      const count = await posgres("books")
        .countDistinct("books.book_id")
        .joinRaw("JOIN authors ON authors.author_id = any(books.authors) ")
        .whereRaw(`LOWER(authors.author_name) LIKE '%${term}%'`)
        .orWhereRaw(`LOWER(books.title) LIKE '%${term}%'`)
        .orWhereRaw(`LOWER(books.description) LIKE '%${term}%'`)
        .first();
      return count.count;
    },
    searchBooks: async (_par, { searchTerm, limit, offset }) => {
      if (!searchTerm) throw new Error(`Search term can't be empty.`);
      const term = searchTerm.toLowerCase();
      const count = await posgres("books")
        .countDistinct("books.book_id")
        .joinRaw("JOIN authors ON authors.author_id = any(books.authors) ")
        .whereRaw(`LOWER(authors.author_name) LIKE '%${term}%'`)
        .orWhereRaw(`LOWER(books.title) LIKE '%${term}%'`)
        .orWhereRaw(`LOWER(books.description) LIKE '%${term}%'`);
      const books = await posgres("books")
        .distinctOn("books.book_id")
        .joinRaw("JOIN authors ON authors.author_id = any(books.authors) ")
        .whereRaw(`LOWER(authors.author_name) LIKE '%${term}%'`)
        .orWhereRaw(`LOWER(books.title) LIKE '%${term}%'`)
        .orWhereRaw(`LOWER(books.description) LIKE '%${term}%'`)
        .limit(limit)
        .offset(offset);
      if (!books) throw new Error(`No book found.`);
      return books.map((book) => book);
    },
  },

  Mutation: {
    // ADD
    signUp: async (
      _par,
      { input: { name, email, password } },
      { res },
      _info
    ) => {
      // check for empty fields
      if (!name || !email || !password) {
        throw new Error("Fields can't be empty.");
      }

      email = email.toLowerCase();
      const exist = await posgres("people").select().where({ email }).first();

      if (exist) throw new Error(`Email is already in use.`);
      const hashedPassword = await encryptPassword(password);

      const signedUpUser = await posgres("people")
        .insert([{ name, email, password: hashedPassword, role: "user" }])
        .returning("*");

      const user = signedUpUser[0];

      newCookie(user, res);
      return user;
    },
    addUser: async (_par, { input: { name, email, password, role } }) => {
      if (!name || !email || !password)
        throw new Error("Fields can't be empty.");

      email = email.toLowerCase();
      const exist = await posgres("people")
        .select("*")
        .where({ email })
        .first();

      const hashedPassword = await encryptPassword(password);
      if (!role) role = "user";
      if (exist) throw new Error("email is already in use.");

      const addedUser = await posgres("people")
        .insert([{ name, email, password: hashedPassword, role }])
        .returning("*");
      return addedUser[0];
    },
    addBook: async (_par, { input }) => {
      if (!input?.title) throw new Error("The title of the book is required.");
      if (!input?.authors) input["authors"] = [];

      const addedBook = await posgres("books").insert(input).returning("*");
      return addedBook[0];
    },
    addAuthor: async (_par, { name: author_name }) => {
      if (!author_name) {
        throw new Error("Author's name can not be empty.");
      }
      const addedAuthor = await posgres("authors")
        .insert([{ author_name }])
        .returning("*");
      return addedAuthor[0];
    },
    addCategory: async (_par, { input: { name_english, name_khmer } }) => {
      if (!name_english || !name_khmer) {
        throw new Error("category's name can not be empty.");
      }
      const addedCategory = await posgres("categories")
        .insert([{ category_name: name_english, category_name_km: name_khmer }])
        .returning("*");
      return addedCategory[0];
    },

    // EDIT
    editUser: async (_par, { id, input }) => {
      const originalUser = await posgres("people")
        .select()
        .where({ id })
        .first();

      if (!originalUser) throw new Error(`No user with that id found.`);

      // compare the input with the original
      const toBeUpdated = await getNewInfo(input, originalUser);
      // if there's nothing to update, returns the original
      if (Object.keys(toBeUpdated).length === 0) return originalUser;

      const editedUser = await posgres("people")
        .where({ id })
        .update(toBeUpdated)
        .returning("*");
      return editedUser[0];
    },
    editMe: async (_par, { input }, { user }) => {
      const originalMe = await posgres("people")
        .select("*")
        .where({
          id: String(user?.id),
        })
        .first();

      if (!originalMe) throw new Error(`No user with that id found.`);

      // compare the input with the original
      const toBeUpdated = await getNewInfo(input, originalMe);
      // if there's nothing to update, returns the original
      if (Object.keys(toBeUpdated).length === 0) return originalMe;

      // otherwise, update the databse
      const editedMe = await posgres("people")
        .where({ id: String(user?.id) })
        .update(toBeUpdated)
        .returning("*");
      return editedMe[0];
    },
    editAuthor: async (
      _par,
      { authorid: author_id, authorname: author_name }
    ) => {
      const originalAuthor = await posgres("authors")
        .select("*")
        .where({
          author_id,
        })
        .first();

      if (!originalAuthor) throw new Error(`No user with that id found.`);

      // compare the input with the original
      const toBeUpdated = await getNewInfo(
        { author_id, author_name },
        originalAuthor
      );

      // if there's nothing to update, returns the original
      if (Object.keys(toBeUpdated).length === 0) return originalAuthor;

      const editedAuthor = await posgres("authors")
        .where({ author_id })
        .update(toBeUpdated)
        .returning("*");
      return editedAuthor[0];
    },
    editCategory: async (
      _par,
      { category_id, input: { name_english, name_khmer } }
    ) => {
      const originalCategory = await posgres("categories")
        .select("*")
        .where({
          category_id,
        })
        .first();

      if (!originalCategory) throw new Error(`No category with that id found.`);

      // compare the input with the original
      const toBeUpdated = await getNewInfo(
        { category_name: name_english, category_name_km: name_khmer },
        originalCategory
      );

      // if there's nothing to update, returns the original
      if (Object.keys(toBeUpdated).length === 0) return originalCategory;

      const editedCategory = await posgres("categories")
        .where({ category_id })
        .update(toBeUpdated)
        .returning("*");
      return editedCategory[0];
    },
    editBook: async (_par, { id: book_id, input }) => {
      // make sure array input.authors is an array of int.
      if (input["authors"]) {
        const authors = input["authors"]?.map((author) => {
          return parseInt(author);
        });
        input["authors"] = authors;
      }

      if (!input["authors"]) input["authors"] = [];

      // fetch the original copy to compare
      const originalBook = await posgres("books")
        .select()
        .where({ book_id })
        .first();

      if (!originalBook) throw new Error(`No user with that id found.`);

      // compare the input with the original
      const toBeUpdated = await getNewInfo(input, originalBook);
      // if there's nothing to update, returns the original
      if (Object.keys(toBeUpdated).length === 0) return originalBook;

      const editedBook = await posgres("books")
        .where({ book_id })
        .update(toBeUpdated)
        .returning("*");
      return editedBook[0];
    },

    // DELETE
    deleteUser: async (_par, { userid }) => {
      const deletedUser = await posgres("people")
        .where({ id: String(userid) })
        .del()
        .returning("*");

      if (!deletedUser || deletedUser.length === 0)
        throw new Error(`No user with that id found.`);

      const isDeleted = await Boolean(deletedUser.length);
      return { deleted: isDeleted, deletedUser };
    },
    deleteBook: async (_par, { bookid }) => {
      const deletedBook = await posgres("books")
        .where({ book_id: String(bookid) })
        .del()
        .returning("*");

      if (!deletedBook || deletedBook.length === 0)
        throw new Error(`No user with that id found.`);

      const isDeleted = await Boolean(deletedBook.length);
      return { deleted: isDeleted, deletedBook };
    },
    deleteAuthor: async (_par, { authorid }) => {
      const deletedAuthor = await posgres("authors")
        .where({ author_id: String(authorid) })
        .del()
        .returning("*");

      if (!deletedAuthor || deletedAuthor.length === 0)
        throw new Error(`No user with that id found.`);

      const isDeleted = await Boolean(deletedAuthor.length);
      return { deleted: isDeleted, deletedAuthor };
    },
    deleteCategory: async (_par, { category_id }) => {
      const deletedCategory = await posgres("categories")
        .where({ category_id: String(category_id) })
        .del()
        .returning("*");
      if (!deletedCategory || deletedCategory.length === 0)
        throw new Error(`No category with that id found.`);

      const isDeleted = Boolean(deletedCategory.length);
      return { deleted: isDeleted, deletedCategory };
    },
  },

  DeleteResponse: {
    deleted: (response) => response.deleted,
    deletedUser: (response) => response.deletedUser,
    deletedBook: (response) => response.deletedBook,
    deletedAuthor: (response) => response.deletedAuthor,
    deletedCategory: (response) => response.deletedCategory,
  },

  User: {
    id: (user) => user.id,
    name: (user) => user.name,
    email: (user) => user.email,
    role: (user) => user.role,
    profile_image: (user) => user.profile_image,
  },

  Book: {
    id: (book) => book.book_id,
    title: (book) => book.title,
    published: (book) => book.published,
    page_count: (book) => book.page_count,
    authors: (book, _args, { loaders }) => {
      const authors = book.authors.map((authorid) =>
        loaders?.authors?.load(authorid)
      );
      return authors;
    },
    categories: (book, _args, { loaders }) => {
      const categories = book?.categories?.map((category_id) =>
        loaders?.categories?.load(category_id)
      );
      return categories;
    },
    description: (book) => book.description,
    image_url: (book) => book.image_url,
  },

  Author: {
    id: ({ author_id }) => author_id,
    name: ({ author_name }) => author_name,
    books: async ({ author_id }) => {
      // i cant figure out the data loader since it's not connected
      const books = await posgres("books")
        .select()
        .whereRaw(`${author_id} = any(authors)`)
        .limit(50);
      return books.map((book) => book);
    },
    book_count: async ({ author_id }) => {
      const booksCount = await posgres("books")
        .count("book_id")
        .whereRaw(`${author_id} = any(authors)`)
        .first();
      if (!booksCount) return 0;
      return booksCount?.count;
    },
  },

  Category: {
    id: (category) => category.category_id,
    name_english: (category) => category.category_name,
    name_khmer: (category) => category.category_name_km,
    books: async ({ category_id }) => {
      // i cant figure out the data loader since it's not connected
      const books = await posgres("books")
        .select()
        .whereRaw(`${category_id} = any(categories)`)
        .limit(50);
      return books.map((book) => book);
    },
    book_count: async ({ category_id }) => {
      const booksCount = await posgres("books")
        .count("book_id")
        .whereRaw(`${category_id} = any(categories)`)
        .first();
      if (!booksCount) return 0;
      return booksCount?.count;
    },
  },
};
