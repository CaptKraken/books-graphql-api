import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  directive @isCurrentUser on FIELD_DEFINITION
  directive @authenticated on FIELD_DEFINITION
  directive @permission(role: String) on FIELD_DEFINITION

  type Query {
    # AUTHENTICATION
    login(email: String, password: String): User!
    verify(email: String, password: String): Boolean

    # GET SINGLE
    me: User! @authenticated
    getUser(id: ID! = 1): User!
    getBook(bookid: ID! = 1): Book!
    getCategory(category_id: ID, field: String, value: String): Category!
    getAuthor(authorid: ID! = 1): Author!
    getRandomQuote: Quote!
    countBooks: Int!

    # GET MULTIPLE
    getUsers(
      sortBy: String = "id"
      sortDirection: String = "asc"
      limit: Int = 50
      offset: Int = 0
    ): [User!]!
    getAuthors(
      sortBy: String = "author_id"
      sortDirection: String = "asc"
      limit: Int = 25
      offset: Int = 0
    ): [Author!]!
    getBooks(
      sortBy: String = "book_id"
      sortDirection: String = "asc"
      limit: Int = 50
      offset: Int = 0
    ): [Book!]!
    getBooksByCategory(
      category_id: ID!
      sortBy: String = "book_id"
      sortDirection: String = "asc"
      limit: Int = 50
      offset: Int = 0
    ): [Book!]!
    getCategories(
      sortBy: String = "category_id"
      sortDirection: String = "asc"
      limit: Int = 25
      offset: Int = 0
    ): [Category!]!

    # SEARCH
    searchBooks(searchTerm: String, limit: Int = 50, offset: Int = 0): [Book!]!
    countSearchResult(searchTerm: String): Int
  }

  type Mutation {
    # AUTHENTICATION
    signUp(input: SignUpInput!): User!

    # ADD
    addUser(input: UserInput!): User! @permission(role: "admin")
    addAuthor(name: String!): Author! @authenticated @permission(role: "editor")
    addBook(input: BookInput!): Book! @permission(role: "editor")
    addCategory(input: CategoryInput!): Category! @permission(role: "editor")

    # EDIT
    editMe(input: MeInput!): User! @authenticated
    editUser(id: ID!, input: UserInput!): User! @permission(role: "admin")
    editAuthor(authorid: ID!, authorname: String!): Author!
      @permission(role: "editor")
    editBook(bookid: ID!, input: BookInput!): Book! @permission(role: "editor")
    editCategory(category_id: ID!, input: CategoryInput!): Category!
      @permission(role: "editor")

    # DELETE
    deleteUser(userid: ID!): DeleteResponse! @permission(role: "admin")
    deleteAuthor(authorid: ID!): DeleteResponse! @permission(role: "editor")
    deleteBook(bookid: ID!): DeleteResponse! @permission(role: "editor")
    deleteCategory(category_id: ID!): DeleteResponse!
      @permission(role: "editor")
  }

  input SignUpInput {
    name: String!
    email: String!
    password: String!
  }

  input MeInput {
    name: String
    email: String
    password: String
    profile_image: String
  }

  input UserInput {
    name: String
    email: String
    password: String
    role: String
    profile_image: String
  }

  input BookInput {
    title: String!
    published: Int
    page_count: Int
    authors: [ID!]
    categories: [ID!]
    description: String
    image_url: String
  }

  input CategoryInput {
    name_english: String!
    name_khmer: String
  }

  type DeleteResponse {
    deleted: Boolean
    deletedUser: [User]
    deletedBook: [Book]
    deletedAuthor: [Author]
    deletedCategory: [Category]
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    profile_image: String
  }

  type Book {
    id: ID!
    title: String!
    published: Int
    page_count: Int
    authors: [Author]
    categories: [Category]
    description: String
    image_url: String
  }

  type Author {
    id: ID!
    name: String!
    books: [Book]!
    book_count: Int
  }

  type Category {
    id: ID
    name_english: String
    name_khmer: String
    books: [Book]!
    book_count: Int
  }

  type Quote {
    text: String!
    author: String!
  }

  type ResultCount {
    count: Int!
  }
  scalar Upload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
`;
