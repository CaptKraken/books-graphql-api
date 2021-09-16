import {
  comparePassword,
  encryptPassword,
  getNewInfo,
  newCookie,
  posgres,
} from "../utils";

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
    login: async (_par, { email, password }, { res }) => {
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
      return user;
    },
    getUsers: async (_par, { sortBy, sortDirection, limit, offset }) => {
      const users = await posgres("people")
        .select()
        .orderBy(sortBy, sortDirection)
        .limit(Number(limit))
        .offset(Number(offset));
      return users.map((user) => user);
    },
    getAuthor: async (_par, { authorid: author_id }) => {
      const book = await posgres("authors")
        .select("*")
        .where({ author_id })
        .first();
      return book;
    },
    getAuthors: async (_par, { sortBy, sortDirection, limit, offset }) => {
      const authors = await posgres("authors")
        .select()
        .orderBy(sortBy, sortDirection)
        .limit(Number(limit))
        .offset(Number(offset));
      return authors.map((author) => author);
    },
    getBook: async (_par, { bookid: book_id }) => {
      const book = await posgres("books")
        .select("*")
        .where({ book_id })
        .first();
      return book;
    },
    getBooks: async (_par, { sortBy, sortDirection, limit, offset }) => {
      const books = await posgres("books")
        .select()
        .orderBy(sortBy, sortDirection)
        .limit(Number(limit))
        .offset(Number(offset));
      return books.map((book) => book);
    },
    searchBooks: async (_par, { searchTerm }) => {
      const term = searchTerm.toLowerCase();
      const books = await posgres("books")
        .select()
        .joinRaw("JOIN authors ON authors.author_id = any(books.authors) ")
        .whereRaw(`LOWER(authors.author_name) LIKE '%${term}%'`)
        .orWhereRaw(`LOWER(books.title) LIKE '%${term}%'`)
        .orWhereRaw(`LOWER(books.description) LIKE '%${term}%'`)
        .orderBy("books.book_id")
        .limit(50);
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
        throw new Error("fields can't be empty");
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
      const addedAuthor = await posgres("authors")
        .insert([{ author_name }])
        .returning("*");
      return addedAuthor[0];
    },

    // EDIT
    editUser: async (_par, { id, input }) => {
      const originalUser = await posgres("people")
        .select("*")
        .where({
          id,
        })
        .first();

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
      const isDeleted = await Boolean(deletedUser.length);
      return { deleted: isDeleted, deletedUser };
    },
    deleteBook: async (_par, { bookid }) => {
      const deletedBook = await posgres("books")
        .where({ book_id: String(bookid) })
        .del()
        .returning("*");
      const isDeleted = await Boolean(deletedBook.length);
      return { deleted: isDeleted, deletedBook };
    },
    deleteAuthor: async (_par, { authorid }) => {
      const deletedAuthor = await posgres("authors")
        .where({ author_id: String(authorid) })
        .del()
        .returning("*");
      const isDeleted = await Boolean(deletedAuthor.length);
      return { deleted: isDeleted, deletedAuthor };
    },
  },

  DeleteResponse: {
    deleted: (response) => response.ok,
    deletedUser: (response) => response.deletedUser,
    deletedBook: (response) => response.deletedBook,
    deletedAuthor: (response) => response.deletedAuthor,
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
  },
};
